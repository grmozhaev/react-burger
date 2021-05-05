import Price from "../price/price";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import "./ingredient.css";

export interface IngredientProps {
  image: string;
  image_large: string;
  name: string;
  price: number;
  onClick: (name: string) => void;
  type?: string;
  _id?: number;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
}

const Ingredient = (props: IngredientProps) => {
  let counter = 0;
  const { image, name, price, onClick } = props;

  return (
    <div className="ingredient" onClick={() => onClick(name)}>
      <div className="ingredient-icon">
        {counter > 0 && <Counter count={counter} size="default" />}
      </div>

      <img src={image} alt={name} />
      <Price price={price} classes="mb-1" />
      <p className="text text_type_main-default name">{name}</p>
    </div>
  );
};

export default Ingredient;
