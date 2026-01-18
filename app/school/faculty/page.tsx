"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { 
  Search, Plus, GraduationCap, Mail, Phone, 
  Trash2, Edit, Ban, X, BookOpen, Users, Camera, UploadCloud 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";

export default function FacultyPage() {
  
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock Data (Kuch teachers ki pics hain, kuch ki nahi)
  const [teachers, setTeachers] = useState([
    { 
      id: 1, 
      name: "Sir Kamran", 
      subject: "Mathematics", 
      dept: "Science", 
      email: "kamran@school.edu", 
      phone: "0300-9876543", 
      status: "Active", 
      experience: "5 Years",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60" // Pic wala teacher
    },
    { 
      id: 2, 
      name: "Ms. Hina", 
      subject: "English Lit", 
      dept: "Arts", 
      email: "hina@school.edu", 
      phone: "0333-5556667", 
      status: "Active", 
      experience: "3 Years",
      image: null // Bina Pic wala teacher (Initials dikhenge)
    },
    { 
      id: 3, 
      name: "Dr. Ahmed", 
      subject: "Physics", 
      dept: "Science", 
      email: "ahmed@school.edu", 
      phone: "0345-1122334", 
      status: "On Leave", 
      experience: "8 Years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
    },
    { 
      id: 4, 
      name: "Ms. Sara", 
      subject: "Islamiyat", 
      dept: "Humanities", 
      email: "sara@school.edu", 
      phone: "0321-4433221", 
      status: "Active", 
      experience: "2 Years",
      image: null
    },
  ]);

  // Form State
  const [newTeacher, setNewTeacher] = useState<any>({ name: "", subject: "", email: "", phone: "", image: null });

  // --- FILTER LOGIC ---
  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || t.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Local preview create karta hai
      setNewTeacher({ ...newTeacher, image: imageUrl });
    }
  };

  // --- ADD TEACHER ACTION ---
  const handleAddTeacher = () => {
      const id = teachers.length + 1;
      setTeachers([...teachers, { 
          id, dept: "General", status: "Active", experience: "1 Year", 
          ...newTeacher 
      }]);
      setIsAddModalOpen(false);
      setNewTeacher({ name: "", subject: "", email: "", phone: "", image: null });
      alert("Teacher Account Created Successfully!");
  };

  const handleDelete = (id: number) => {
      if(confirm("Delete this teacher's profile?")) {
          setTeachers(teachers.filter(t => t.id !== id));
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Faculty Staff</h2>
          <p className="text-slate-500 font-medium mt-1">Manage teachers, assignments and schedules.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 h-10 px-6">
            <Plus className="mr-2 h-4 w-4"/> Add New Faculty
        </Button>
      </div>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-indigo-500 shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Total Faculty</p>
                      <h3 className="text-2xl font-extrabold text-slate-900">{teachers.length}</h3>
                  </div>
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center"><Users size={20} /></div>
              </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Active Now</p>
                      <h3 className="text-2xl font-extrabold text-slate-900">
                          {teachers.filter(t => t.status === 'Active').length}
                      </h3>
                  </div>
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><BookOpen size={20} /></div>
              </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500 shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">On Leave</p>
                      <h3 className="text-2xl font-extrabold text-slate-900">
                           {teachers.filter(t => t.status === 'On Leave').length}
                      </h3>
                  </div>
                  <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><Ban size={20} /></div>
              </CardContent>
          </Card>
      </div>

      {/* --- FILTERS --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search teacher name or subject..." 
                className="pl-10 h-10 border-none bg-slate-50 focus:bg-white transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <div className="flex gap-2 w-full md:w-auto px-2 overflow-x-auto">
              {["All", "Science", "Arts", "IT", "Humanities"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        selectedDept === dept 
                        ? "bg-slate-900 text-white shadow-md" 
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                      {dept}
                  </button>
              ))}
          </div>
      </div>

      {/* --- TEACHERS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredTeachers.map((t) => (
                <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={t.id}
                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                    {/* Card Header (Color Strip) */}
                    <div className={`h-2 w-full ${
                        t.dept === 'Science' ? 'bg-blue-500' : 
                        t.dept === 'Arts' ? 'bg-pink-500' : 
                        t.dept === 'IT' ? 'bg-purple-500' : 'bg-slate-500'
                    }`}></div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            {/* Logic: Agar Image hai to Image dikhao, warna Initials */}
                            {t.image ? (
                                <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="h-16 w-16 rounded-2xl object-cover shadow-md border border-slate-100" 
                                />
                            ) : (
                                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-500 shadow-inner">
                                    {t.name.charAt(0)}
                                </div>
                            )}

                            <Badge className={`${t.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} border-none`}>
                                {t.status}
                            </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{t.name}</h3>
                        <p className="text-sm font-medium text-indigo-600 mb-1">{t.subject} Teacher</p>
                        <p className="text-xs text-slate-400 font-medium mb-4">{t.experience} Experience</p>

                        <div className="space-y-3 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Mail size={14} className="text-slate-400"/> 
                                <span className="truncate">{t.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone size={14} className="text-slate-400"/> 
                                {t.phone}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button variant="outline" size="sm" className="flex-1 h-8 text-xs font-bold border-slate-200 hover:bg-indigo-50 hover:text-indigo-600">
                                <Edit size={12} className="mr-1"/> Edit
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDelete(t.id)}
                                className="h-8 w-8 p-0 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                            >
                                <Trash2 size={12}/>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            ))}
          </AnimatePresence>
      </div>

      {filteredTeachers.length === 0 && (
          <div className="text-center py-20">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Search size={40} />
              </div>
              <h3 className="text-slate-900 font-bold">No Faculty Found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
      )}

      {/* --- ADD TEACHER MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-900">Register New Faculty</h3>
                        <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={20}/>
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-5">
                        
                        {/* 📸 IMAGE UPLOAD SECTION */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-20 w-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:border-indigo-500 transition-colors cursor-pointer group">
                                {newTeacher.image ? (
                                    <img src={newTeacher.image} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <Camera className="text-slate-400 group-hover:text-indigo-500" />
                                )}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Profile Photo <span className="text-xs text-slate-400 font-normal">(Optional)</span></h4>
                                <p className="text-xs text-slate-500 mt-1">Click to upload. JPG or PNG allowed.</p>
                            </div>
                        </div>

                        {/* INPUTS */}
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input 
                                placeholder="Ex: Sir Kamran" 
                                value={newTeacher.name} 
                                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Subject / Department</Label>
                            <Input 
                                placeholder="Ex: Mathematics" 
                                value={newTeacher.subject} 
                                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Email (Login ID)</Label>
                                <Input 
                                    placeholder="teacher@school.edu" 
                                    value={newTeacher.email} 
                                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input 
                                    placeholder="0300..." 
                                    value={newTeacher.phone} 
                                    onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button onClick={handleAddTeacher} className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-100">
                                Create Account
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}