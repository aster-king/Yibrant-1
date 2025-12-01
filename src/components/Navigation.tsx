import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = mounted && currentTheme === "light" ? logoLight : logoDark;

  const links = [
    { to: "home", label: "home" },
    { to: "services", label: "services" },
    { to: "careers", label: "join us" },
    { to: "contact", label: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollToSection("home")} className="flex items-center gap-3">
          <img src={logoSrc} alt="Yibrant" className="h-16 w-auto" />
        </button>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.to}
              onClick={() => scrollToSection(link.to)}
              className="text-sm lowercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;