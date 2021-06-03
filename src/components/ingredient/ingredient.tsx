import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
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

export interface BurgerIngredientProps extends IngredientDTO {
  onClick: (name: string) => void;
}

const Ingredient = (props: BurgerIngredientProps) => {
  const dispatch = useDispatch();
  const { _id, image, type, name, price, onClick, counter } = props;

  const [style, ref] = useDrag({
    type: 'ingredient',
    item: { type, _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleClick = useCallback(() => {
    onClick(_id);
    dispatch({
      type: 'INCREASE_ITEM_COUNT',
      pickedIngredient: { id: _id },
    });

    dispatch({
      type: 'PICK_INGREDIENT',
      pickedIngredient: { id: _id },
    });
  }, [dispatch, onClick, _id]);

  return (
    <div className="ingredient" onClick={handleClick} ref={ref} style={style}>
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
