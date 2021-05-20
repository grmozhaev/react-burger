import { useCallback, useState, useMemo, useContext } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import OrderDetails from "../order-details/order-details";
import OrderItems from "../order-items/order-items";
import { IngredientDTO } from "../ingredient/ingredient";
import { ModalType } from "../modal/modal";
import {
  PickedIngredientContext,
  IngredientListContext,
} from "../../services/ingredientContext";
import "./burger-constructor.css";

const BurgerConstructor = () => {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { pickedIngredientsState } = useContext(PickedIngredientContext);
  const ingredients = useContext(IngredientListContext);
  const [orderNumber, setOrderNumber] = useState(0);

  const pickedIngredients = useMemo(() => {
    return pickedIngredientsState.ingredients
      .map((item) => ingredients.filter((el) => el._id === item.id))
      .flat();
  }, [ingredients, pickedIngredientsState]);

  const openOrderModal = useCallback(() => {
    const fetchData = async () => {
      const url = "https://norma.nomoreparties.space/api/orders";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ingredients: pickedIngredients }),
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
  }, [pickedIngredients, setModalType]);

  const closeModal = useCallback(() => {
    setModalType(null);
  }, [setModalType]);

  const total = useMemo(() => {
    return pickedIngredients.reduce(
      (total: number, ingredient: IngredientDTO) => {
        return ingredient.type === "bun"
          ? total + 2 * ingredient.price
          : total + ingredient.price;
      },
      0
    );
  }, [pickedIngredients]);

  return (
    <section className="constructor">
      {pickedIngredients && pickedIngredients.length > 0 && (
        <div>
          <OrderItems items={pickedIngredients} />
          <div className="checkout">
            <Price price={total} classes="mr-3" />
            {pickedIngredientsState.isBun && (
              <div onClick={openOrderModal}>
                <Button type="primary" size="medium">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {modalType === ModalType.ORDER && (
        <OrderDetails orderNumber={orderNumber} onClose={closeModal} />
      )}
    </section>
  );
};

export default BurgerConstructor;
