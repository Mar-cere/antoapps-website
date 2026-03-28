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
      
      // Mensaje de bienvenida inicial (solo si no hay mensajes)
      setMessages(prev => {
        if (prev.length === 0) {
          return [{
            id: 'welcome',
            text: `¡Hola ${user.name || user.email}! Soy Anto, tu asistente de salud mental. ¿En qué puedo ayudarte hoy?`,
            sender: 'assistant',
            timestamp: new Date(),
          }];
        }
        return prev;
      });
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

    // Escuchar confirmación de mensaje enviado (del backend)
    // Esto confirma que el mensaje del usuario se guardó correctamente
    socket.on('message:sent', (data: { id?: string; text: string; userId?: string; timestamp?: Date }) => {
      console.log('Mensaje confirmado por el servidor:', data);
      // Actualizar el ID del último mensaje del usuario con el ID real del backend
      if (data.id) {
        setMessages(prev => {
          // Buscar el último mensaje del usuario que coincida con el texto
          const lastUserMessageIndex = prev.length - 1;
          if (lastUserMessageIndex >= 0) {
            const lastMessage = prev[lastUserMessageIndex];
            // Si el último mensaje es del usuario y tiene un ID temporal, actualizarlo
            if (lastMessage.sender === 'user' && lastMessage.text === data.text) {
              return prev.map((msg, idx): Message => 
                idx === lastUserMessageIndex 
                  ? { ...msg, id: data.id || msg.id }
                  : msg
              );
            }
          }
          return prev;
        });
      }
    });

    // Escuchar mensajes del asistente
    // El backend emite 'message:received' con la respuesta de OpenAI
    socket.on('message:received', (data: { text: string; id?: string; userId?: string; timestamp?: Date }) => {
      console.log('Mensaje recibido del asistente:', data);
      setIsLoading(false);
      
      // Agregar mensaje del asistente
      setMessages(prev => {
        // Evitar duplicados verificando si ya existe un mensaje con este ID o texto similar
        if (data.id) {
          const existingMessage = prev.find(msg => msg.id === data.id);
          if (existingMessage) {
            console.log('Mensaje duplicado detectado, ignorando');
            return prev;
          }
        }
        
        // También verificar si el último mensaje del asistente tiene el mismo texto (evitar duplicados por reconexión)
        const lastAssistantMessage = prev.filter(msg => msg.sender === 'assistant').pop();
        if (lastAssistantMessage && lastAssistantMessage.text === data.text) {
          console.log('Mensaje duplicado por texto, ignorando');
          return prev;
        }
        
        return [...prev, {
          id: data.id || `msg-${Date.now()}`,
          text: data.text,
          sender: 'assistant',
          timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
        }];
      });
    });

    // También escuchar 'message' por compatibilidad (si el backend lo emite)
    socket.on('message', (data: { text: string; id?: string }) => {
      setIsLoading(false);
      setMessages(prev => {
        const existingMessage = data.id && prev.find(msg => msg.id === data.id);
        if (existingMessage) {
          return prev;
        }
        
        return [...prev, {
          id: data.id || `msg-${Date.now()}`,
          text: data.text,
          sender: 'assistant',
          timestamp: new Date(),
        }];
      });
    });

    // Escuchar estado de escritura de la IA
    socket.on('ai:typing', (isTyping: boolean) => {
      // El backend emite este evento cuando la IA está escribiendo
      setIsLoading(isTyping);
    });

    // Escuchar errores
    socket.on('error', (error: { message: string }) => {
      console.error('Error del servidor:', error);
      setIsLoading(false);
      
      // Solo agregar mensaje de error si no hay uno reciente con el mismo mensaje
      setMessages(prev => {
        const recentError = prev
          .filter(msg => msg.sender === 'assistant' && msg.text.includes('Error:'))
          .pop();
        
        if (recentError && recentError.text.includes(error.message)) {
          return prev; // Ya hay un error similar, no duplicar
        }
        
        return [...prev, {
          id: `error-${Date.now()}`,
          text: `Lo siento, ha ocurrido un error: ${error.message}. Por favor, intenta nuevamente.`,
          sender: 'assistant',
          timestamp: new Date(),
        }];
      });
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
    // Usar setTimeout para asegurar que el DOM se haya actualizado
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socketRef.current || !isConnected || isLoading) return;

    const messageText = inputMessage.trim();
    const tempId = `user-${Date.now()}`;
    
    // Agregar mensaje del usuario inmediatamente (optimistic update)
    const userMessage: Message = {
      id: tempId,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true); // Activar indicador de carga

    try {
      // Enviar mensaje al backend
      // El backend espera el evento 'message' con el texto
      socketRef.current.emit('message', {
        text: messageText,
        userId: user?.id,
      });
      
      // El backend emitirá:
      // 1. 'message:sent' - confirmación de que el mensaje se guardó
      // 2. 'ai:typing' (true) - cuando empieza a generar la respuesta
      // 3. 'message:received' - con la respuesta de OpenAI
      // 4. 'ai:typing' (false) - cuando termina de generar
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setIsLoading(false);
      // Remover el mensaje si falla el envío
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    }
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

