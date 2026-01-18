"use client";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
       <h2 className="text-2xl font-bold text-slate-900 mb-6">School Settings</h2>
       
       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
           <div>
               <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">General Info</h3>
               <div className="grid gap-4">
                   <div className="space-y-2">
                       <Label>School Name</Label>
                       <Input defaultValue="Oxford High School" />
                   </div>
                   <div className="space-y-2">
                       <Label>Principal Name</Label>
                       <Input defaultValue="Mr. John Doe" />
                   </div>
                   <div className="space-y-2">
                       <Label>Contact Email</Label>
                       <Input defaultValue="principal@school.com" />
                   </div>
               </div>
           </div>
           
           <div className="pt-4">
               <Button className="bg-indigo-600">Save Changes</Button>
           </div>
       </div>
    </div>
  );
}