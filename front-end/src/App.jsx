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
import { RolProvider } from "./context/rolContext";
import { RecursoProvider } from "./context/recursoContext";
import { ActividadProvider } from "./context/actividadContext";

// vistas
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { MinisterioPage } from "./pages/Ministerio/MinisterioPage";
import { SolicitudPage } from "./pages/Solicitud/SolicitudPage";
import { ReservasPage } from "./pages/Reserva/ReservasPage";
import { RolPage } from "./pages/Rol/RolPage";
import { RecursoPage } from "./pages/Recurso/RecursoPage";
import { AsociarRolesPage } from "./pages/Rol/AsociarRolesPage";
import { AsociarRespAMinisterioPage } from "./pages/Ministerio/AsociarRespAMinisterioPage";
import { ActividadPage } from "./pages/Actividad/ActividadPage";
import { AsociarActMinisterioPage } from "./pages/Actividad/AsociarActMinisterioPage";

import { UsuarioPage } from "./pages/Usuario/UsuarioPage";


function App() {
  return (
    // <AuthProvider>
    <ActividadProvider>
      <RecursoProvider>
        <MinisterioProvider>
          <RolProvider>
            <UsuarioProvider>
              <BrowserRouter>
                <CssBaseline />

                <main className="">
                  <MaterialAppBar />

                  <Container fixed>
                    <Routes>
                      <Route path="/" element={<WelcomePage />} />
                      {/* <Route path="/login" element={<LoginPage />} /> */}
                      {/* <Route path="/register" element={<RegisterPage />} /> */}

                      <Route element={<ProtectedRoute />}>

                        <Route path="/home" element={<HomePage />} />
                        <Route path="/ministerio" element={<MinisterioPage />} />
                        <Route path="/solicitudes-reservas" element={<SolicitudPage />} />
                        <Route path="/reservas" element={<ReservasPage />} />
                        <Route path="/rol" element={<RolPage />} />
                        <Route path="/asociar-roles" element={<AsociarRolesPage />} />
                        <Route path="/recurso" element={<RecursoPage />} />
                        <Route path="/asociar-responsables" element={<AsociarRespAMinisterioPage />} />
                        <Route path="/actividad" element={<ActividadPage />} />
                        <Route path="/asociar-actividades" element={<AsociarActMinisterioPage />} />
                        <Route path="/usuarios" element={<UsuarioPage />} />
                        {/* <Route path="/add-task" element={<TaskFormPage />} />
                      <Route path="/tasks/:id" element={<TaskFormPage />} />
                      <Route path="/profile" element={<h1>Profile</h1>} /> */}

                      </Route>
                    </Routes>
                  </Container>

                </main>
              </BrowserRouter>
            </UsuarioProvider>
          </RolProvider>
        </MinisterioProvider>
      </RecursoProvider>
    </ActividadProvider>
    // </AuthProvider>
  );
}

export default App;
