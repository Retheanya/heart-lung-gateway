import { useState, useEffect } from "react";
import { Menu, X, LogIn, User, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About INSHLT", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href.startsWith("/#") && location.pathname === "/") return false;
    return location.pathname === href;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutDialog(false);
    navigate("/");
  };

  return (
    <>
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
                  className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 relative flex items-center ${active
                    ? "text-primary font-semibold before:absolute before:left-3 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary pl-7"
                    : "text-foreground/70 hover:text-primary hover:bg-muted"
                    }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 relative flex items-center ${active
                    ? "text-primary font-semibold before:absolute before:left-3 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary pl-7"
                    : "text-foreground/70 hover:text-primary hover:bg-muted"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: Login Button or Profile Dropdown */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-px h-6 bg-border" />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 rounded-full px-4 py-6 text-base font-bold tracking-wider hover:scale-105 transition-transform hover:bg-muted"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <User size={18} className="text-primary" />
                    </div>
                    <span className="text-foreground/80">Profile</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 p-2 rounded-xl shadow-xl border border-border/50">
                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium">
                    <Link to="/learners/my-courses" className="flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  className="gap-2 rounded-full px-8 py-6 text-base font-bold tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <LogIn size={18} />
                  Portal Login
                </Button>
              </Link>
            )}
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
                      : "text-foreground/70 hover:text-primary hover:bg-muted"
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
                      : "text-foreground/70 hover:text-primary hover:bg-muted"
                      }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {isLoggedIn ? (
                <>
                  <Link
                    to="/learners/my-courses"
                    className="px-4 py-3 rounded-lg text-sm font-medium transition-colors text-foreground/70 hover:text-foreground hover:bg-muted flex items-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <BookOpen size={16} className="text-primary" />
                    My Courses
                  </Link>
                  <button
                    className="mt-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left"
                    onClick={() => {
                      setMobileOpen(false);
                      setShowLogoutDialog(true);
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="w-full" onClick={() => setMobileOpen(false)}>
                  <Button
                    className="mt-3 w-full gap-2 rounded-full px-8 py-6 text-base font-bold tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <LogIn size={18} />
                    Portal Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirm Logout</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to log out? You will need to sign in again to access your courses.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              className="rounded-full px-6 font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="rounded-full px-6 font-semibold gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
