"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
// 👇 Import paths (2 folders peeche)
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { GraduationCap, Loader2, ArrowRight, ShieldCheck } from "lucide-react"; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 MOCK DATABASE (Updated with Teacher)
  const mockUsers = [
    { email: "admin@system.com", pass: "admin123", role: "SUPER_ADMIN", name: "System Admin" },
    { email: "oxford@school.com", pass: "school123", role: "SCHOOL", name: "Oxford High" },
    { email: "city@college.edu", pass: "college123", role: "COLLEGE", name: "City College" },
    { email: "nust@uni.edu", pass: "uni123", role: "UNIVERSITY", name: "NUST University" },
    // 👇 NEW TEACHER ACCOUNT ADDED
    { email: "teacher@school.com", pass: "teach123", role: "TEACHER", name: "Sir Kamran" }, 
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API Delay
    setTimeout(() => {
        // 1. User Dhoondo
        const user = mockUsers.find(u => u.email === email && u.pass === password);

        if (user) {
            // Token Save karein
            localStorage.setItem("userRole", user.role);
            localStorage.setItem("userName", user.name);

            // 2. Intelligent Routing (Magic happens here 🪄)
            switch (user.role) {
                case "SUPER_ADMIN":
                    router.push("/admin/dashboard");
                    break;
                case "SCHOOL":
                    router.push("/school/dashboard");
                    break;
                case "COLLEGE":
                    router.push("/college/dashboard");
                    break;
                case "UNIVERSITY":
                    router.push("/university/dashboard");
                    break;
                // 👇 NEW ROUTE FOR TEACHER
                case "TEACHER":
                    router.push("/teacher/dashboard"); 
                    break;
                default:
                    setError("Unknown Role Assigned.");
                    setLoading(false);
            }
        } else {
            setError("Invalid email or password.");
            setLoading(false);
        }
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden font-sans text-slate-900">
      
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center p-8 lg:p-20 relative">
         <div className="absolute top-10 left-8 lg:left-16">
             <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <GraduationCap className="h-6 w-6" />
                </div>
                <span className="font-bold text-xl text-slate-800">EduSmart</span>
            </div>
        </div>

        <div className="w-full max-w-[400px] mx-auto mt-16">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h1>
                <p className="text-slate-500">System will automatically detect your workspace.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium border border-red-100 flex items-center gap-2">
                    <ShieldCheck size={16} /> {error}
                </div>}
                
                <div className="space-y-2">
                    <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Official Email</Label>
                    <Input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all"
                        placeholder="admin@institute.com"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label className="text-slate-700 font-bold text-xs uppercase ml-1">Password</Label>
                        <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</Link>
                    </div>
                    <Input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <Button disabled={loading} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all mt-2">
                    {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin h-4 w-4" /> Detecting Account...</span> : <span className="flex items-center">Secure Login <ArrowRight className="ml-2 h-4 w-4" /></span>}
                </Button>
            </form>
            
            <p className="text-center text-sm text-slate-400 mt-8">
                Powered by <span className="text-slate-600 font-bold">EduSmart Enterprise</span>
            </p>
        </div>
      </div>
      
      {/* Right Side: Dynamic Image */}
      <div className="hidden lg:flex relative bg-[#0F172A] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 text-center px-10 max-w-lg">
              <h2 className="text-white text-4xl font-bold mb-6 leading-tight">One ID for <br/> All Campuses.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                  Our intelligent system automatically routes you to your specific School, College, or University dashboard.
              </p>
          </div>
      </div>
    </div>
  );
}