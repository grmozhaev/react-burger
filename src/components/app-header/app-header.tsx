import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./app-header.css";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

const makeNavLink = (
  Icon: ({ type }: TIconProps) => JSX.Element,
  text: string
) => {
  return () => (
    <div className="p-1 navlink-container">
      <Icon type="primary" />
      <a href="/" className="text text_type_main-default ml-1 navlink">
        {text}
      </a>
    </div>
  );
};

const ConstructorLink = makeNavLink(BurgerIcon, "Конструктор");
const ListLink = makeNavLink(ListIcon, "Лента заказов");
const ProfileLink = makeNavLink(ProfileIcon, "Личный кабинет");

const AppHeader = () => {
  return (
    <div className="header">
      <nav className="container">
        <ConstructorLink />
        <ListLink />
      </nav>
      <Logo />
      <div className="container container-right">
        <ProfileLink />
      </div>
    </div>
  );
};

export default AppHeader;
