import { useCallback, useMemo } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../price/price';
import './ingredient.css';

import { CounterProps } from '../../services/actions/constructor';

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
}

export interface BurgerIngredientProps extends IngredientDTO {
  onClick: (name: string) => void;
}

const Ingredient = (props: BurgerIngredientProps) => {
  const { counter } = useSelector((state: RootStateOrAny) => state.root);
  const dispatch = useDispatch();
  const { _id, image, type, name, price, onClick } = props;

  const ingredientCount = useMemo(() => {
    return counter.filter((count: CounterProps) => count.id === _id)[0]
      ?.counter;
  }, [_id, counter]);

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: { type, _id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleClick = useCallback(() => {
    onClick(name);
    dispatch({
      type: 'INCREASE_ITEM',
      pickedIngredient: { type, id: _id },
    });

    dispatch({
      type: 'PICK_INGREDIENT',
      pickedIngredient: { type, id: _id },
    });
  }, [dispatch, name, onClick, _id, type]);

  return (
    <div
      className="ingredient"
      onClick={handleClick}
      ref={ref}
      style={{ opacity }}
    >
      <div className="ingredient-icon">
        {ingredientCount > 0 && (
          <Counter count={ingredientCount} size="default" />
        )}
      </div>
      <img src={image} alt={name} />
      <Price price={price} classes="mb-1 ingredient__price" />
      <p className="text text_type_main-default name">{name}</p>
    </div>
  );
};

export default Ingredient;
