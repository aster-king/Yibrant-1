import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = mounted && currentTheme === "light" ? logoLight : logoDark;

  const links = [
    { to: "home", label: "home", type: "scroll" },
    { to: "services", label: "services", type: "scroll" },
    { to: "contact", label: "contact", type: "scroll" },
    { to: "/join", label: "join us", type: "route" },
  ];

  const handleNavigation = (link: { to: string; type: string }) => {
    if (link.type === "route") {
      navigate(link.to);
      window.scrollTo(0, 0);
    } else {
      // If we are not on home page, go there first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(link.to);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          } else if (link.to === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 300); // Increased timeout slightly to ensure page load
      } else {
        // Already on home page
        const element = document.getElementById(link.to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (link.to === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        <button onClick={() => handleNavigation({ to: "home", type: "scroll" })} className="flex items-center gap-3">
          <img src={logoSrc} alt="Yibrant" className="h-16 w-auto" />
        </button>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavigation(link)}
              className="text-sm lowercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        {/* Floating Theme Toggle - Mobile Only */}
        <div className="absolute top-full right-4 mt-2 md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;