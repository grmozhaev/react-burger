import { useCallback, useState, useMemo } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import OrderDetails from "../order-details/order-details";
import { IngredientProps } from "../ingredient/ingredient";
import "./burger-constructor.css";
import { ModalType } from "../modal/modal";
import OrderItems from "../order-items/order-items";

interface BurgerConstructorProps {
  ingredients: IngredientProps[];
}

const BurgerConstructor = (props: BurgerConstructorProps) => {
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const openOrderModal = useCallback(() => {
    setModalType(ModalType.ORDER);
  }, [setModalType]);

  const closeModal = useCallback(() => {
    setModalType(null);
  }, [setModalType]);

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
      <OrderItems items={props.ingredients} />
      <div className="checkout">
        <Price price={total} classes="mr-3" />
        <div onClick={openOrderModal}>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalType === ModalType.ORDER && <OrderDetails onClose={closeModal} />}
    </section>
  );
};

export default BurgerConstructor;
