import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, LogOut, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border/50 bg-card/60 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2.5 font-heading text-xl font-bold text-foreground">
          <motion.div
            whileHover={{ rotate: 20, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow"
          >
            <Zap className="h-5 w-5 text-primary-foreground" />
          </motion.div>
          <span className="relative">
            Quiz<span className="text-gradient">Master</span>
            <Sparkles className="absolute -right-4 -top-1 h-3 w-3 text-accent animate-pulse" />
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.92 }}>
            <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full hover:bg-muted/80">
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 sm:flex"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-foreground">{user?.name}</span>
              </motion.div>
              <motion.div whileTap={{ scale: 0.92 }}>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="rounded-xl">
                Log in
              </Button>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button size="sm" onClick={() => navigate("/signup")} className="gradient-primary text-primary-foreground rounded-xl shadow-glow">
                  Sign up
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
