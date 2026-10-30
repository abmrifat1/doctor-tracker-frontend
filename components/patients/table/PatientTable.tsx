// components/patients/table/PatientTable.tsx
import { Edit, Trash2 } from 'lucide-react';
import { Patient } from '@/types';

interface Props {
  patients: Patient[];
  loading: boolean;
  page: number;
  pages: number;
  currentPage: number;
  setCurrentPage: (val: number | ((p: number) => number)) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

export default function PatientTable({ patients, loading, page, pages, currentPage, setCurrentPage, onEdit, onDelete }: Props) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Age</th>
                <th className="p-4 font-semibold">Condition</th>
                <th className="p-4 font-semibold">Doctor</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center p-8 text-slate-500">Loading patients...</td></tr>
              ) : patients.length === 0 ? (
                <tr><td colSpan={6} className="text-center p-8 text-slate-500">No patients found.</td></tr>
              ) : (
                patients?.map((patient) => {
                  const doctorName = typeof patient.doctor === 'object' && patient.doctor !== null
                    ? patient.doctor.name
                    : 'Unknown Doctor';

                  return (
                    <tr key={patient._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{patient.name}</td>
                      <td className="p-4 text-slate-600">{patient.age}</td>
                      <td className="p-4 text-blue-600 font-medium">{patient.condition}</td>
                      <td className="p-4 text-slate-600">{doctorName}</td>
                      <td className="p-4 text-slate-600">
                        {patient.phone && <p>{patient.phone}</p>}
                        {patient.email && <p className="text-sm">{patient.email}</p>}
                      </td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        <button onClick={() => onEdit(patient)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Patient">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => onDelete(patient._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Patient">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50">Previous</button>
          <span className="text-sm font-medium text-slate-600">Page {page} of {pages}</span>
          <button disabled={currentPage === pages} onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50">Next</button>
        </div>
      )}
    </>
  );
}