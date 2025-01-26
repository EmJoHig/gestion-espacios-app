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
import { ReservaProvider } from "./context/reservaContext";
import { EspacioProvider } from "./context/espacioContext";
import { ActividadProvider } from "./context/actividadContext";
import { SolicitudProvider } from "./context/solicitudContext";

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
import { EspacioPage } from "./pages/Espacio/EspacioPage";
import { PerfilUsuarioPage } from "./pages/Usuario/PerfilUsuarioPage";


function App() {
  return (
    // <AuthProvider>
    <SolicitudProvider>
      <RecursoProvider>
        <MinisterioProvider>
          <RolProvider>
            <UsuarioProvider>
              <ReservaProvider>
                <EspacioProvider>
                  <ActividadProvider>
                    <BrowserRouter>
                      <CssBaseline />

                      <main className="">
                        <MaterialAppBar />

                        {/* <Container fixed> */}
                          <Routes>
                            <Route path="/" element={<WelcomePage />} />

                            <Route element={<ProtectedRoute />}>

                              <Route path="/home" element={<HomePage />} />
                              <Route path="/ministerio" element={<MinisterioPage />} />
                              <Route path="/solicitudes-reservas" element={<SolicitudPage />} />
                              <Route path="/reservas" element={<ReservasPage />} />
                              <Route path="/espacio" element={<EspacioPage />} />
                              <Route path="/rol" element={<RolPage />} />
                              <Route path="/asociar-roles" element={<AsociarRolesPage />} />
                              <Route path="/recurso" element={<RecursoPage />} />
                              <Route path="/asociar-responsables" element={<AsociarRespAMinisterioPage />} />
                              <Route path="/actividad" element={<ActividadPage />} />
                              <Route path="/asociar-actividades" element={<AsociarActMinisterioPage />} />
                              <Route path="/usuarios" element={<UsuarioPage />} />
                              <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} />

                            </Route>
                          </Routes>
                        {/* </Container> */}

                      </main>
                    </BrowserRouter>
                  </ActividadProvider>
                </EspacioProvider>
              </ReservaProvider>
            </UsuarioProvider>
          </RolProvider>
        </MinisterioProvider>
      </RecursoProvider>
    </SolicitudProvider>
    // </AuthProvider>
  );
}

export default App;
