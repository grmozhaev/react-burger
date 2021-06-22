import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import OrderItem from '../order-item/order-item';
import OrderItemSortable from '../order-item-sortable/order-item-sortable';
import { BurgerConstructorIngredientProps } from '../../services/actions/constructor';

import './order-items.css';

interface OrderItemsProps {
  items: BurgerConstructorIngredientProps[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  const dispatch = useDispatch();
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch({ type: 'MOVE_ITEM', dragIndex, hoverIndex });
    },
    [dispatch]
  );

  const { bun, stuffing } = useMemo(() => {
    return {
      bun: items.find((item) => item.type === 'bun'),
      stuffing: items.filter((item) => item.type !== 'bun'),
    };
  }, [items]);

  return (
    <div>
      {bun && (
        <OrderItem
          index={bun.index}
          type={bun.type}
          _id={bun._id}
          classes="item-first mr-5 mb-2"
          isLocked={true}
          image={bun.image}
          name={`${bun.name} (верх)`}
          price={bun.price}
        />
      )}

      <ul className="order-scrollable">
        {stuffing.map((item, index) => (
          <li key={index} className="list-item">
            <OrderItemSortable
              data-testid={`item-${item.index}`}
              index={item.index}
              type={item.type}
              _id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              moveCard={moveCard}
            />
          </li>
        ))}
      </ul>

      {bun && (
        <OrderItem
          index={bun.index}
          type={bun.type}
          _id={bun._id}
          classes="item-last mr-5 mb-4"
          isLocked={true}
          image={bun.image}
          name={`${bun.name} (низ)`}
          price={bun.price}
        />
      )}
    </div>
  );
};

export default OrderItems;
