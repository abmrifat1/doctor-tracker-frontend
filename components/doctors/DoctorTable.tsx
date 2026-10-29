// components/doctors/DoctorTable.tsx
import { Trash2, UserPlus } from 'lucide-react';
import { Doctor } from '@/types';

interface Props {
  doctors: Doctor[];
  loading: boolean;
  page: number;
  pages: number;
  currentPage: number;
  setCurrentPage: (val: number | ((p: number) => number)) => void;
  onDelete: (id: string) => void;
  onManagePatients: (doctor: Doctor) => void;
}

export default function DoctorTable({ doctors, loading, page, pages, currentPage, setCurrentPage, onDelete, onManagePatients }: Props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Specialization</th>
                <th className="p-4 font-semibold">Hospital</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center p-8 text-slate-500">Loading doctors...</td></tr>
              ) : doctors.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-8 text-slate-500">No doctors found.</td></tr>
              ) : (
                doctors.map((doc) => (
                  <tr key={doc._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td onClick={() => onManagePatients(doc)} className="p-4 font-medium text-slate-800">{doc.name}</td>
                    <td onClick={() => onManagePatients(doc)} className="p-4 text-blue-600 font-medium">{doc.specialization}</td>
                    <td className="p-4 text-slate-600">{doc.hospital}</td>
                    <td className="p-4 text-slate-600">
                      <p>{doc.phone}</p>
                      <p className="text-sm">{doc.email}</p>
                    </td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button onClick={() => onManagePatients(doc)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="View/Add Patients">
                        <UserPlus size={18} />
                      </button>
                      <button onClick={() => onDelete(doc._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Doctor">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-slate-600">
            Page {page} of {pages}
          </span>
          <button
            disabled={currentPage === pages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50 transition"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}