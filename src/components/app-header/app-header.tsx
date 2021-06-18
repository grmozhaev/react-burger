import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { NavLink } from 'react-router-dom';

import './app-header.css';

const makeNavLink = (
  Icon: ({ type }: TIconProps) => JSX.Element,
  text: string
) => {
  return () => (
    <div className="p-1 navlink-container">
      <Icon type="primary" />
      <p className="text text_type_main-default ml-1">{text}</p>
    </div>
  );
};

const Constructor = makeNavLink(BurgerIcon, 'Конструктор');
const Feed = makeNavLink(ListIcon, 'Лента заказов');
const Profile = makeNavLink(ProfileIcon, 'Личный кабинет');

const AppHeader = () => {
  return (
    <div className="header">
      <nav className="container">
        <NavLink
          to="/"
          className="navlink text_color_inactive"
          activeClassName="navlink-active"
          exact={true}
        >
          <Constructor />
        </NavLink>
        <NavLink
          to="/feed"
          className="navlink text_color_inactive"
          activeClassName="navlink-active"
        >
          <Feed />
        </NavLink>
      </nav>
      <Logo />
      <div className="container container-right">
        <NavLink
          to="/profile"
          className="navlink text_color_inactive"
          activeClassName="navlink-active"
        >
          <Profile />
        </NavLink>
      </div>
    </div>
  );
};

export default AppHeader;
