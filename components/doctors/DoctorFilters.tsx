// components/doctors/DoctorFilters.tsx
import { Search } from 'lucide-react';

interface Props {
  search: string;
  setSearch: (val: string) => void;
  specialization: string;
  setSpecialization: (val: string) => void;
  dateFrom: string;
  setDateFrom: (val: string) => void;
  dateTo: string;
  setDateTo: (val: string) => void;
  setCurrentPage: (val: number) => void;
  specializations: string[];
}

export default function DoctorFilters({
  search, setSearch,
  specialization, setSpecialization,
  dateFrom, setDateFrom,
  dateTo, setDateTo,
  setCurrentPage,
  specializations
}: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search */}
      <div className="md:col-span-1 flex flex-col">
        <label className="text-xs text-slate-500 mb-1 ml-1">Search</label>

        {/* Flex Container for Icon and Input */}
        <div className="flex items-center w-full px-4 py-2 border border-slate-300 rounded-xl focus-within:border-blue-500 bg-white transition-colors">
          <Search className="text-slate-400 shrink-0" size={20} />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full ml-3 text-gray-600 outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Specialization */}
      <div className="md:col-span-1">
        <label className="text-xs text-slate-500 mb-1 ml-1">Specialization</label>
        <select
          value={specialization}
          onChange={(e) => { setSpecialization(e.target.value); setCurrentPage(1); }}
          className="w-full text-gray-600 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-700"
        >
          <option value="">All Specializations</option>
          {specializations?.map((spec, index) => (
            <option key={index} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {/* Date From */}
      <div className="md:col-span-1 flex flex-col">
        <label className="text-xs text-slate-500 mb-1 ml-1">From Date</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
          className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-700"
        />
      </div>

      {/* Date To */}
      <div className="md:col-span-1 flex flex-col">
        <label className="text-xs text-slate-500 mb-1 ml-1">To Date</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
          className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-700"
        />
      </div>
    </div>
  );
}