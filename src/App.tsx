import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthGuard from "./authGuard/AuthGuard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
}

export default App;
