import { useDrag } from 'react-dnd';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../price/price';
import './ingredient.css';

export interface IngredientDTO {
  image: string;
  image_large?: string;
  name: string;
  price: number;
  type: string;
  _id: string;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  classes?: string;
  isLocked?: boolean;
  counter: number;
}

export interface IngredientStoreObject {
  [key: string]: Omit<IngredientDTO, '_id'>;
}

export interface BurgerIngredientProps extends IngredientDTO {
  'data-testid': string;
}

const Ingredient = (props: BurgerIngredientProps) => {
  const { _id, image, type, name, price, counter } = props;

  const [style, ref] = useDrag({
    type: 'ingredient',
    item: { type, _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      className="ingredient"
      ref={ref}
      style={style}
      data-testid={props['data-testid']}
    >
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
