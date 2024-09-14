import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Error from "./layout/Error";
import {routes} from "./routes/routes";

function App() {
    const router = createBrowserRouter([
        {
            element: <AppLayout/>,
            errorElement: <Error/>,
            children: routes
        }
    ])
    return <RouterProvider router={router}/>;
}

export default App;
