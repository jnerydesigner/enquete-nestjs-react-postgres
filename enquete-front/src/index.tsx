import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import { GlobalStyle } from './styles/globalStyles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Enquete } from './pages/enquete';
import { CriarEnquete } from './pages/criar-enquete';
import { EditEnquete } from './pages/edit-enquete';
import { EditQuestion } from './pages/edit-question';
import { EditEnqueteUnique } from './pages/edit-enquete-unique';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/enquete/:idQuestion',
    element: <Enquete />,
  },
  {
    path: '/criar-enquete',
    element: <CriarEnquete />,
  },
  {
    path: '/edit-enquete/:idQuestion',
    element: <EditEnquete />,
  },
  {
    path: '/edit-enquete-unique/:idAnswer/:idQuestion',
    element: <EditEnqueteUnique />,
  },
  {
    path: '/edit-question/:idQuestion',
    element: <EditQuestion />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
