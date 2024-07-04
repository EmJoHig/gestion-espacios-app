import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (usuario) => {
    try {
      // const res = await registerRequest(usuario);
      // if (res.status === 200) {
      //   setUsuario(res.data);
      //   setIsAuthenticated(true);
      // }
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (usuario) => {

    // usuario
    // resp-minist
    // admin-minist-resp
    // admin-espacio-reserv
    // admin-pro
    try {
      // const res = await loginRequest(usuario);
      let rolUsuario = "";

      if (usuario.email === "usuario@hotmail.com") {
        rolUsuario = "usuario";
      } else if (usuario.email === "admin-minist-resp@hotmail.com") {
        rolUsuario = "admin-minist-resp";
      } else if (usuario.email === "admin-espacio-reserv@hotmail.com") {
        rolUsuario = "admin-espacio-reserv";
      } else if (usuario.email === "admin@hotmail.com") {
        rolUsuario = "admin-pro";
      } else if (usuario.email === "resp-minist@hotmail.com") {
        rolUsuario = "resp-minist";
      }

      
      //USUARIO DESEADO
      const _usuario = {
        username: "Belthier",
        email: usuario.email,
        password: usuario.password,
        role: "admin-espacio-reserv",
        modulos: [
          {
            codigo: "3",
            descripcion: "ABM Espacios",
            ruta: "/espacio"
          },
          {
            codigo: "4",
            descripcion: "Solicitudes de Reservas",
            ruta: "/solicitudes-reservas"
          },
        ]
      };

      // setUsuario(res.data);
      setUsuario(_usuario);
      // console.log("data");
      // console.log(data);
      console.log('_usuario');
      console.log(_usuario);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUsuario(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUsuario(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
