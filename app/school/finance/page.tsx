"use client";

import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { DollarSign, Download, Printer } from "lucide-react";

export default function FinancePage() {
  const transactions = [
    { id: 101, student: "Ali Khan", class: "10th", amount: "$50", status: "Paid", date: "Jan 18, 2026" },
    { id: 102, student: "Bilal", class: "5th", amount: "$45", status: "Pending", date: "Jan 17, 2026" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Fee & Finance</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="bg-emerald-600 text-white border-none">
            <CardContent className="p-6">
                <p className="text-emerald-100 text-xs font-bold uppercase">Total Collected</p>
                <h3 className="text-3xl font-bold mt-2">$12,450</h3>
            </CardContent>
         </Card>
         <Card className="bg-white border-slate-200">
            <CardContent className="p-6">
                <p className="text-slate-500 text-xs font-bold uppercase">Pending Dues</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-900">$3,200</h3>
            </CardContent>
         </Card>
      </div>

      {/* Challan List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
         <h3 className="font-bold text-slate-800 mb-4">Recent Challans</h3>
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
                <tr>
                    <th className="p-3">Challan ID</th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100 last:border-0">
                        <td className="p-3 font-mono">#{t.id}</td>
                        <td className="p-3 font-medium">{t.student} <span className="text-slate-400 text-xs">({t.class})</span></td>
                        <td className="p-3 font-bold">{t.amount}</td>
                        <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${t.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                {t.status}
                            </span>
                        </td>
                        <td className="p-3 text-right">
                            <Button variant="ghost" size="icon"><Printer size={16} className="text-slate-400"/></Button>
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}