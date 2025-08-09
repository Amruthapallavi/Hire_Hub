import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { Home } from "./pages/user/Home";
import { ToastProvider } from "./components/toast/ToastContext";
import { Login } from "./pages/user/Login";
import { Signup } from "./pages/user/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { Jobs } from "./pages/user/Jobs";
import { AddJob } from "./pages/user/AddJob";
import { EditJobPage } from "./pages/user/Edit-Job";

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={<PrivateRoute><Outlet /></PrivateRoute>}
          >
            <Route path="home" element={<Home />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/add" element={<AddJob />} />
            <Route path="jobs/edit/:id" element={<EditJobPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
