# Doctor Tracker - Fullstack Admin Portal

## 1. Elevator Pitch
Doctor Tracker is a secure, full-stack administrative web application designed for healthcare facilities to manage doctors and their patients efficiently. Built with Next.js, Node.js, and MongoDB, it features a robust authentication system, real-time data visualization (charts/graphs), advanced filtering, and a highly responsive, user-friendly interface. The system enables administrators to seamlessly onboard doctors, manage patient records, and gain actionable insights through an interactive dashboard.

## 2. Live Links & Credentials
- **Frontend URL:** [https://doctor-tracker-frontend-omega.vercel.app/](https://doctor-tracker-frontend-omega.vercel.app/)
- **Backend API URL:** [https://doctor-tracker-backend-three.vercel.app/](https://doctor-tracker-backend-three.vercel.app/)
- **Frontend GitHub Repo:** [https://github.com/abmrifat1/doctor-tracker-frontend](https://github.com/abmrifat1/doctor-tracker-frontend)
- **Backend GitHub Repo:** [https://github.com/abmrifat1/doctor-tracker-backend](https://github.com/abmrifat1/doctor-tracker-backend)

**Admin Credentials:**
- Email: `admin@doctor.com`
- Password: `admin123`

## 3. Setup Guide (Local Installation)

### Prerequisites
- Node.js (v20 or higher)

### Frontend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/abmrifat1/doctor-tracker-frontend.git
   cd doctor-tracker-frontend
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```
  
3. Create a .env file from the .env.local file:
    ```bash
    cp .env.local .env
    ```

4. Ensure `NEXT_PUBLIC_ENV` is set to `dev` 
   and `NEXT_PUBLIC_DEV_API_URL` points to http://localhost:5000/api

5. Start the frontend server:
    ```bash
    npm run dev


## 4. System Architecture
The application follows a decoupled Client-Server architecture:

- Client (Frontend): Next.js (App Router) with Redux Toolkit for state management. It uses Axios for API communication and Recharts for data visualization.

- Server (Backend): Node.js and Express.js. It handles authentication via JWT, routes requests, and enforces validation using Express-Validator.

- Database: MongoDB Atlas (Cloud) or Local MongoDB. Mongoose is used as an ODM to define schemas, create indexes, and manage relationships.

- Data Flow: The Client sends an HTTP request with a JWT Bearer token -> The Express Server validates the token -> The server queries MongoDB -> Aggregated data is returned as JSON -> Redux updates the state -> UI re-renders.

## 5. Technical Decisions
  1: Why Redux Toolkit over Context API?
  - Reason: The application requires managing multiple states (auth, doctors list, patients list, dashboard stats). Redux Toolkit provides a centralized store with predictable state updates. It significantly reduces unnecessary re-renders compared to the Context API, especially when dealing with complex filtering and pagination on the Doctors and Patients lists.


  2: Why use createdAt for Date-Wise Filtering?
  - Reason: Since the current scope does not include an appointment scheduling module, the "date-wise filtering" requirement was interpreted as filtering by the record's creation date (createdAt). This allows the admin to track when a doctor or patient was registered in the system within a specific timeframe. Compound indexes were added to the Mongoose schema to optimize these date-based queries.

## 6. Visual Evidence (Screenshots)
### Desktop View
<img width="1459" height="1011" alt="Screenshot from 2026-10-30 15-17-15" src="https://github.com/user-attachments/assets/999a8a1e-84c1-4af7-9ffd-f80170b17255" />
<img width="1413" height="929" alt="Screenshot from 2026-10-30 15-37-30" src="https://github.com/user-attachments/assets/30ffd0b6-19d3-4d5d-a15e-0e1c58267f3e" />
<img width="1415" height="934" alt="Screenshot from 2026-10-30 15-38-18" src="https://github.com/user-attachments/assets/f6203cda-d8b4-47b9-8171-496c6fb9acfa" />
<img width="1408" height="932" alt="Screenshot from 2026-10-30 15-38-29" src="https://github.com/user-attachments/assets/a8bf9f93-cb2a-4657-b1ed-2e3aca180fe4" />
<img width="1412" height="934" alt="Screenshot from 2026-10-30 15-38-43" src="https://github.com/user-attachments/assets/b0ecd5ee-7c1b-4212-8f4f-ba8b31ab2dc6" />
<img width="1410" height="935" alt="Screenshot from 2026-10-30 15-39-05" src="https://github.com/user-attachments/assets/23e000db-10ab-47e4-a76c-8645bbfb227a" />
<img width="1408" height="932" alt="Screenshot from 2026-10-30 15-41-10" src="https://github.com/user-attachments/assets/0f660693-ee0f-4f05-be76-048e039947f1" />
<img width="1408" height="930" alt="Screenshot from 2026-10-30 15-41-29" src="https://github.com/user-attachments/assets/c9a8826c-6b06-4c31-899e-b2d838ae0f42" />
<img width="1405" height="935" alt="Screenshot from 2026-10-30 15-41-55" src="https://github.com/user-attachments/assets/6db4c0c1-8474-446c-8662-718b10c660f0" />
<img width="1412" height="933" alt="Screenshot from 2026-10-30 15-42-07" src="https://github.com/user-attachments/assets/565cafa0-68c9-47a7-830a-a179dcbe6b87" />

### Mobile View
<img width="361" height="747" alt="Screenshot from 2026-10-30 15-19-20" src="https://github.com/user-attachments/assets/0219f881-f456-4efe-b5d4-08e05ff1fcf5" />
<img width="361" height="744" alt="Screenshot from 2026-10-30 15-37-59" src="https://github.com/user-attachments/assets/5a47166e-35d6-4f90-b365-5313a14f0229" />
<img width="360" height="743" alt="Screenshot from 2026-10-30 15-39-25" src="https://github.com/user-attachments/assets/325c4eb4-9e23-4e81-b6cd-672cf62f41bd" />
<img width="363" height="741" alt="Screenshot from 2026-10-30 15-39-40" src="https://github.com/user-attachments/assets/e85755c0-fc1c-4064-955f-114aca5200c1" />
<img width="361" height="740" alt="Screenshot from 2026-10-30 15-40-29" src="https://github.com/user-attachments/assets/8c12fef1-a372-45ad-90db-bcd0e50002f3" />
<img width="363" height="744" alt="Screenshot from 2026-10-30 15-43-00" src="https://github.com/user-attachments/assets/c9e44a3f-bb60-4e74-bf2e-afeddae8d3b3" />
<img width="363" height="745" alt="Screenshot from 2026-10-30 15-43-12" src="https://github.com/user-attachments/assets/17f97066-2569-4855-b593-4fc61814d755" />
<img width="362" height="743" alt="Screenshot from 2026-10-30 15-43-24" src="https://github.com/user-attachments/assets/6bdd3ebf-aa42-45ff-9a94-cb3ada0f8779" />
<img width="362" height="739" alt="Screenshot from 2026-10-30 15-43-38" src="https://github.com/user-attachments/assets/220e8ef4-9122-45b9-a320-687f854ef2d5" />
<img width="360" height="737" alt="Screenshot from 2026-10-30 15-55-04" src="https://github.com/user-attachments/assets/30368820-8126-4d39-9894-16faef3f3074" />


