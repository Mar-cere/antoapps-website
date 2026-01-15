'use client';

import { useState, useEffect, useRef } from 'react';
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
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Controlar apertura/cierre
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const actualIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;

  // Conectar al backend cuando el widget se abre
  useEffect(() => {
    if (!actualIsOpen || !backendUrl) return;

    // Conectar Socket.IO
    const socket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      // Mensaje de bienvenida
      setMessages([{
        id: 'welcome',
        text: '¡Hola! Soy Anto, tu asistente de salud mental. ¿En qué puedo ayudarte hoy?',
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
      setIsConnected(false);
      setMessages(prev => [...prev, {
        id: 'error',
        text: 'No se pudo conectar al servidor. Por favor, intenta nuevamente.',
        sender: 'assistant',
        timestamp: new Date(),
      }]);
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
      socket.disconnect();
      socketRef.current = null;
    };
  }, [actualIsOpen, backendUrl]);

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
                {isConnected ? 'En línea' : 'Conectando...'}
              </span>
            </div>
            <button
              className="chat-widget-close"
              onClick={handleToggle}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
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

