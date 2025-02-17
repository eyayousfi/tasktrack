import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home.js";
import About from "./pages/about";

import Javascript from "./pages/javascript";
import { useContext } from "react";
import ThemeContext from "./pages/ThemeContext";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup";
import Profil from "./pages/profile"
import Error404 from "./pages/error404"
import EditTask from "./pages/editTask/editTask.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404/>,
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/editTask/:stringId",
    element: <EditTask />,
  },
  {
    path: "/javascript",
    element: <Javascript />,
  },


  {
    path: "/signin",
    element: <Signin/>,
  },


  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/profil",
    element: <Profil/>,
  },
]);

function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
