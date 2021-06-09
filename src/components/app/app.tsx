import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
  NotFoundPage,
} from '../../pages';

import './app.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <AppHeader />
        </header>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/feed" exact={true}>
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
          <Route path="/profile" exact={true}>
            <ProfilePage />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <OrderHistoryPage />
          </Route>
          <Route path="/profile/orders/:id">
            <OrderStatusPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
