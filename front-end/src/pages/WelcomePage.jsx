import { Link, useNavigate } from "react-router-dom";
import { useEffect, Fragment } from "react";
import { useMinisterio } from "../context/ministerioContext";
import { useUsuario } from "../context/usuarioContext";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MaterialAppBar from "../components/MaterialAppBar";
import MaterialTable from "../components/MaterialTable";
import Container from '@mui/material/Container';
//auth0
import { useAuth0 } from "@auth0/auth0-react";

import imgwelcome from '../assets/imgwelcome.jpeg';
import logo from '../assets/logoreservap.png';


function WelcomePage() {

  const { ministerios, getMinisterios } = useMinisterio();
  const { getUsuarioAuth0 } = useUsuario();

  const navigate = useNavigate();

  //auth0
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      //console.log("USUARIO DATOS AUTH0");
      //console.log(user);
      getUsuarioAuth0(user);
      navigate("/home");
    }
  }, [isAuthenticated]);


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoading) {
    return (
      <>
        <Container fixed>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Box textAlign="center">
              <CircularProgress size={80} thickness={4} />
              <Box mt={2}>
                <h2 style={{ fontFamily: "Arial, sans-serif", color: "#1976d2" }}>
                  Cargando, por favor espera...
                </h2>
              </Box>
            </Box>
          </Box>
        </Container>
      </>

    );
  }

  return (
    <>
      {/* <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">PAGINA DE INICIO</h1>
          </div>
        </header>
        <main>
          {JSON.stringify(user)}
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
        </main>
      </div> */}
      <Box
        sx={{
          height: "100vh", // Asegura que el contenedor ocupe toda la altura de la ventana
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${imgwelcome}) no-repeat center center/cover`, // Usar la imagen de fondo y cubrir todo el contenedor
          backgroundPosition: "center", // Centra la imagen
          backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
          padding: 3,
          color: "#fff",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: 4,
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
            width: "100%",
            background: "rgb(255, 255, 255)", // Fondo translúcido para mejorar la visibilidad del texto
            color: "#1976d2",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              marginBottom: "1.5rem",
              borderRadius: "50%",
              border: "5px solid #1976d2",
              padding: "5px",
            }}
          />
          <h1
            style={{
              fontSize: "2.8rem",
              marginBottom: "1rem",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
            }}
          >
            ¡Bienvenido!
          </h1>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1.5rem",
              lineHeight: "1.5",
              color: "#555",
            }}
          >
            Accede a todas las funcionalidades de nuestra plataforma con tu cuenta.
            Por favor, inicia sesión para continuar.
          </p>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
            }}
            onClick={loginWithRedirect}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>

    </>
  );
}

export default WelcomePage;
