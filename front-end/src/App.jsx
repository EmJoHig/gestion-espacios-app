import { BrowserRouter, Routes, Route } from "react-router-dom";

//estilos
import MaterialAppBar from "./components/MaterialAppBar";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// context
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import { MinisterioProvider } from "./context/ministerioContext";
import { UsuarioProvider } from "./context/usuarioContext";

// vistas
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { MinisterioPage } from "./pages/Ministerio/MinisterioPage";
import { SolicitudPage } from "./pages/Solicitud/SolicitudPage";


function App() {
  return (
    <AuthProvider>
      <MinisterioProvider>
          <UsuarioProvider>
            <BrowserRouter>
              <CssBaseline />

              <main className="">
                <MaterialAppBar />

                <Container fixed>
                  <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/ministerio" element={<MinisterioPage />} />
                    <Route path="/solicitudes-reservas" element={<SolicitudPage />} />
                      {/* <Route path="/add-task" element={<TaskFormPage />} />
                    <Route path="/tasks/:id" element={<TaskFormPage />} />
                    <Route path="/profile" element={<h1>Profile</h1>} /> */}
                    </Route>
                  </Routes>
                </Container>
              </main>
            </BrowserRouter>
          </UsuarioProvider>
      </MinisterioProvider>
    </AuthProvider>
  );
}

export default App;
