import { useState } from 'react';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (user: string, pass: string) => boolean;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Simulate network delay
    setTimeout(() => {
      const success = onLogin(username, password);
      if (!success) {
        setError(true);
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-blue-900/10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-2xl text-white shadow-xl shadow-blue-900/40 mb-4">
              D
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Enter your credentials to access the portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium"
              >
                <AlertCircle size={14} />
                Invalid username or password. Please try again.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">
              Demo Group ERP Portal v1.2.70
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
