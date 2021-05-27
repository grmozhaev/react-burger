import { useCallback, useState, useMemo } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Price from '../price/price';
import OrderDetails from '../order-details/order-details';
import OrderItems from '../order-items/order-items';
import { IngredientDTO } from '../ingredient/ingredient';
import { ModalType } from '../modal/modal';
import {
  getOrderNumber,
  BurgerConstructorIngredientProps,
} from '../../services/actions/constructor';

import './burger-constructor.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { ingredients, isBun, orderNumber, pickedIngredientIds } = useSelector(
    (state: RootStateOrAny) => state.root
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver() ? ' onHover' : '',
    }),
    drop(item: BurgerConstructorIngredientProps) {
      dispatch({
        type: 'PICK_INGREDIENT',
        pickedIngredient: { type: item.type, id: item._id },
      });
      dispatch({
        type: 'INCREASE_ITEM',
        pickedIngredient: { type: item.type, id: item._id },
      });
    },
  });

  const pickedIngredients: BurgerConstructorIngredientProps[] = useMemo(() => {
    const merged = [];

    for (let i = 0; i < pickedIngredientIds.length; i++) {
      merged.push({
        ...pickedIngredientIds[i],
        ...ingredients.find(
          (item: IngredientDTO) => item._id === pickedIngredientIds[i].id
        ),
        index: pickedIngredientIds[i].type === 'bun' ? -1 : i,
      });
    }

    return merged;
  }, [pickedIngredientIds, ingredients]);

  const openOrderModal = useCallback(() => {
    dispatch(getOrderNumber(pickedIngredients));
    setModalType(ModalType.ORDER);
  }, [dispatch, pickedIngredients, setModalType]);

  const closeModal = useCallback(() => {
    setModalType(null);
  }, [setModalType]);

  const total = useMemo(() => {
    return pickedIngredients.reduce(
      (total: number, ingredient: BurgerConstructorIngredientProps) => {
        return ingredient.type === 'bun'
          ? total + 2 * ingredient.price
          : total + ingredient.price;
      },
      0
    );
  }, [pickedIngredients]);

  const classNames = `constructor${isHover}`;

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
      {modalType === ModalType.ORDER && (
        <OrderDetails orderNumber={orderNumber} onClose={closeModal} />
      )}
    </section>
  );
};

export default BurgerConstructor;
