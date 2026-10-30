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
