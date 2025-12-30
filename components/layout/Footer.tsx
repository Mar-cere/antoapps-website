import Link from 'next/link';
import '@/styles/layout/footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Anto</h3>
            <p>Mejorando la salud mental, una conversación a la vez.</p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://t.me/marcere23"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                Telegram
              </a>
              <a
                href="mailto:marcelo.ull@antoapps.com"
                aria-label="Email Corporativo"
              >
                Email
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Producto</h4>
            <ul>
              <li>
                <Link href="/#caracteristicas">Características</Link>
              </li>
              <li>
                <Link href="/#precios">Precios</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/privacidad">Privacidad</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Empresa</h4>
            <ul>
              <li>
                <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
              <li>
                <Link href="/recursos">Recursos</Link>
              </li>
              <li>
                <Link href="/desarrollo">Desarrollo</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacidad">Política de Privacidad</Link>
              </li>
              <li>
                <Link href="/terminos">Términos de Servicio</Link>
              </li>
              <li>
                <Link href="/seguridad">Seguridad</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Anto. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

