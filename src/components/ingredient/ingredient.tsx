import { FC, useState, useCallback } from "react";
import Price from "../price/price";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import "./ingredient.css";

export interface IngredientProps {
  image: string;
  name: string;
  price: number;
}

const Ingredient: FC<IngredientProps> = (props) => {
  let [counter, setCounter] = useState(0);

  const { image, name, price } = props;

  const handleClick = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  return (
    <div className="ingredient mb-2" onClick={handleClick}>
      <div className="ingredient-icon">
        {counter > 0 && <Counter count={counter} size="default" />}
      </div>

      <img src={image} alt={name} />
      <Price price={price} styles="mb-1" />
      <p className="text text_type_main-default name">{name}</p>
    </div>
  );
};

export default Ingredient;
