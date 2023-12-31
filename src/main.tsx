import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error';
import Contact from './routes/contact';
import EditContact from './routes/edit';
import { contactLoader, rootLoader } from './route-helpers/loaders';
import {
  createAction,
  editAction,
  deleteAction,
} from './route-helpers/actions';

import './index.css';
import Index from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: createAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        loader: contactLoader,
        path: '/contacts/:contactId',
        element: <Contact />,
      },
      {
        action: editAction,
        loader: contactLoader,
        path: '/contacts/:contactId/edit',
        element: <EditContact />,
      },
      {
        action: deleteAction,
        path: '/contacts/:contactId/destroy',
        errorElement: <div>There was a problem deleting this record.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
