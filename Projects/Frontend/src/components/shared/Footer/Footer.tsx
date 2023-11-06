import { VERSION, BUSINESS_MAIL } from "Constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="copyright">&copy; {new Date().getFullYear()} Daniel Simonsen</p>
      <p className="version">v. {VERSION}</p>
      <a href={`mailto:${BUSINESS_MAIL}`}>Contact</a>
    </footer>
  );
}