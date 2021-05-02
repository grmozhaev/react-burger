import React, { FC } from "react";
import "./burger-constructor.css";
import { data } from "../../utils/data";
import {
  CloseIcon,
  LockIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import { IngredientProps } from "../ingredient/ingredient";

interface OrderItemProps {
  image: string;
  name: string;
  price: number;
  styles?: string;
  isLocked?: boolean;
}

interface OrderItemsProps {
  items: OrderItemProps[];
}

const OrderItems: FC<OrderItemsProps> = ({ items }) => {
  const lastItem = items[items.length - 1];

  return (
    <div>
      <OrderItem
        styles="item-first"
        key={0}
        isLocked={true}
        image={items[0].image}
        name={items[0].name}
        price={items[0].price}
      />

      <ul className="order-scrollable">
        {items.slice(1, items.length - 2).map((item, index) => (
          <li key={index} className="list-item">
            <OrderItem image={item.image} name={item.name} price={item.price} />
          </li>
        ))}
      </ul>
      <OrderItem
        styles="item-last"
        key={items.length - 1}
        isLocked={true}
        image={lastItem.image}
        name={lastItem.name}
        price={lastItem.price}
      />
    </div>
  );
};

const OrderItem: FC<OrderItemProps> = (props) => {
  const { image, name, price, styles, isLocked } = props;

  return (
    <div className={`item ${styles} mb-2`}>
      <img src={image} className="item-image" alt="ingredient" />
      <p className="item-name">{name}</p>
      <Price price={price} styles="mr-3" />
      <div className="mr-3">
        {isLocked ? (
          <LockIcon type="secondary" />
        ) : (
          <CloseIcon type="primary" />
        )}
      </div>
    </div>
  );
};

class BurgerConstructor extends React.Component {
  handleTabClick = (activeTab: string) => {
    this.setState({ activeTab });
  };

  getTotal = (ingredients: IngredientProps[]) => {
    return ingredients.reduce((total: number, ingredient: IngredientProps) => {
      return total + ingredient.price;
    }, 0);
  };

  render() {
    return (
      <section className="constructor">
        <OrderItems items={data} />
        <div className="checkout">
          <Price price={this.getTotal(data)} styles="mr-3" />
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;
