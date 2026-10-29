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