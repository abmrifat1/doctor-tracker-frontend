// services/doctorService.ts
import api from '@/lib/axios';
import { Doctor, DoctorResponse } from '@/types';

export const getDoctorsApi = async (queryString: string) => {
  const response = await api.get(`/doctors?${queryString}`);
  return response.data as DoctorResponse;
};

export const createDoctorApi = async (doctorData: Omit<Doctor, '_id' | 'createdAt'>) => {
  const response = await api.post('/doctors', doctorData);
  return response.data;
};

export const deleteDoctorApi = async (id: string) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};

export const getDoctorPatientsApi = async (doctorId: string) => {
  const response = await api.get(`/doctors/${doctorId}/patients`);
  return response.data;
};

export const addPatientToDoctorApi = async (doctorId: string, patientData: any) => {
  const response = await api.post(`/doctors/${doctorId}/patients`, patientData);
  return response.data;
};