import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password.trim()) { setError("All fields are required."); return; }
    if (name.trim().length > 100) { setError("Name must be less than 100 characters."); return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Please enter a valid email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    signup(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero p-4 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-float-delayed" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10 shadow-lg"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-heading text-2xl font-bold text-primary-foreground">
          <Zap className="h-7 w-7 text-accent" />
          QuizMaster
        </Link>
        <h2 className="mb-2 text-center font-heading text-2xl font-bold text-primary-foreground">Create account</h2>
        <p className="mb-8 text-center text-sm text-primary-foreground/60">Start your quiz journey today</p>

        <Button variant="outline" className="mb-6 w-full rounded-xl border-primary-foreground/20 bg-primary-foreground/5 py-6 text-primary-foreground hover:bg-primary-foreground/10">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-primary-foreground/20" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-transparent px-3 text-primary-foreground/40">or continue with email</span></div>
        </div>

        {error && <div className="mb-4 rounded-xl bg-destructive/20 p-3 text-sm text-destructive">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-primary-foreground/70">Full Name</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/40" />
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="pl-10 rounded-xl border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent" />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-primary-foreground/70">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/40" />
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10 rounded-xl border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent" />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="text-primary-foreground/70">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/40" />
              <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10 rounded-xl border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full gradient-accent text-accent-foreground rounded-xl py-6 text-base font-semibold hover:scale-[1.02] transition-transform">Create account</Button>
        </form>
        <p className="mt-6 text-center text-sm text-primary-foreground/50">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
