"use client";
import { type ReactNode, useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeSwitcher(): ReactNode {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => setTheme((old) => (old === "light" ? "dark" : "light"));

  return (
    <Button onClick={toggleTheme} isIconOnly className="transition-colors duration-300" size="sm" variant="light">
      <motion.div animate={{ rotate: isDark ? 0 : 360 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
        {isDark ? <Moon className="text-primary" size={18} /> : <Sun className="text-primary" size={18} />}
      </motion.div>
    </Button>
  );
}
