import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { signout } from '../../services/actions/auth';

import './profile-sidebar.css';

const ProfileSidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignout = useCallback(() => {
    try {
      dispatch(signout());
      history.replace('/login');
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, history]);

  return (
    <div className="profile-sidebar-container">
      <NavLink
        to="/profile"
        activeClassName="profile-active-tab"
        className="text_color_inactive profile-link"
        exact
      >
        <p className="text text_type_main-medium">Профиль</p>
      </NavLink>
      <NavLink
        to="/profile/orders"
        activeClassName="profile-active-tab"
        className="text_color_inactive profile-link mt-4"
        exact
      >
        <p className="text text_type_main-medium">История заказов</p>
      </NavLink>
      <NavLink
        to="/login"
        activeClassName="profile-active-tab"
        className="text_color_inactive profile-link mt-4"
        exact
        onClick={handleSignout}
      >
        <p className="text text_type_main-medium">Выйти</p>
      </NavLink>
      <p className="text text_type_main-default text_color_inactive profile-explainer mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileSidebar;
