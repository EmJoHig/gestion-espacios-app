import { Link } from "react-router-dom";
import { useEffect, Fragment} from "react";
import { useMinisterio } from "../context/ministerioContext";
import Button from '@mui/material/Button';
import MaterialAppBar from "../components/MaterialAppBar";
import MaterialTable from "../components/MaterialTable";

function WelcomePage() {

  const { ministerios, getMinisterios } = useMinisterio();

  useEffect(() => {
    getMinisterios();
  }, []);


  


  return (
  // <section className="flex justify-center items-center">
  //   <header className="bg-zinc-800 p-10">
     
  //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
  //       {ministerios.map((ministerio) => (
  //         <div className="bg-zinc-500 text-white p-4 rounded-md">
  //           <h1>{ministerio.descripcion}</h1>
  //           <p>{ministerio.codigo}</p>
  //         </div>
  //       ))}

  //     </div>
  //   </header>
  // </section>

  <>
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">PAGINA DE INICIO</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
      </main>
    </div>
  </>
  );
}

export default WelcomePage;
