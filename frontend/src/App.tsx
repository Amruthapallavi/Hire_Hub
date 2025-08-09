import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { Home } from "./pages/user/Home";
import { ToastProvider } from "./components/ToastContext";
import { Login } from "./pages/user/Login";
import { Signup } from "./pages/user/Signup";
import PrivateRoute from "./components/PrivateRoute";
import { Jobs } from "./pages/user/Jobs";
import { AddJob } from "./pages/user/AddJob";

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={ <PrivateRoute>
             <Home />
             </PrivateRoute>} />
             <Route path="/jobs" element={ <PrivateRoute>
             <Jobs />
             </PrivateRoute>} />
              <Route path="/jobs/add" element={ <PrivateRoute>
             <AddJob />
             </PrivateRoute>} />
          <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>

        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
