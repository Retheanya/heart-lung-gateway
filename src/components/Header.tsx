import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About INSHLT", href: "/#about" },
  { label: "Courses", href: "/courses" },
  { label: "Register", href: "/#register" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href.startsWith("/#") && location.pathname === "/") return false; // Don't highlight sections as active home
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="INSHLT Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-full px-3 py-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isHash = link.href.includes("#");

            return isHash ? (
              <a
                key={link.label}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-base font-medium transition-colors duration-200 ${active
                    ? "text-primary font-semibold relative before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary pl-7"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`px-5 py-2.5 rounded-full text-base font-medium transition-colors duration-200 ${active
                    ? "text-primary font-semibold relative before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary pl-7"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Login Button */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-px h-6 bg-border" />
          <Button variant="hero" size="lg" className="gap-2 text-sm font-medium px-6 py-5 rounded-full hover:scale-105 transition-transform">
            Portal Login
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const isHash = link.href.includes("#");

              return isHash ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                      ? "text-primary bg-secondary font-semibold"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                      ? "text-primary bg-secondary font-semibold"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button variant="hero" size="lg" className="mt-3">
              Portal Login
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
