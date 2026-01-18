"use client";

import { useState } from "react";
// 👇 Path Check: 4 folders peeche
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { 
  Building2, User, Mail, Phone, Lock, Calendar, 
  MapPin, CheckCircle2, Wand2, ArrowRight, GraduationCap, Landmark 
} from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterCollege() {
  
  const [password, setPassword] = useState("");

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
    alert("College Account Created Successfully!");
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pb-10"
    >
      
      {/* --- HEADER --- */}
      <div className="mb-8 flex items-end justify-between">
        <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Register New College</h2>
            <p className="text-slate-500 mt-1">Onboard an intermediate or degree college.</p>
        </div>
        <div className="hidden md:block">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold border border-purple-200">
                Higher Education
            </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: MAIN FORM (2 Cols Wide) --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Section 1: College Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -mr-4 -mt-4"></div>
                
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4 relative z-10">
                    <div className="h-8 w-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <Landmark size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800">College Profile</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">College Name</Label>
                        <Input placeholder="Ex: City Science College" className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Affiliation / Board</Label>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Ex: Federal Board / KU" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">City / Location</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Ex: Lahore" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Principal / Admin Access */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <div className="h-8 w-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <User size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800">Principal Access</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Principal Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Dr. Full Name" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Official Phone</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="+92 300..." className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Official Email (Username)</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input type="email" placeholder="principal@college.edu" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Password</Label>
                        <div className="flex gap-2">
                            <div className="relative w-full">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="text" 
                                    placeholder="Click generate" 
                                    className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-purple-200 rounded-xl font-mono" 
                                />
                            </div>
                            <Button type="button" onClick={generatePassword} variant="outline" className="h-12 px-4 border-slate-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200">
                                <Wand2 size={18} className="mr-2" /> Generate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: SUBSCRIPTION & ACTIONS (1 Col Wide) --- */}
        <div className="space-y-6">
            
            {/* Plan Selection Card (Purple Theme) */}
            <div className="bg-[#1E1B4B] text-white p-6 rounded-2xl shadow-xl shadow-purple-200">
                <div className="flex items-center gap-2 mb-6 border-b border-indigo-900 pb-4">
                    <Calendar size={18} className="text-purple-400" />
                    <h3 className="font-bold">College Plan</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400 uppercase">Select Plan</Label>
                        <select className="w-full h-12 rounded-xl bg-[#2E2A5B] border border-indigo-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-white">
                            <option>Standard (Up to 500 Students)</option>
                            <option>Premium (Unlimited)</option>
                            <option>Enterprise (Multi-Campus)</option>
                        </select>
                    </div>

                    <div className="p-4 bg-[#2E2A5B] rounded-xl border border-indigo-900 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-purple-400" /> Exam Management
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-purple-400" /> Faculty Portal
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-purple-400" /> Biometric Sync
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                 <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg shadow-lg shadow-purple-200 transition-all">
                    Register College <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
                 <p className="text-xs text-center text-slate-400">
                    Credentials will be sent to the Principal immediately.
                 </p>
            </div>

        </div>

      </form>
    </motion.div>
  );
}