"use client";

import Navbar from "../components/ui/Navbar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { 
  ArrowRight, CheckCircle2, Trophy, Users, Zap, BarChart3, Globe, 
  LayoutDashboard, CreditCard, GraduationCap, TrendingUp, Sparkles, 
  Star, HelpCircle, Check, ShieldCheck, Lock, PlayCircle, Code2
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    // 🌑 BACKGROUND: Using a Real Image (Guaranteed to show)
    <div className="min-h-screen relative overflow-hidden font-sans text-slate-200 selection:bg-cyan-500/30">
      
      {/* --- WALLPAPER BACKGROUND (Yeh Laptop zaroor uthayega) --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
            // High Quality Dark Tech Abstract Wallpaper
            backgroundImage: `url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop')`,
            // Dark Overlay taake text parha jaye
            backgroundColor: '#020617' 
        }}
      >
        {/* Dark Overlay Filter */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-32 overflow-hidden z-10">
        <div className="container mx-auto px-6 text-center">
           
           {/* Glowing Badge */}
           <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center rounded-full border border-cyan-500/30 bg-black/40 px-4 py-1.5 text-sm font-medium text-cyan-400 shadow-lg backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
            System v2.0: Live
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-5xl text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 drop-shadow-2xl"
          >
            The Operating System for <br />
            <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
              Modern Education
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed font-medium"
          >
            Ditch the spreadsheets. Manage your entire institute with a platform that feels like magic.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-5"
          >
            {/* Solid Color Button (No Gradient dependency) */}
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.5)] border border-cyan-400/50 transition-all">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm">
              <PlayCircle className="mr-2 h-5 w-5 text-cyan-400" /> Watch Demo
            </Button>
          </motion.div>

          {/* 🔥 DARK DASHBOARD MOCKUP 🔥 */}
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-24 relative mx-auto max-w-6xl z-20"
          >
            <div className="relative rounded-xl border border-white/10 bg-[#0F1117]/90 p-2 shadow-2xl backdrop-blur-xl">
               <div className="rounded-lg border border-white/5 bg-[#0b0d12] shadow-inner overflow-hidden aspect-video relative flex flex-col">
                  {/* Dashboard Header */}
                  <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                     </div>
                     <div className="text-xs font-mono text-slate-500">dashboard.edusmart.app</div>
                  </div>
                  
                  {/* Dashboard Body */}
                  <div className="flex-1 p-6 flex gap-6">
                      {/* Sidebar */}
                      <div className="w-48 hidden md:flex flex-col gap-2">
                          <div className="p-3 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium flex items-center gap-3">
                              <LayoutDashboard size={16} /> Overview
                          </div>
                          {[Users, CreditCard, GraduationCap, Code2].map((Icon, i) => (
                              <div key={i} className="p-3 rounded-md hover:bg-white/5 text-slate-500 text-sm font-medium flex items-center gap-3 transition-colors">
                                  <Icon size={16} /> 
                              </div>
                          ))}
                      </div>

                      {/* Main Area */}
                      <div className="flex-1 flex flex-col gap-4">
                          <div className="grid grid-cols-3 gap-4">
                              {[
                                  { label: "Revenue", val: "$124k", col: "text-cyan-400" },
                                  { label: "Students", val: "2,405", col: "text-purple-400" },
                                  { label: "Efficiency", val: "98%", col: "text-green-400" }
                              ].map((stat, i) => (
                                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                                      <div className="text-xs text-slate-500 uppercase">{stat.label}</div>
                                      <div className={`text-2xl font-bold ${stat.col} mt-1`}>{stat.val}</div>
                                  </div>
                              ))}
                          </div>
                          {/* Chart Bars */}
                          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4 flex items-end justify-between gap-2 px-8">
                                {[30, 50, 45, 80, 60, 75, 50, 90, 70, 60].map((h, i) => (
                                    <div key={i} className="w-full bg-slate-800 rounded-t-sm relative group" style={{height: '100%'}}>
                                        <div 
                                            className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ${i===7 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-slate-700'}`} 
                                            style={{height: `${h}%`}} 
                                        />
                                    </div>
                                ))}
                          </div>
                      </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= INTEGRATIONS ================= */}
      <section className="py-10 border-y border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex overflow-hidden relative">
            <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                className="flex gap-20 whitespace-nowrap items-center text-slate-400 font-bold text-xl"
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-20 items-center">
                        <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-6 h-6 bg-blue-600 rounded-sm"></div> Zoom</span>
                        <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-6 h-6 bg-green-600 rounded-sm"></div> Google</span>
                        <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-6 h-6 bg-yellow-600 rounded-sm"></div> Slack</span>
                        <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-6 h-6 bg-indigo-600 rounded-sm"></div> Teams</span>
                        <span className="flex items-center gap-2 hover:text-white transition-colors"><div className="w-6 h-6 bg-cyan-600 rounded-sm"></div> Stripe</span>
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="py-24 relative z-10 bg-[#050609]/80 backdrop-blur-lg">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <Badge variant="outline" className="mb-4 bg-white/5 text-cyan-400 border-cyan-900">Feature Rich</Badge>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Built for speed & scale</h2>
                <p className="text-lg text-slate-400">Experience the next generation of management software.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature 1 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="md:col-span-2">
                    <Card className="bg-[#0b0d12] border-white/10 shadow-2xl h-full relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                        <CardContent className="p-10 relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center mb-6">
                                    <CreditCard className="text-cyan-400 h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Automated Finance</h3>
                                <p className="text-slate-400 text-lg">Send invoices via WhatsApp. Collect fees via Stripe. Zero manual entry.</p>
                            </div>
                            <Button className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white border-none w-fit">Open Finance Module</Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Feature 2 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                    <Card className="h-full bg-[#0b0d12] border-white/10 hover:border-purple-500/50 transition-all">
                        <CardContent className="p-8">
                            <div className="w-12 h-12 bg-purple-900/20 text-purple-400 rounded-xl flex items-center justify-center mb-4 border border-purple-500/20">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Student 360°</h3>
                            <p className="text-slate-400">Complete academic history, health records, and attendance logs in one click.</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Feature 3 */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                     <Card className="h-full bg-[#0b0d12] border-white/10 hover:border-green-500/50 transition-all">
                        <CardContent className="p-8">
                            <div className="w-12 h-12 bg-green-900/20 text-green-400 rounded-xl flex items-center justify-center mb-4 border border-green-500/20">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Ironclad Security</h3>
                            <p className="text-slate-400">Enterprise-grade encryption with role-based access for Admins & Staff.</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-slate-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-2xl text-white mb-2">
                        <GraduationCap className="h-8 w-8 text-cyan-500" /> EduSmart
                    </div>
                </div>
                <div className="flex gap-6 text-sm">
                    <a href="#" className="hover:text-cyan-400 transition">Privacy</a>
                    <a href="#" className="hover:text-cyan-400 transition">Contact</a>
                </div>
            </div>
            <div className="mt-8 text-center text-xs text-slate-600">
                &copy; 2026 EduSmart Inc.
            </div>
        </div>
      </footer>

    </div>
  );
}