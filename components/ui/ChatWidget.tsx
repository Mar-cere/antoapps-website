'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import '@/styles/components/chat-widget.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatWidgetProps {
  backendUrl?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function ChatWidget({ 
  backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '',
  isOpen: controlledIsOpen,
  onToggle
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Controlar apertura/cierre
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const actualIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  // Función para conectar al backend
  const connectToBackend = useCallback(() => {
    if (!backendUrl) {
      console.warn('NEXT_PUBLIC_BACKEND_URL no está configurada');
      setConnectionError('URL del backend no configurada');
      return;
    }

    // Limpiar conexión anterior si existe
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // Limpiar timeout anterior
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setIsConnecting(true);
    setConnectionError(null);

    console.log('Intentando conectar a:', backendUrl);

    // Conectar Socket.IO
    const socket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socketRef.current = socket;

    // Timeout para la conexión inicial
    const connectionTimeout = setTimeout(() => {
      if (!socket.connected) {
        console.error('Timeout de conexión');
        setIsConnecting(false);
        setIsConnected(false);
        setConnectionError('Tiempo de espera agotado. Verifica tu conexión a internet.');
        socket.disconnect();
      }
    }, 10000);

    socket.on('connect', () => {
      console.log('Conectado al servidor');
      clearTimeout(connectionTimeout);
      setIsConnected(true);
      setIsConnecting(false);
      setConnectionError(null);
      // Mensaje de bienvenida
      setMessages([{
        id: 'welcome',
        text: '¡Hola! Soy Anto, tu asistente de salud mental. ¿En qué puedo ayudarte hoy?',
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    });

    socket.on('disconnect', (reason) => {
      console.log('Desconectado del servidor:', reason);
      setIsConnected(false);
      setIsConnecting(false);
      if (reason === 'io server disconnect') {
        // El servidor desconectó, no intentar reconectar automáticamente
        setConnectionError('Desconectado por el servidor. Por favor, intenta reconectar.');
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
      clearTimeout(connectionTimeout);
      setIsConnected(false);
      setIsConnecting(false);
      
      let errorMessage = 'No se pudo conectar al servidor.';
      if (error.message.includes('timeout')) {
        errorMessage = 'Tiempo de espera agotado. Verifica tu conexión a internet.';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Error de CORS. El servidor no permite conexiones desde este origen.';
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'No se pudo alcanzar el servidor. Verifica que el backend esté en ejecución.';
      }
      
      setConnectionError(errorMessage);
      
      // Solo agregar mensaje de error si no hay mensajes aún
      setMessages(prev => {
        if (prev.length === 0 || prev[prev.length - 1].id !== 'connection-error') {
          return [...prev, {
            id: 'connection-error',
            text: errorMessage + ' Por favor, intenta reconectar.',
            sender: 'assistant',
            timestamp: new Date(),
          }];
        }
        return prev;
      });
    });

    // Escuchar mensajes del asistente
    socket.on('message', (data: { text: string; id?: string }) => {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: data.id || `msg-${Date.now()}`,
        text: data.text,
        sender: 'assistant',
        timestamp: new Date(),
      }]);
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
      clearTimeout(connectionTimeout);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [backendUrl]);

  // Conectar al backend cuando el widget se abre
  useEffect(() => {
    if (!actualIsOpen) {
      // Limpiar conexión cuando se cierra
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      setIsConnecting(false);
      setConnectionError(null);
      return;
    }

    connectToBackend();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [actualIsOpen, connectToBackend]);

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
    socketRef.current.emit('message', {
      text: inputMessage,
      userId: 'web-visitor', // ID temporal para visitantes web
    });
  };

  if (!backendUrl) {
    console.warn('NEXT_PUBLIC_BACKEND_URL no está configurada');
    return null;
  }

  return (
    <div className={`chat-widget ${actualIsOpen ? 'chat-widget-open' : ''}`}>
      {/* Botón flotante para abrir/cerrar */}
      <button
        className="chat-widget-toggle"
        onClick={handleToggle}
        aria-label={actualIsOpen ? 'Cerrar chat' : 'Abrir chat'}
        aria-expanded={actualIsOpen}
      >
        {actualIsOpen ? (
          <span className="chat-widget-icon">✕</span>
        ) : (
          <span className="chat-widget-icon">💬</span>
        )}
        {!isConnected && actualIsOpen && (
          <span className="chat-widget-status" title="Conectando...">🔄</span>
        )}
      </button>

      {/* Contenedor del chat */}
      {actualIsOpen && (
        <div className="chat-widget-container">
          <div className="chat-widget-header">
            <div className="chat-widget-header-info">
              <h3>Anto</h3>
              <span className="chat-widget-status-text">
                {isConnected ? 'En línea' : isConnecting ? 'Conectando...' : 'Desconectado'}
              </span>
            </div>
            <div className="chat-widget-header-actions">
              {!isConnected && !isConnecting && (
                <button
                  className="chat-widget-reconnect"
                  onClick={connectToBackend}
                  aria-label="Reconectar"
                  title="Reconectar"
                >
                  🔄
                </button>
              )}
              <button
                className="chat-widget-close"
                onClick={handleToggle}
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chat-widget-messages">
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

          <form className="chat-widget-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-widget-input"
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={!isConnected || isLoading}
            />
            <button
              type="submit"
              className="chat-widget-send"
              disabled={!inputMessage.trim() || !isConnected || isLoading}
              aria-label="Enviar mensaje"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

