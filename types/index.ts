export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  avgPatientsPerDoctor: string;
  patientsPerDoctor: { doctorName: string; specialization: string; count: number }[];
  dateStats: { date: string; count: number }[];
  conditionStats: { condition: string; count: number }[];
}

export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface DoctorResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Doctor[];
}

export interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  phone?: string;
  email?: string;
  doctor: string | Doctor;
  createdAt: string;
}

export interface PatientResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Patient[];
}