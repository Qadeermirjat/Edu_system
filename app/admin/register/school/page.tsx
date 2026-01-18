"use client";

import { useState } from "react";
// 👇 Path Check: 4 folders peeche
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { 
  Building2, User, Mail, Phone, Lock, Calendar, 
  MapPin, CheckCircle2, Wand2, ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterSchool() {
  
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
    alert("School Created & Credentials Emailed!");
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pb-10"
    >
      
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Register New School</h2>
        <p className="text-slate-500 mt-1">Create a new workspace for an institute.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: MAIN FORM (2 Cols Wide) --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Section 1: School Info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <div className="h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <Building2 size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800">Institute Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">School Name</Label>
                        <Input placeholder="Ex: Oxford High School" className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Campus / Branch</Label>
                        <Input placeholder="Main Campus" className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">City</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Karachi" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Director / Admin Access */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <div className="h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <User size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800">Admin Access</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Director Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="Full Name" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Contact Phone</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input placeholder="+92 300..." className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Official Email (Username)</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                            <Input type="email" placeholder="admin@school.com" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl" />
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
                                    className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-200 rounded-xl font-mono" 
                                />
                            </div>
                            <Button type="button" onClick={generatePassword} variant="outline" className="h-12 px-4 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
                                <Wand2 size={18} className="mr-2" /> Generate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: SUBSCRIPTION & ACTIONS (1 Col Wide) --- */}
        <div className="space-y-6">
            
            {/* Plan Selection Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-200">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4">
                    <Calendar size={18} className="text-indigo-400" />
                    <h3 className="font-bold">Subscription</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400 uppercase">Select Plan</Label>
                        <select className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white">
                            <option>14-Day Free Trial</option>
                            <option>Basic (Monthly)</option>
                            <option>Pro (Yearly) - Save 20%</option>
                        </select>
                    </div>

                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-400" /> All Features Access
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-400" /> Unlimited Students
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-400" /> Priority Support
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                 <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all">
                    Create Account <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
                 <p className="text-xs text-center text-slate-400">
                    An email with credentials will be sent to the director automatically.
                 </p>
            </div>

        </div>

      </form>
    </motion.div>
  );
}