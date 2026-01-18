"use client";

import Link from "next/link";
// Relative paths ensure karein
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ArrowLeft, GraduationCap, Mail, Lock, User, Github, CheckCircle2, Rocket } from "lucide-react"; 
import { motion } from "framer-motion";

export default function SignupPage() {
  
  // Smooth Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden font-sans text-slate-900">
      
      {/* --- LEFT SIDE: SIGNUP FORM --- */}
      <div className="flex flex-col justify-center p-8 lg:p-20 relative">
        
        {/* Top Header */}
        <div className="absolute top-10 left-8 lg:left-16">
             <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
                <div className="h-10 w-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <GraduationCap className="h-6 w-6" />
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">EduSmart</span>
            </Link>
        </div>

        {/* Main Form Container */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[420px] mx-auto mt-20"
        >
            <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Create account
                </h1>
                <p className="text-slate-500 text-lg">
                    Start your 14-day free trial today.
                </p>
            </motion.div>

            {/* Signup Form */}
            <div className="space-y-5">
                
                {/* Full Name */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Full Name</Label>
                    <div className="relative group">
                        <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <User className="h-5 w-5" />
                        </div>
                        <Input 
                            placeholder="John Doe" 
                            type="text" 
                            className="pl-12 h-14 bg-slate-100 border-transparent text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 transition-all duration-300 rounded-2xl text-base font-medium"
                        />
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Email</Label>
                    <div className="relative group">
                        <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <Mail className="h-5 w-5" />
                        </div>
                        <Input 
                            placeholder="admin@school.com" 
                            type="email" 
                            className="pl-12 h-14 bg-slate-100 border-transparent text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 transition-all duration-300 rounded-2xl text-base font-medium"
                        />
                    </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase tracking-wider ml-1">Password</Label>
                    <div className="relative group">
                        <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                            <Lock className="h-5 w-5" />
                        </div>
                        <Input 
                            placeholder="Create a strong password" 
                            type="password" 
                            className="pl-12 h-14 bg-slate-100 border-transparent text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 transition-all duration-300 rounded-2xl text-base font-medium"
                        />
                    </div>
                </motion.div>

                {/* Create Account Button */}
                <motion.div variants={itemVariants} className="pt-2">
                    <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300">
                        Create Account
                    </Button>
                </motion.div>

                {/* Terms Text */}
                <motion.p variants={itemVariants} className="text-xs text-center text-slate-400 px-4">
                    By clicking above, you agree to our <a href="#" className="underline hover:text-indigo-600">Terms</a> and <a href="#" className="underline hover:text-indigo-600">Privacy Policy</a>.
                </motion.p>

                {/* Divider */}
                <motion.div variants={itemVariants}>
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-3 text-slate-400 font-bold">Or sign up with</span></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Button variant="outline" className="h-12 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-xl transition-all">
                            <Github className="mr-2 h-5 w-5" /> Github
                        </Button>
                        <Button variant="outline" className="h-12 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-xl transition-all">
                             <div className="mr-2 h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center font-serif font-bold text-indigo-600 text-xs">G</div> Google
                        </Button>
                    </div>
                </motion.div>

                <motion.p variants={itemVariants} className="text-center text-slate-500 font-medium pt-2">
                    Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
                </motion.p>
            </div>
        </motion.div>
      </div>

      {/* --- RIGHT SIDE: GET STARTED (Darker & Exciting) --- */}
      <div className="hidden lg:flex relative bg-[#0F172A] items-center justify-center overflow-hidden">
         
         {/* Background Image (Different from Login) */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop')` }}
         />
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/90 to-slate-900/95" />

         {/* Content Container */}
         <div className="relative z-10 max-w-md w-full p-10">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-8">
                <Rocket size={12} /> Start your journey
             </div>

             {/* Headline */}
             <h2 className="text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                 Join the future of education.
             </h2>
             
             <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                 Experience the platform that powers the world's leading schools. Set up your institute in minutes.
             </p>

             {/* Checklist */}
             <div className="space-y-4">
                 {[
                    "No credit card required",
                    "14-day free trial on Pro plan",
                    "24/7 Priority Support",
                    "Cancel anytime"
                 ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-slate-200">
                         <CheckCircle2 className="h-5 w-5 text-teal-400" />
                         <span className="font-medium">{item}</span>
                     </div>
                 ))}
             </div>
         </div>
      </div>

    </div>
  );
}