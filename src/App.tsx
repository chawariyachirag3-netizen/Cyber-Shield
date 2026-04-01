/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Globe, 
  ShieldCheck, 
  ShieldAlert, 
  Key, 
  Eye, 
  EyeOff,
  ExternalLink,
  ChevronRight,
  Github,
  Terminal,
  Cpu,
  Activity,
  AlertTriangle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Strength = 'Weak' | 'Medium' | 'Strong' | '';

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="cursor-glow hidden md:block" 
        style={{ 
          transform: `translate(${position.x - 10}px, ${position.y - 10}px) scale(${isHovering ? 1.5 : 1})` 
        }} 
      />
      <div 
        className="cursor-outer hidden md:block" 
        style={{ 
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 0.5 : 1})`,
          borderColor: isHovering ? 'transparent' : '#00f7ff'
        }} 
      />
    </>
  );
};

export default function App() {
  // Password Checker State
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<Strength>('');

  // Encryption State
  const [cryptoText, setCryptoText] = useState('');
  const [cryptoMethod, setCryptoMethod] = useState<'base64' | 'rsa'>('base64');
  const [cryptoResult, setCryptoResult] = useState('');

  // Website Checker State
  const [url, setUrl] = useState('');
  const [urlResult, setUrlResult] = useState<{ status: string; type: 'success' | 'warning' | 'error' | null }>({ status: '', type: null });

  // Password Logic
  const checkPassword = () => {
    if (!password) {
      setPasswordStrength('');
      return;
    }
    let strength: Strength = "Weak";
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (password.length >= 8 && password.length <= 12 && hasUpper && hasLower && hasNumber && hasSymbol) {
      strength = "Strong";
    } else if (password.length > 6) {
      strength = "Medium";
    }
    setPasswordStrength(strength);
  };

  // Encryption Logic
  const handleEncrypt = () => {
    if (!cryptoText) return;
    let result = "";
    if (cryptoMethod === "base64") {
      try {
        result = btoa(cryptoText);
      } catch (e) {
        result = "Encoding error!";
      }
    } else {
      result = cryptoText.split("").reverse().join("") + "🔐[ASYM-SIM]";
    }
    setCryptoResult(result);
  };

  const handleDecrypt = () => {
    if (!cryptoText) return;
    let result = "";
    try {
      if (cryptoMethod === "base64") {
        result = atob(cryptoText);
      } else {
        result = cryptoText.replace("🔐[ASYM-SIM]", "").split("").reverse().join("");
      }
    } catch {
      result = "Invalid input!";
    }
    setCryptoResult(result);
  };

  // Website Check Logic
  const checkWebsite = () => {
    if (!url) {
      setUrlResult({ status: '', type: null });
      return;
    }
    let status = "";
    let type: 'success' | 'warning' | 'error' = 'error';
    const lowerUrl = url.toLowerCase();

    if (url.startsWith("https://")) {
      status = "✅ Secure (HTTPS detected). Communication is encrypted.";
      type = 'success';
    } else if (url.startsWith("http://")) {
      status = "⚠️ Not Secure (HTTP). Data is sent in plain text!";
      type = 'warning';
    } else {
      status = "❌ Invalid URL. Must start with http:// or https://";
      type = 'error';
    }

    const phishingKeywords = ['login', 'verify', 'bank', 'secure', 'account', 'update', 'password'];
    const detectedKeywords = phishingKeywords.filter(k => lowerUrl.includes(k));

    if (detectedKeywords.length > 0) {
      status += ` | ⚠️ Warning: Phishing keywords detected (${detectedKeywords.join(', ')}). Be cautious!`;
      if (type === 'success') type = 'warning';
    }
    setUrlResult({ status, type });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 grid-bg">
      <CustomCursor />
      <div className="scanline" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="text-cyan-400 w-8 h-8 glow-text" />
          <h1 className="text-2xl font-black tracking-tighter text-cyan-400 glow-text uppercase">CyberShield</h1>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#password" className="hover:text-cyan-400 transition-colors">Password</a>
          <a href="#crypto" className="hover:text-cyan-400 transition-colors">Encryption</a>
          <a href="#checker" className="hover:text-cyan-400 transition-colors">Website Check</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">System Online</span>
          </div>
          <button className="p-2 hover:bg-cyan-500/10 rounded-full transition-colors">
            <Github className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded-full mb-8">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em]">Advanced Security Protocols Active</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-cyan-400 mb-8 tracking-tighter uppercase leading-[0.9]">
            Cybersecurity Protection <br /> <span className="text-white">Toolkit</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            The ultimate digital fortress for students, ethical hackers, and security enthusiasts. 
            Analyze password vulnerabilities, implement cryptographic protocols, and verify web safety 
            through our professional-grade security suite.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-4 bg-[#111] border border-cyan-500/20 rounded-2xl">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Processing</p>
                <p className="text-sm font-mono text-white">Real-time Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 bg-[#111] border border-cyan-500/20 rounded-2xl">
              <Activity className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</p>
                <p className="text-sm font-mono text-white">End-to-End Secure</p>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Warning Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center gap-4">
          <AlertTriangle className="text-red-500 w-6 h-6 shrink-0" />
          <p className="text-sm text-red-400 font-medium">
            <span className="font-bold uppercase tracking-wider">Warning:</span> This is a demonstration toolkit. Do not enter real sensitive data or production passwords.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Password Strength Checker */}
        <motion.section 
          id="password"
          whileHover={{ y: -5 }}
          className="bg-[#0a0a0a] p-8 rounded-3xl border border-cyan-500/20 glow-border flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-4 bg-cyan-500/10 rounded-2xl">
              <Key className="text-cyan-400 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Password Analysis</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Brute-force Prevention</p>
            </div>
          </div>
          
          <div className="space-y-6 flex-grow">
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to test"
                className="w-full bg-black border border-cyan-500/30 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all text-white placeholder:text-gray-600 font-mono"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors p-2"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button 
              onClick={checkPassword}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group uppercase tracking-widest text-sm"
            >
              Run Security Audit
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="p-5 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-cyan-400">
                <Info className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Why it matters</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Strong passwords are your first line of defense against <span className="text-white font-bold">brute-force</span> and <span className="text-white font-bold">dictionary attacks</span>.
              </p>
            </div>

            <div className="p-5 bg-black/50 border border-cyan-500/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Strength Protocol</span>
              </div>
              <ul className="grid grid-cols-2 gap-3 text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> 8-12 Chars</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Uppercase</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Numbers</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Symbols</li>
              </ul>
            </div>
          </div>

          <AnimatePresence>
            {passwordStrength && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-2xl bg-black border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Audit Result:</span>
                  <span className={`text-sm font-black uppercase tracking-widest ${
                    passwordStrength === 'Strong' ? 'text-green-400' : 
                    passwordStrength === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {passwordStrength}
                  </span>
                </div>
                <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: passwordStrength === 'Strong' ? '100%' : passwordStrength === 'Medium' ? '60%' : '30%' }}
                    className={`h-full ${
                      passwordStrength === 'Strong' ? 'bg-green-500' : 
                      passwordStrength === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Cryptography Section */}
        <motion.section 
          id="crypto"
          whileHover={{ y: -5 }}
          className="bg-[#0a0a0a] p-8 rounded-3xl border border-cyan-500/20 glow-border flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-4 bg-cyan-500/10 rounded-2xl">
              <Lock className="text-cyan-400 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Data Cryptography</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Symmetric & Asymmetric</p>
            </div>
          </div>

          <div className="space-y-6 flex-grow">
            <textarea 
              value={cryptoText}
              onChange={(e) => setCryptoText(e.target.value)}
              placeholder="Enter data for cryptographic processing..."
              className="w-full bg-black border border-cyan-500/30 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all text-white h-40 resize-none font-mono text-sm"
            />

            <select 
              value={cryptoMethod}
              onChange={(e) => setCryptoMethod(e.target.value as 'base64' | 'rsa')}
              className="w-full bg-black border border-cyan-500/30 rounded-2xl px-6 py-4 text-white appearance-none cursor-pointer font-bold uppercase tracking-widest text-xs"
            >
              <option value="base64">Symmetric (Base64 Encoding)</option>
              <option value="rsa">Asymmetric (Simulated RSA)</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleEncrypt}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs"
              >
                Encrypt
              </button>
              <button 
                onClick={handleDecrypt}
                className="bg-black border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs"
              >
                Decrypt
              </button>
            </div>
          </div>

          <AnimatePresence>
            {cryptoResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="p-6 bg-black rounded-2xl border border-cyan-500/30 break-all font-mono text-cyan-400 text-sm glow-text">
                  {cryptoResult}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Website Safety Checker */}
        <motion.section 
          id="checker"
          whileHover={{ y: -5 }}
          className="bg-[#0a0a0a] p-8 rounded-3xl border border-cyan-500/20 glow-border flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-4 bg-cyan-500/10 rounded-2xl">
              <Globe className="text-cyan-400 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Web Verification</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">HTTPS & Phishing Detection</p>
            </div>
          </div>

          <div className="space-y-6 flex-grow">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://secure-portal.com"
              className="w-full bg-black border border-cyan-500/30 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all text-white font-mono text-sm"
            />

            <button 
              onClick={checkWebsite}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm"
            >
              Scan Domain
            </button>

            <div className="p-5 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-white font-bold">HTTPS</span> ensures your data is encrypted during transit. Always verify the domain name carefully.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {urlResult.status && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-8 p-6 rounded-2xl border flex items-start gap-4 ${
                  urlResult.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                  urlResult.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                  'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {urlResult.type === 'success' ? <ShieldCheck className="w-6 h-6 shrink-0" /> : <ShieldAlert className="w-6 h-6 shrink-0" />}
                <p className="text-sm font-medium leading-relaxed">
                  {urlResult.status}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shield className="text-cyan-400 w-6 h-6" />
            <span className="text-xl font-black tracking-tighter uppercase">CyberShield</span>
          </div>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            © 2026 CyberShield Security Protocols. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><ExternalLink className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
