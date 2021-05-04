import { useCallback, useState, useMemo } from "react";
import {
  CloseIcon,
  LockIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientProps } from "../ingredient/ingredient";
import "./burger-constructor.css";
import "../modal/modal.css";

interface OrderItemProps {
  image: string;
  name: string;
  price: number;
  classes?: string;
  isLocked?: boolean;
  onClick: (name: string) => void;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
}

interface OrderItemsProps {
  items: OrderItemProps[];
  onClick: (name: string) => void;
}

interface BurgerConstructorProps {
  ingredients: IngredientProps[];
}

enum ModalType {
  PICKED_INGREDIENT,
  ORDER,
}

const OrderItems = ({ items, onClick }: OrderItemsProps) => {
  const { upper, middle, bottom } = useMemo(() => {
    return {
      upper: items[0],
      middle: items.slice(1, items.length - 2),
      bottom: items[items.length - 1],
    };
  }, [items]);
  return (
    <div>
      <OrderItem
        classes="item-first"
        isLocked={true}
        image={upper.image}
        name={upper.name}
        price={upper.price}
        onClick={onClick}
      />

      <ul className="order-scrollable mt-2 mb-2">
        {middle.map((item, index) => (
          <li key={index} className="list-item">
            <OrderItem
              image={item.image}
              name={item.name}
              price={item.price}
              onClick={onClick}
            />
          </li>
        ))}
      </ul>

      <OrderItem
        classes="item-last"
        isLocked={true}
        image={bottom.image}
        name={bottom.name}
        price={bottom.price}
        onClick={onClick}
      />
    </div>
  );
};

const OrderItem = (props: OrderItemProps) => {
  const { image, name, price, classes, isLocked, onClick } = props;
  const classNames = classes ? `mb-2 item ${classes}` : "mb-2 item";

  const handleClick = useCallback(() => {
    onClick(name);
  }, [name, onClick]);

  return (
    <div className={classNames} onClick={handleClick}>
      <img src={image} className="item-image" alt="ingredient" />
      <p className="item-name">{name}</p>
      <Price price={price} classes="mr-3" />
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

const BurgerConstructor = (props: BurgerConstructorProps) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  let [ingredientName, setIngredientName] = useState<string>("");

  const openIngredientModal = useCallback(
    (name) => {
      setModalType(ModalType.PICKED_INGREDIENT);
      setIngredientName(name);
    },
    [setModalType, setIngredientName]
  );

  const openOrderModal = useCallback(() => {
    setModalType(ModalType.ORDER);
  }, [setModalType]);

  const closeModal = useCallback(() => {
    setModalType(null);
    setIngredientName("");
  }, [setModalType, setIngredientName]);

  const total = useMemo(() => {
    return props.ingredients.reduce(
      (total: number, ingredient: IngredientProps) => {
        return total + ingredient.price;
      },
      0
    );
  }, [props.ingredients]);

  return (
    <section className="constructor">
      <OrderItems items={props.ingredients} onClick={openIngredientModal} />
      <div className="checkout">
        <Price price={total} classes="mr-3" />
        <div onClick={openOrderModal}>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalType === ModalType.PICKED_INGREDIENT && (
        <IngredientDetails
          ingredients={props.ingredients}
          ingredientName={ingredientName}
          onClose={closeModal}
        />
      )}
      {modalType === ModalType.ORDER && <OrderDetails onClose={closeModal} />}
    </section>
  );
};

export default BurgerConstructor;
