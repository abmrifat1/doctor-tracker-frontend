// app/(dashboard)/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDashboardStats } from '@/store/slices/dashboardSlice';
import { Users, Stethoscope, Activity, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function DashboardPage() {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.dashboard);
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (token && !stats) {
      dispatch(fetchDashboardStats());
    }
  }, [dispatch, token, stats]);

  useEffect(() => {
    if (token && pathname === '/') {
      dispatch(fetchDashboardStats());
    }
  }, [dispatch, token, pathname]);

  const chartData = useMemo(() => {
    if (!stats) return { doctors: [], dates: [] };
    return {
      doctors: stats.patientsPerDoctor ? stats.patientsPerDoctor.slice(0, 10) : [],
      dates: stats.dateStats || [],
    };
  }, [stats]);

  if (!isMounted || !token) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
        <p className="font-semibold">Error Loading Dashboard</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={() => dispatch(fetchDashboardStats())}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
        <p className="text-slate-500">Welcome to Doctor Tracker Admin Dashboard.</p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600"><Stethoscope size={28} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Doctors</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats?.totalDoctors || 0}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600"><Users size={28} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Patients</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats?.totalPatients || 0}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-purple-600"><Activity size={28} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Avg Patients / Doctor</p>
            <h3 className="text-3xl font-bold text-slate-800">{stats?.avgPatientsPerDoctor || 0}</h3>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">Top Doctors by Patients</h3>
          </div>
          <div className="h-[300px] w-full">
            {chartData.doctors?.length > 0 ?
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.doctors} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="doctorName" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'black' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer> :
              <div className='text-orange-500'>No Doctor Joined</div>
            }
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-emerald-500" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">Patient Registration Trend</h3>
          </div>
          <div className="h-[300px] w-full">
            {chartData.dates?.length > 0 ?
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.dates} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'black' }} />
                  <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer> :
              <div className='text-orange-500'>No Patients Registered</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}