'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import '@/styles/pages/login.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          username,
          ...(name.trim() && { name: name.trim() })
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }

      const data = await response.json();
      
      if (data.requiresVerification) {
        setShowVerification(true);
        setSuccess(true);
      } else {
        // Si no requiere verificación, redirigir a login
        router.push('/login?registered=true');
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      
      const response = await fetch(`${backendUrl}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          code: verificationCode 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Código inválido');
      }

      const data = await response.json();
      
      // Guardar token y redirigir al chat
      if (data.token || data.accessToken) {
        const token = data.token || data.accessToken;
        const userData = data.user || {};
        const userId = userData._id || userData.id;
        
        localStorage.setItem('anto_token', token);
        localStorage.setItem('anto_user', JSON.stringify({
          id: userId.toString(),
          email: userData.email || email,
          name: userData.name || userData.username,
        }));
        
        router.push('/chat');
      } else {
        router.push('/login?verified=true');
      }
    } catch (err: any) {
      setError(err.message || 'Código inválido. Por favor, verifica el código e intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showVerification) {
    return (
      <>
        <Header />
        <main className="login-page">
          <div className="login-container">
            <div className="login-card">
              <div className="login-header">
                <h1>Verificar Email</h1>
                <p>Hemos enviado un código de verificación a {email}</p>
              </div>

              {error && (
                <div className="login-error">
                  <span>⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              {success && !error && (
                <div style={{
                  background: 'var(--color-success-light)',
                  border: '1px solid var(--color-success)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--spacing-3) var(--spacing-4)',
                  marginBottom: 'var(--spacing-4)',
                  color: 'var(--color-success)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  ✅ Código enviado. Revisa tu correo electrónico.
                </div>
              )}

              <form onSubmit={handleVerifyEmail} className="login-form">
                <div className="form-group">
                  <label htmlFor="code">Código de verificación</label>
                  <input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    required
                    disabled={isLoading}
                    style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.5rem' }}
                  />
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-1)' }}>
                    Ingresa el código de 6 dígitos que recibiste por email
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large btn-block"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? 'Verificando...' : 'Verificar Email'}
                </button>
              </form>

              <div className="login-footer">
                <p>
                  ¿No recibiste el código?{' '}
                  <button
                    onClick={async () => {
                      try {
                        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
                        await fetch(`${backendUrl}/api/auth/resend-verification-code`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email }),
                        });
                        setSuccess(true);
                        setError('');
                      } catch (err) {
                        setError('Error al reenviar el código');
                      }
                    }}
                    className="link-primary"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Reenviar código
                  </button>
                </p>
                <p>
                  <Link href="/login" className="link-secondary">
                    Volver a iniciar sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Crear Cuenta</h1>
              <p>Regístrate para comenzar a usar Anto</p>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="usuario123"
                  minLength={3}
                  maxLength={20}
                  pattern="[a-z0-9_]+"
                  required
                  disabled={isLoading}
                />
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-1)' }}>
                  Solo letras minúsculas, números y guiones bajos (3-20 caracteres)
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="name">Nombre (opcional)</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={8}
                  required
                  disabled={isLoading}
                />
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-1)' }}>
                  Mínimo 8 caracteres
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large btn-block"
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="login-footer">
              <p>
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="link-primary">
                  Inicia sesión
                </Link>
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-2)' }}>
                Al registrarte, aceptas nuestros{' '}
                <Link href="/terminos" className="link-secondary">
                  Términos de Uso
                </Link>{' '}
                y{' '}
                <Link href="/privacidad" className="link-secondary">
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

