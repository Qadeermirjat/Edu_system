"use client";

import { useState } from "react";
// 👇 Path Check: 3 folders peeche
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { 
  MessageSquare, Star, Heart, TrendingUp, 
  Quote, ThumbsUp, Filter, Download, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const initialFeedbacks = [
  { id: 1, user: "Dr. Sarah Ahmed", role: "Principal, Oxford High", msg: "This system has completely transformed how we manage our school. Best investment ever.", rating: 5, date: "2 hours ago", sentiment: "Super Happy" },
  { id: 2, user: "Mr. Ali Raza", role: "Director, City College", msg: "The 'Auto-Fee Challan' feature saved us 100s of hours. Kudos! 👏👏", rating: 5, date: "1 day ago", sentiment: "Impressed" },
  { id: 3, user: "Ms. Ayesha Khan", role: "Admin, Beaconhouse", msg: "Finally, a software that doesn't lag. The speed is incredible.", rating: 4, date: "3 days ago", sentiment: "Happy" },
  { id: 4, user: "Gen. Asim (Retd)", role: "VC, NUST", msg: "Enterprise module is world-class. Deploying to all sub-campuses.", rating: 5, date: "1 week ago", sentiment: "Loyal Client" },
  { id: 5, user: "Hamza Tariq", role: "IT Head, Roots", msg: "Support team is very responsive. Solved my issue in 5 mins.", rating: 5, date: "2 weeks ago", sentiment: "Grateful" },
  { id: 6, user: "Mr. John", role: "Teacher", msg: "Needs a dark mode for mobile app.", rating: 3, date: "1 month ago", sentiment: "Neutral" },
];

export default function Feedbacks() {
  const [activeFilter, setActiveFilter] = useState("All"); // All | 5 Star | Latest
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // 1️⃣ Filter Logic
  const filteredFeedbacks = initialFeedbacks.filter(item => {
      if (activeFilter === "All") return true;
      if (activeFilter === "5 Stars Only") return item.rating === 5;
      if (activeFilter === "Latest Today") return item.date.includes("hour") || item.date.includes("day");
      return true;
  });

  // 2️⃣ Download Function
  const handleDownloadReport = () => {
    const headers = ["User, Role, Message, Rating, Date, Sentiment"];
    const rows = filteredFeedbacks.map(f => 
        `"${f.user}", "${f.role}", "${f.msg}", ${f.rating}, "${f.date}", "${f.sentiment}"`
    );
    
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "feedback_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Wall of Love ❤️</h2>
           <p className="text-slate-500 font-medium mt-1">See what your clients are saying about your hard work.</p>
        </div>
        
        {/* Actions Area */}
        <div className="flex gap-2 relative">
            
            {/* Filter Button & Dropdown */}
            <div className="relative">
                <Button 
                    variant="outline" 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                >
                    <Filter className="mr-2 h-4 w-4" /> 
                    {activeFilter === "All" ? "Filter" : activeFilter}
                </Button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {showFilterMenu && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                        >
                            {["All", "5 Stars Only", "Latest Today"].map((option) => (
                                <button
                                    key={option}
                                    onClick={() => { setActiveFilter(option); setShowFilterMenu(false); }}
                                    className="w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center justify-between"
                                >
                                    {option}
                                    {activeFilter === option && <Check size={14} className="text-indigo-600" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Download Button */}
            <Button 
                onClick={handleDownloadReport}
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-300 transition-all active:scale-95"
            >
                <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
        </div>
      </div>

      {/* --- MOTIVATION STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4"><Heart size={100} /></div>
              <div className="relative z-10">
                  <p className="text-indigo-100 font-bold uppercase text-xs tracking-wider mb-1">Happiness Score</p>
                  <h3 className="text-4xl font-extrabold flex items-center gap-2">98% <TrendingUp size={28} className="text-green-300" /></h3>
                  <p className="text-sm text-indigo-100 mt-2">Based on {filteredFeedbacks.length} reviews.</p>
              </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="h-16 w-16 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500 shadow-sm"><Star size={32} fill="currentColor" /></div>
              <div>
                  <h3 className="text-3xl font-bold text-slate-900">4.9/5</h3>
                  <p className="text-slate-500 text-sm font-medium">Average Client Rating</p>
                  <div className="flex gap-1 mt-1">{[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}</div>
              </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="h-16 w-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 shadow-sm"><MessageSquare size={32} /></div>
              <div>
                  <h3 className="text-3xl font-bold text-slate-900">12k+</h3>
                  <p className="text-slate-500 text-sm font-medium">Positive Feedbacks</p>
                  <p className="text-xs text-green-600 font-bold mt-1">+124 this week</p>
              </div>
          </div>
      </div>

      {/* --- SPOTLIGHT CARD --- */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-8 relative overflow-hidden">
          <Quote className="absolute top-6 left-6 text-amber-200 h-24 w-24 opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-center md:text-left">
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none mb-4 px-3 py-1">👑 Client of the Month</Badge>
                  <h3 className="text-2xl font-bold text-slate-800 leading-relaxed italic">"I have used many systems in my 20 years of career, but this software is a masterpiece. It just works!"</h3>
                  <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">DR</div>
                      <div>
                          <p className="font-bold text-slate-900">Dr. Richard</p>
                          <p className="text-sm text-slate-500">Dean, Stanford University</p>
                      </div>
                  </div>
              </div>
              <div className="hidden md:block">
                  <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center shadow-lg text-amber-500"><ThumbsUp size={48} /></div>
              </div>
          </div>
      </div>

      {/* --- FEED GRID --- */}
      <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
              <span>Recent Shoutouts</span>
              <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Showing: {activeFilter}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
              {filteredFeedbacks.map((item, i) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
                                  {item.user.charAt(0)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900 text-sm">{item.user}</h4>
                                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">{item.role}</p>
                              </div>
                          </div>
                          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{item.date}</Badge>
                      </div>

                      <div className="mb-4">
                           <div className="flex gap-1 mb-2">
                              {[...Array(5)].map((_, starIndex) => (
                                  <Star key={starIndex} size={14} className={starIndex < item.rating ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-slate-200"} />
                              ))}
                           </div>
                           <p className="text-slate-600 text-sm leading-relaxed">"{item.msg}"</p>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.sentiment.includes('Happy') || item.sentiment.includes('Impressed') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                              {item.sentiment}
                          </span>
                      </div>
                  </motion.div>
              ))}
              </AnimatePresence>
          </div>
          
          {filteredFeedbacks.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500">No feedbacks found for this filter.</p>
                  <Button variant="link" onClick={() => setActiveFilter("All")} className="text-indigo-600">Clear Filter</Button>
              </div>
          )}
      </div>

    </motion.div>
  );
}