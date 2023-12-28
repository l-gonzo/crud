import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { NewPeople } from './new_people';
import { ErrorPage } from './error_page';
import { UpdatePeople } from './update_people';



function AppWithRouter()
{
  const [noPeople, setNoPeople] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />
    },
    {
      path: "/new-people",
      element: <NewPeople />,
    },
    {
      path: `/update-people/:id`,
      element: <UpdatePeople />,
    }
  ]);

  return <RouterProvider router={router} />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>
);
