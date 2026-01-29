import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleTheme}
        className="bg-transparent border border-secondary/20 hover:border-secondary/30 hover:bg-secondary/5 dark:border-primary/30 dark:hover:border-primary/50 dark:hover:bg-primary/10 transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/20 dark:focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0 text-primary" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100 text-primary" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}