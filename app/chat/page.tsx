'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { io, Socket } from 'socket.io-client';
import Header from '@/components/layout/Header';
import '@/styles/pages/chat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);

  // Conectar al backend
  const connectToBackend = useCallback(() => {
    if (!token || !user) return;

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    if (!backendUrl) {
      console.error('NEXT_PUBLIC_BACKEND_URL no está configurada');
      return;
    }

    // Limpiar conexión anterior
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setIsConnecting(true);

    console.log('Conectando al backend con autenticación...');
    console.log('Token:', token ? `${token.substring(0, 20)}...` : 'No hay token');
    console.log('Usuario:', user);

    // Conectar Socket.IO con token de autenticación
    // El backend puede esperar el token en auth.token o en un header Authorization
    const socket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 10000,
      auth: {
        token: token,
        userId: user.id,
      },
      // También intentar enviar el token como header si el backend lo requiere
      extraHeaders: token ? {
        'Authorization': `Bearer ${token}`
      } : {},
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Conectado al servidor, autenticando socket...');
      
      // Después de conectar, autenticar el socket con el userId
      // El backend requiere este paso adicional después de la conexión
      socket.emit('authenticate', { userId: user.id });
      
      setIsConnected(true);
      setIsConnecting(false);
      
      // Mensaje de bienvenida
      setMessages([{
        id: 'welcome',
        text: `¡Hola ${user.name || user.email}! Soy Anto, tu asistente de salud mental. ¿En qué puedo ayudarte hoy?`,
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    });

    socket.on('disconnect', (reason) => {
      console.log('Desconectado del servidor:', reason);
      setIsConnected(false);
      setIsConnecting(false);
      if (reason === 'io server disconnect') {
        // El servidor desconectó, posiblemente por token inválido
        logout();
        router.push('/login');
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
      setIsConnected(false);
      setIsConnecting(false);
      
      let errorMessage = 'Error de conexión';
      if (error.message.includes('Token inválido') || error.message.includes('Invalid token')) {
        errorMessage = 'Token inválido. Por favor, inicia sesión nuevamente.';
        setMessages(prev => [...prev, {
          id: 'token-error',
          text: errorMessage,
          sender: 'assistant',
          timestamp: new Date(),
        }]);
        // Limpiar token inválido y redirigir
        setTimeout(() => {
          logout();
          router.push('/login');
        }, 2000);
      } else if (error.message.includes('Autenticación requerida') || error.message.includes('Authentication required')) {
        errorMessage = 'Autenticación requerida. Por favor, inicia sesión.';
        setMessages(prev => [...prev, {
          id: 'auth-required-error',
          text: errorMessage,
          sender: 'assistant',
          timestamp: new Date(),
        }]);
        setTimeout(() => {
          logout();
          router.push('/login');
        }, 2000);
      } else {
        errorMessage = `Error de conexión: ${error.message}`;
        setMessages(prev => [...prev, {
          id: `connection-error-${Date.now()}`,
          text: errorMessage,
          sender: 'assistant',
          timestamp: new Date(),
        }]);
      }
    });

    socket.on('unauthorized', (data: any) => {
      console.error('No autorizado:', data);
      setIsConnected(false);
      setIsConnecting(false);
      setMessages(prev => [...prev, {
        id: 'unauthorized-error',
        text: 'No autorizado. Por favor, inicia sesión nuevamente.',
        sender: 'assistant',
        timestamp: new Date(),
      }]);
      setTimeout(() => {
        logout();
        router.push('/login');
      }, 2000);
    });

    // Escuchar eventos de autenticación exitosa
    socket.on('authenticated', () => {
      console.log('Socket autenticado correctamente');
    });

    // Escuchar mensajes del asistente
    // El backend emite 'message:received' no 'message'
    socket.on('message:received', (data: { text: string; id?: string; userId?: string }) => {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: data.id || `msg-${Date.now()}`,
        text: data.text,
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    });

    // También escuchar 'message' por compatibilidad
    socket.on('message', (data: { text: string; id?: string }) => {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: data.id || `msg-${Date.now()}`,
        text: data.text,
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    });

    // Escuchar estado de escritura de la IA
    socket.on('ai:typing', (isTyping: boolean) => {
      // El backend emite este evento cuando la IA está escribiendo
      // Podemos usar esto para mostrar un indicador de escritura
      if (!isTyping) {
        setIsLoading(false);
      }
    });

    // Escuchar errores
    socket.on('error', (error: { message: string }) => {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        text: `Error: ${error.message}`,
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, user, logout, router]);

  useEffect(() => {
    if (isAuthenticated && token && user) {
      connectToBackend();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated, connectToBackend]);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socketRef.current || !isConnected) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Enviar mensaje al backend
    // El backend espera el evento 'message' con el texto
    socketRef.current.emit('message', {
      text: inputMessage,
      userId: user?.id,
    });
    
    // El backend emitirá 'message:sent' como confirmación
    // y luego 'message:received' con la respuesta
  };

  const handleLogout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    logout();
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="chat-page">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <h1>Chat con Anto</h1>
              <span className="chat-status">
                {isConnected ? '🟢 En línea' : isConnecting ? '🟡 Conectando...' : '🔴 Desconectado'}
              </span>
            </div>
            <div className="chat-header-actions">
              <button
                className="btn btn-secondary"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message chat-message-${message.sender}`}
              >
                <div className="chat-message-content">
                  <p>{message.text}</p>
                  <span className="chat-message-time">
                    {message.timestamp.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-message-content">
                  <div className="chat-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={!isConnected || isLoading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputMessage.trim() || !isConnected || isLoading}
              aria-label="Enviar mensaje"
            >
              ➤
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

