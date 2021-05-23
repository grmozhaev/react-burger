import Price from "../price/price";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import "./ingredient.css";
import { useCallback, useContext } from "react";
import { PickedIngredientContext } from "../../services/ingredientContext";

export interface IngredientDTO {
  image: string;
  image_large?: string;
  name: string;
  price: number;
  type: string;
  _id: number;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  classes?: string;
  isLocked?: boolean;
}

export interface BurgerIngredientProps extends IngredientDTO {
  onClick: (name: string) => void;
}

const Ingredient = (props: BurgerIngredientProps) => {
  const counter = 0;
  const { _id, image, type, name, price, onClick } = props;
  const { pickedIngredientsDispatcher } = useContext(PickedIngredientContext);

  const handleClick = useCallback(() => {
    onClick(name);

    pickedIngredientsDispatcher({
      type: "PICK_INGREDIENT",
      ingredient: { type, id: _id },
    });
  }, [name, onClick, pickedIngredientsDispatcher, _id, type]);

  return (
    <div className="ingredient" onClick={handleClick}>
      <div className="ingredient-icon">
        {counter > 0 && <Counter count={counter} size="default" />}
      </div>
      <img src={image} alt={name} />
      <Price price={price} classes="mb-1 ingredient__price" />
      <p className="text text_type_main-default name">{name}</p>
    </div>
  );
};

export default Ingredient;

// if (pickedIngredientIds.filter((item) => item.type === "bun").length > 1) {
//   const index = pickedIngredientIds.findIndex(
//     (item) => item.type === "bun"
//   );
//   console.log({ index });

//   setPickedIngredientIds([
//     ...pickedIngredientIds.slice(0, index),
//     ...pickedIngredientIds.slice(index + 1),
//     { type, id: _id },
//   ]);
// } else {
//   setPickedIngredientIds([...pickedIngredientIds, { type, id: _id }]);
// }
