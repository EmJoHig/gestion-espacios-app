import { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getActividadesRequest,
  // getActividadRequest,
  createActividadRequest,
  updateActividadRequest,
  deleteActividadRequest,
  asociarActividadAMinistRequest,
  GetActividadesSinMinisterioRequest,
  quitarActividadAMinisterioRequest
} from "../api/actividad";

const ActividadContext = createContext();

export const useActividad = () => {
  const context = useContext(ActividadContext);
  if (!context) throw new Error("useActividades must be used within a ActividadProvider");
  return context;
};

export function ActividadProvider({ children }) {
  const [actividades, setActividades] = useState([]);
  const { getAccessTokenSilently } = useAuth0();


  const getActividades = async () => {
    // const res = await getActividadesRequest();
    // setActividades(res.data);
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await getActividadesRequest(token);
      setActividades(res.data);
    } catch (error) {
      console.error('Error fetching actividades:', error);
    }
  };

  //   const getActividad = async (id) => {
  //     try {
  //       const res = await getActividadRequest(id);
  //       return res.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const createActividad = async (actividad) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await createActividadRequest(token, actividad);

      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar la actividad";
      }

    } catch (error) {
      console.log(error);
    }
  };



  const updateActividad = async (actividad) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const resp = await updateActividadRequest(token, actividad);

      if (resp.status === 200) {
        return "";
      } else {
        return "hubo un error al editar la actividad";
      }

    } catch (error) {
      console.error(error);
    }
  };


  const deleteActividad = async (id) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await deleteActividadRequest(token, id);
      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar la actividad";
      }

    } catch (error) {
      console.log(error);
    }
  };



  const asociarActividadAMinisterio = async (actsMinisterioBody) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await asociarActividadAMinistRequest(token, actsMinisterioBody);

      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar la actividad";
      }

    } catch (error) {
      console.log(error);
    }
  };


  const getActividadesSinMinisterio = async () => {
    try {
    
          const token = await getAccessTokenSilently({
            audience: 'https://gestion-espacios/api', // USAR ESTE
            // audience: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/oauth/token',
          });
    
          const res = await GetActividadesSinMinisterioRequest(token);
                    
          if (res.status == 200) {
            return res;
          } else {
            return null;
          }
    
        } catch (error) {
          console.log(error);
        }
  };


  const quitarActividadAMinisterio = async (actMinisterioBody) => {
    try {

      const token = await getAccessTokenSilently({
        audience: 'https://gestion-espacios/api',
      });

      const res = await quitarActividadAMinisterioRequest(token, actMinisterioBody);

      if (res.status === 200) {
        return "";
      } else {
        return "hubo un error al eliminar la actividad";
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <ActividadContext.Provider
      value={{
        actividades,
        getActividades,
        // getActividad,
        createActividad,
        updateActividad,
        deleteActividad,
        asociarActividadAMinisterio,
        getActividadesSinMinisterio,
        quitarActividadAMinisterio
      }}
    >
      {children}
    </ActividadContext.Provider>
  );
}
