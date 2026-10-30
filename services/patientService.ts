// services/patientService.ts
import api from '@/lib/axios';

export const getDoctorPatientsApi = async (doctorId: string) => {
  const response = await api.get(`/doctors/${doctorId}/patients`);
  return response.data;
};

export const addPatientToDoctorApi = async (doctorId: string, patientData: any) => {
  const response = await api.post(`/doctors/${doctorId}/patients`, patientData);
  return response.data;
};