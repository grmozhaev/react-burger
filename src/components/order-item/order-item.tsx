import { Ref } from 'react';
import {
  LockIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/delete-icon';
import Price from '../price/price';
import './order-item.css';
import { useDispatch } from 'react-redux';
import { Identifier } from 'dnd-core';

export interface OrderItemProps {
  image: string;
  name: string;
  price: number;
  type: string;
  _id: string;
  index: number;
  classes?: string;
  isLocked?: boolean;
  innerRef?: Ref<HTMLDivElement>;
  'data-handler-id'?: Identifier | null;
  style?: Record<string, number>;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  'data-testid'?: string;
}

const OrderItem = (props: OrderItemProps) => {
  const { _id, image, name, price, classes, isLocked, index, innerRef, style } =
    props;

  const classNames = classes ? `item ${classes}` : 'item ml-2 mb-2';
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_INGREDIENT',
      pickedIngredient: { id: _id, index },
    });
  };

  return (
    <div
      ref={innerRef}
      style={style}
      className="order-scrollable-container ml-4"
      data-handler-id={props['data-handler-id']}
    >
      {!isLocked && (
        <div className="mb-1">
          <DragIcon type="primary" />
        </div>
      )}
      <div className={classNames}>
        <img src={image} className="item-image" alt="ingredient" />
        <p className="item-name">{name}</p>
        <Price price={price} classes="mr-7 order-item__price" />
        <div className="mr-7 remove-icon" data-testid={props['data-testid']}>
          {isLocked ? (
            <LockIcon type="secondary" />
          ) : (
            <DeleteIcon type="primary" onClick={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
