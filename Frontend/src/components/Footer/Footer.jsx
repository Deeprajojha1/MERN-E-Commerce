import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footerInner">
        <div className="brand">
          <a href="/" className="brandLink" aria-label="Go to homepage">
            <span className="brandLogo">🛍️</span>
            <span className="brandName">ShopSphere</span>
          </a>
          <p className="brandTag">Quality products. Fast delivery. Trusted support.</p>
        </div>

        <div className="linksGrid">
          <nav className="column" aria-label="Shop">
            <h3 className="colTitle">Shop</h3>
            <ul className="colList">
              <li><a className="link" href="/collections/new">New Arrivals</a></li>
              <li><a className="link" href="/collections/best-sellers">Best Sellers</a></li>
              <li><a className="link" href="/collections/deals">Deals</a></li>
              <li><a className="link" href="/collections/gift-cards">Gift Cards</a></li>
            </ul>
          </nav>

          <nav className="column" aria-label="Company">
            <h3 className="colTitle">Company</h3>
            <ul className="colList">
              <li><a className="link" href="/about">About</a></li>
              <li><a className="link" href="/careers">Careers</a></li>
              <li><a className="link" href="/blog">Blog</a></li>
              <li><a className="link" href="/contact">Contact</a></li>
            </ul>
          </nav>

          <nav className="column" aria-label="Support">
            <h3 className="colTitle">Support</h3>
            <ul className="colList">
              <li><a className="link" href="/help">Help Center</a></li>
              <li><a className="link" href="/shipping">Shipping</a></li>
              <li><a className="link" href="/returns">Returns</a></li>
              <li><a className="link" href="/privacy">Privacy Policy</a></li>
            </ul>
          </nav>

          <div className="column newsletter">
            <h3 className="colTitle">Stay in the loop</h3>
            <p className="newsText">Subscribe for new arrivals and exclusive offers.</p>
            <form className="inputGroup" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter subscription">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
              />
              <button className="button" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="bottomBar">
        <p className="copyright">© {year} ShopSphere. All rights reserved.</p>
        <div className="social" aria-label="Social media">
          <a className="socialLink" href="https://twitter.com" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.3-1.2 1.6-2.1-.8.5-1.7.9-2.6 1.1-.8-.8-1.9-1.3-3.1-1.3-2.3 0-4.2 1.9-4.2 4.3 0 .3 0 .6.1.8-3.5-.2-6.6-1.9-8.6-4.4-.4.6-.6 1.3-.6 2.1 0 1.5.8 2.8 2 3.5-.6 0-1.2-.2-1.7-.5v.1c0 2.1 1.5 3.8 3.4 4.3-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.9 2.3 3.2 4.3 3.2-1.6 1.3-3.7 2-5.9 2-.4 0-.8 0-1.1-.1 2.1 1.4 4.6 2.2 7.3 2.2 8.7 0 13.5-7.3 13.5-13.5v-.6c.9-.6 1.5-1.3 2-2.1z" fill="currentColor"/>
            </svg>
          </a>
          <a className="socialLink" href="https://instagram.com" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zM18.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor"/>
            </svg>
          </a>
          <a className="socialLink" href="https://facebook.com" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M13 22v-9h3l1-4h-4V7.5c0-1.2.4-2 2-2H17V2.2C16.7 2.1 15.8 2 14.8 2 12.5 2 11 3.5 11 6v3H8v4h3v9h2z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

