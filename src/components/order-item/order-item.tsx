import { useContext } from "react";
import {
  CloseIcon,
  LockIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import "./order-item.css";
import { IngredientDTO } from "../ingredient/ingredient";
import { PickedIngredientContext } from "../../services/ingredientContext";

const OrderItem = (props: IngredientDTO) => {
  const { type, _id, image, name, price, classes, isLocked } = props;
  const classNames = classes ? `item ${classes}` : "item ml-2 mb-2";
  const { pickedIngredientsDispatcher } = useContext(PickedIngredientContext);

  const handleDelete = () => {
    pickedIngredientsDispatcher({
      type: "DELETE_INGREDIENT",
      ingredient: { type, id: _id },
    });
  };

  return (
    <div className="order-scrollable-container ml-4">
      {!isLocked && (
        <div className="mb-1">
          <DragIcon type="primary" />
        </div>
      )}
      <div className={classNames}>
        <img src={image} className="item-image" alt="ingredient" />
        <p className="item-name">{name}</p>
        <Price price={price} classes="mr-7 order-item__price" />
        <div className="mr-7 remove-icon">
          {isLocked ? (
            <LockIcon type="secondary" />
          ) : (
            <CloseIcon type="primary" onClick={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
