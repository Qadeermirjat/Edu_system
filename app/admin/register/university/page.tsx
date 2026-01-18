"use client";

import { useState } from "react";
// 👇 Path Check: 4 folders peeche
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { 
  GraduationCap, User, Mail, Phone, Lock, Globe, 
  MapPin, CheckCircle2, Wand2, ArrowRight, Network, Building 
} from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterUniversity() {
  
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("Private"); // State for Sector Selection

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
    let pass = "";
    for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("University Account Created Successfully!");
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto pb-10"
    >
      
      {/* --- HEADER --- */}
      <div className="mb-8 flex items-end justify-between">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-teal-200">
                    Enterprise Level
                </span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Register University</h2>
            <p className="text-slate-500 mt-1">Create a master hub for main and sub-campuses.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: MAIN FORM (2 Cols Wide) --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Section 1: University Profile (Teal Theme) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-teal-300 transition-colors duration-300">
                
                {/* Decorative Background Icon */}
                <GraduationCap className="absolute -right-6 -top-6 text-teal-50 h-32 w-32 rotate-12 transition-transform group-hover:rotate-0 duration-500" />

                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 relative z-10">
                    <div className="h-8 w-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                        <Building size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800">Campus Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">University Name</Label>
                        <Input placeholder="Ex: Stanford University" className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-teal-200 rounded-xl" />
                    </div>
                    
                    {/* Unique Sector Selector */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Sector Type</Label>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            {["Public", "Private"].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSector(type)}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                                        sector === type 
                                        ? "bg-white text-teal-600 shadow-sm" 
                                        : "text-slate-500 hover:text-slate-700"
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Website / Domain</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="www.uni.edu" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-teal-200 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Chancellor / VC Access */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-teal-300 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <div className="h-8 w-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                        <User size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800">Vice Chancellor Access</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">VC Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Prof. Dr. Name" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-teal-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Official Phone</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="+92 300..." className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-teal-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Registrar Email (Username)</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input type="email" placeholder="registrar@uni.edu" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-teal-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Master Password</Label>
                        <div className="flex gap-2">
                            <div className="relative w-full">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="text" 
                                    placeholder="Generate Secure Key" 
                                    className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-teal-200 rounded-xl font-mono" 
                                />
                            </div>
                            <Button type="button" onClick={generatePassword} className="h-12 px-4 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200">
                                <Wand2 size={18} className="mr-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: ENTERPRISE PLAN (Dark Teal Theme) --- */}
        <div className="space-y-6">
            
            {/* Visual Network Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-slate-900 pointer-events-none"></div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl"></div>

                <div className="flex items-center gap-2 mb-6 relative z-10 border-b border-slate-700 pb-4">
                    <Network size={18} className="text-teal-400" />
                    <h3 className="font-bold">Enterprise Structure</h3>
                </div>

                <div className="space-y-5 relative z-10">
                     <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400 uppercase">Select Plan</Label>
                        <select className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-white">
                            <option>Multi-Campus (Unlimited)</option>
                            <option>Research Hub (Single)</option>
                            <option>Global Network</option>
                        </select>
                    </div>

                    <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 space-y-3">
                        <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Included Modules</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-teal-400" /> Research & Thesis Portal
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-teal-400" /> Alumni Network
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-teal-400" /> Hostel Management
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                 <Button className="w-full h-12 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-lg shadow-lg shadow-teal-200 transition-all">
                    Initialize University <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
                 <p className="text-xs text-center text-slate-400">
                    Master credentials will be sent to the VC & Registrar securely.
                 </p>
            </div>

        </div>

      </form>
    </motion.div>
  );
}