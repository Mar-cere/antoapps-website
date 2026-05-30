'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';
import { getSiteLayoutCopy } from '@/lib/i18n/copy/home';
import '@/styles/layout/footer.css';

export default function Footer() {
  const locale = useLocale();
  const copy = getSiteLayoutCopy(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Anto</h3>
            <p>{copy.footer.tagline}</p>
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
              <a href="mailto:marcelo.ull@antoapps.com" aria-label="Email Corporativo">
                Email
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>{copy.footer.product}</h4>
            <ul>
              {copy.footer.productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{copy.footer.company}</h4>
            <ul>
              {copy.footer.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{copy.footer.legal}</h4>
            <ul>
              {copy.footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {year} Anto. {copy.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
