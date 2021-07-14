import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../services/reducers';

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const location = useLocation();
  const { isUserLoaded } = useSelector((state: AppState) => state.auth);

  if (isUserLoaded) {
    return <Route {...props} />;
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};
