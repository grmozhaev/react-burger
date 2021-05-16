import { useCallback, useState, useMemo, useContext } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import OrderDetails from "../order-details/order-details";
import OrderItems from "../order-items/order-items";
import { IngredientDTO } from "../ingredient/ingredient";
import { ModalType } from "../modal/modal";
import { IngredientContext } from "../../services/ingredientContext";
import "./burger-constructor.css";

const BurgerConstructor = () => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { ingredients } = useContext(IngredientContext);
  const [orderNumber, setOrderNumber] = useState(0);

  const openOrderModal = useCallback(() => {
    const fetchData = async () => {
      const url = "https://norma.nomoreparties.space/api/orders";
      const ingredientIds = ingredients.map((item) => item._id);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ingredients: ingredientIds }),
        });
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const result = await response.json();
        setOrderNumber(result.order.number);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData().then(() => setModalType(ModalType.ORDER));
  }, [ingredients, setModalType]);

  const closeModal = useCallback(() => {
    setModalType(null);
  }, [setModalType]);

  const total = useMemo(() => {
    return ingredients.reduce((total: number, ingredient: IngredientDTO) => {
      return total + ingredient.price;
    }, 0);
  }, [ingredients]);

  return (
    <section className="constructor">
      <OrderItems items={ingredients} />
      <div className="checkout">
        <Price price={total} classes="mr-3" />
        <div onClick={openOrderModal}>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalType === ModalType.ORDER && (
        <OrderDetails orderNumber={orderNumber} onClose={closeModal} />
      )}
    </section>
  );
};

export default BurgerConstructor;
