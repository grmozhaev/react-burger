import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../../services/protected-route';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Location } from 'history';
import {
  HomePage,
  FeedPage,
  OrderStatusPage,
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  OrderHistoryPage,
  IngredientPage,
  NotFoundPage,
} from '../../pages';
import { OrderStatusModal } from '../order-status-modal/order-status-modal';

import './app.css';

interface State {
  from?: Location;
}

const App = () => {
  const location: Location<State> = useLocation();
  const from = location?.state && location?.state?.from;

  return (
    <div className="app">
      <header className="app-header">
        <AppHeader />
      </header>
      <Switch location={from || location}>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <OrderStatusPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <SignupPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <OrderHistoryPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderStatusPage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {from?.pathname === '/feed' && (
        <Route path="/feed/:id">
          <OrderStatusModal />
        </Route>
      )}

      {from?.pathname === '/' && (
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
      )}

      {from?.pathname === '/profile/orders' && (
        <Route path="/profile/orders/:id">
          <OrderStatusModal />
        </Route>
      )}
    </div>
  );
};

export default App;
