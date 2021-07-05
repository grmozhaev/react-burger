import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import OrderItems from '../order-items/order-items';
import { ModalType } from '../modal/modal';
import {
  BurgerConstructorIngredientProps,
  getOrderNumber,
} from '../../services/actions/constructor';
import { AppState } from '../../services/reducers';
import { doesBurgerHaveBun } from '../../services/reducers/constructor/constructor';

import './burger-constructor.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { ingredients, orderNumber, pickedIngredientIds } = useSelector(
    (state: AppState) => state.constructor
  );
  const { isUserLoaded } = useSelector((store: AppState) => store.auth);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver() ? 'onHover' : '',
    }),
    drop(item: BurgerConstructorIngredientProps) {
      dispatch({
        type: 'PICK_INGREDIENT',
        pickedIngredient: { id: item._id },
      });
      dispatch({
        type: 'INCREASE_ITEM_COUNT',
        pickedIngredient: { id: item._id },
      });
    },
  });

  const pickedIngredients: BurgerConstructorIngredientProps[] = useMemo(() => {
    const merged = [];

    for (let i = 0; i < pickedIngredientIds.length; i++) {
      merged.push({
        ...ingredients[pickedIngredientIds[i]],
        _id: pickedIngredientIds[i],
        index: ingredients[pickedIngredientIds[i]].type === 'bun' ? -1 : i,
      });
    }

    return merged;
  }, [pickedIngredientIds, ingredients]);

  const openOrderModal = useCallback(() => {
    if (isUserLoaded) {
      dispatch(getOrderNumber(pickedIngredientIds));
      setModalType(ModalType.ORDER);
    } else {
      history.push('/login');
    }
  }, [dispatch, pickedIngredientIds, setModalType, history, isUserLoaded]);

  const closeModal = useCallback(() => {
    setModalType(null);
  }, [setModalType]);

  const total = useMemo<number>(() => {
    return pickedIngredients.reduce(
      (total: number, ingredient: BurgerConstructorIngredientProps) => {
        return ingredient.type === 'bun'
          ? total + 2 * ingredient.price
          : total + ingredient.price;
      },
      0
    );
  }, [pickedIngredients]);

  const classNames = `constructor ${isHover}`;
  const isBun = doesBurgerHaveBun(pickedIngredientIds, ingredients);

  return (
    <section className={classNames} ref={dropTarget}>
      {pickedIngredients && pickedIngredients.length > 0 && (
        <div>
          <OrderItems items={pickedIngredients} />
          <div className="checkout">
            <Price price={total} classes="mr-3" />
            {isBun && (
              <div onClick={openOrderModal}>
                <Button type="primary" size="medium">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {modalType === ModalType.ORDER && orderNumber && (
        <OrderDetails orderNumber={orderNumber} onClose={closeModal} />
      )}
    </section>
  );
};

export default BurgerConstructor;
