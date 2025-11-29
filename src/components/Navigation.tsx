import { NavLink } from "@/components/NavLink";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navigation = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = mounted && currentTheme === "light" ? logoLight : logoDark;

  const links = [
    { to: "/", label: "home" },
    { to: "/services", label: "services" },
    { to: "/clients", label: "clients" },
    { to: "/careers", label: "join us" },
    { to: "/contact", label: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-0 border-b"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logoSrc} alt="Yibrant" className="h-10 w-auto" />
        </NavLink>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className="text-sm lowercase text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-bold"
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};