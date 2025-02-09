import { BrowserRouter, Routes, Route } from "react-router-dom";

//estilos
import MaterialAppBar from "./components/MaterialAppBar";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// context
import { ProtectedRoute } from "./routes";
import { MinisterioProvider } from "./context/ministerioContext";
import { UsuarioProvider } from "./context/usuarioContext";
import { RolProvider } from "./context/rolContext";
import { RecursoProvider } from "./context/recursoContext";
import { ReservaProvider } from "./context/reservaContext";
import { EspacioProvider } from "./context/espacioContext";
import { ActividadProvider } from "./context/actividadContext";
import { SolicitudProvider } from "./context/solicitudContext";
import { DetalleRecursoProvider } from "./context/detalleRecurso";

// vistas
import WelcomePage from "./pages/WelcomePage";
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
    <SolicitudProvider>
      <DetalleRecursoProvider>
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

                          {/* <Route element={<ProtectedRoute />}> */}

                          {/* <Route path="/home" element={<HomePage />} allowedRoles={["ADMIN", "CONSULTA", "RESPONSABLE"]} />
                              <Route path="/ministerio" element={<MinisterioPage />} allowedRoles={["ADMIN", "RESPONSABLE"]}/>
                              <Route path="/solicitudes-reservas" element={<SolicitudPage />} allowedRoles={["ADMIN", "RESPONSABLE"]} />
                              <Route path="/reservas" element={<ReservasPage />} allowedRoles={["ADMIN", "CONSULTA", "RESPONSABLE"]} />
                              <Route path="/espacio" element={<EspacioPage />} allowedRoles={["ADMIN"]} />
                              <Route path="/rol" element={<RolPage />} allowedRoles={["ADMIN"]} />
                              <Route path="/asociar-roles" element={<AsociarRolesPage />} allowedRoles={["ADMIN"]} />
                              <Route path="/recurso" element={<RecursoPage allowedRoles={["ADMIN"]}/>} />
                              <Route path="/asociar-responsables" element={<AsociarRespAMinisterioPage />} allowedRoles={["ADMIN"]} />
                              <Route path="/actividad" element={<ActividadPage allowedRoles={["ADMIN"]}/>} />
                              <Route path="/asociar-actividades" element={<AsociarActMinisterioPage />} allowedRoles={["ADMIN"]} />
                              <Route path="/usuarios" element={<UsuarioPage />} allowedRoles={["ADMIN"]} />
                              <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} allowedRoles={["ADMIN", "CONSULTA", "RESPONSABLE"]} /> */}

                          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "RESPONSABLE"]} />}>
                            <Route path="/solicitudes-reservas" element={<SolicitudPage />} />
                            {/* <Route path="/reservas" element={<ReservasPage />} /> */}
                          </Route>

                          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                            <Route path="/ministerio" element={<MinisterioPage />} />
                            <Route path="/rol" element={<RolPage />} />
                            <Route path="/asociar-roles" element={<AsociarRolesPage />} />
                            <Route path="/recurso" element={<RecursoPage />} />
                            <Route path="/asociar-responsables" element={<AsociarRespAMinisterioPage />} />
                            <Route path="/actividad" element={<ActividadPage />} />
                            <Route path="/asociar-actividades" element={<AsociarActMinisterioPage />} />
                            <Route path="/usuarios" element={<UsuarioPage />} />
                            <Route path="/espacio" element={<EspacioPage />} />
                            <Route path="/reservas" element={<ReservasPage />} /> 
                          </Route>

                          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "CONSULTA", "RESPONSABLE"]} />}>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} />
                          </Route>

                          {/* </Route> */}
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
      </DetalleRecursoProvider>
    </SolicitudProvider>
  );
}

export default App;
