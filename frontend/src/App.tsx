import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { Home } from "./pages/user/Home";
import { ToastProvider } from "./components/ToastContext";
import { Login } from "./pages/user/Login";
import { Signup } from "./pages/user/Signup";

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Signup/>}/>

        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
