import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCliente, {
  action as actionClienteNuevo,
} from "./pages/NuevoCliente";
import Index, { loader as clientesLoader } from "./pages/Index";
import ErrorPage from "./components/ErrorPage";
import EditarCliente, {
  loader as editarClienteLoader,
  action as editarClienteAction,
} from "./pages/EditarCliente";
import { action as eliminarClienteAction } from "./components/Cliente";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: actionClienteNuevo,
      },
      {
        path: "/clientes/:clienteID/editar",
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
      },
      {
        path: "/clientes/:clienteID/eliminar",
        action: eliminarClienteAction,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
