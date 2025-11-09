import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import DashboardPage from "./Pages/HospitalDashboard";
import SurgeriesPage from "./Pages/SurgeryPage";
import NewEntry from "./Pages/NewEntry";
import SurgeryDetailsPage from "./Pages/SurgeryDetailsPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Main Page Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/surgeries" element={<SurgeriesPage />} />
            <Route path="/surgery/:id" element={<SurgeryDetailsPage />} />
            <Route path="/newentry" element={<NewEntry />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
