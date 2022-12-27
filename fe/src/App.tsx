import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import routes from './routes';

const UsersListView = lazy(() => import('./pages/UsersList/UsersListView'));
const UserDetailsView = lazy(
  () => import('./pages/UserDetails/UserDetailsView'),
);

function App() {
  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route path={routes.index} element={<UsersListView />} />
        <Route path={routes.userDetails} element={<UserDetailsView />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </Suspense>
  );
}

export default App;
