import Formulario from "../components/Formulario";
import Error from "../components/Error";
import {
  useNavigate,
  Form,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/Clientes";
export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteID);
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Cliente No Encontrado!",
    });
  }
  console.log(cliente);
  return cliente;
}
export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");
  //validación
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("todos los campos son obligatorios");
  }
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("Email no valido");
  }

  //retornar si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }
  // actualizar cliente
  await actualizarCliente(params.clienteID, datos);
  return redirect("/");
}
const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuación podrás modificar los datos de un Cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className=" bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post">
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 rounded-md w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Editar Cliente"
          ></input>
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
