import { NavLink } from 'react-router-dom';

import './profile-sidebar.css';

const ProfileSidebar = () => {
  return (
    <div className="profile-sidebar-container">
      <NavLink
        to="/profile"
        activeClassName="profile-active-tab"
        className="text_color_inactive profile-link"
        exact={true}
      >
        <p className="text text_type_main-medium">Профиль</p>
      </NavLink>
      <NavLink
        to="/profile/orders"
        activeClassName="profile-active-tab"
        className="text_color_inactive profile-link mt-4"
        exact={true}
      >
        <p className="text text_type_main-medium">История заказов</p>
      </NavLink>
      <NavLink
        to="/logout"
        activeClassName="profile-active-tab"
        className="text_color_inactive profile-link mt-4"
        exact={true}
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
