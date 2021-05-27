import {
  CloseIcon,
  LockIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import { useDispatch } from 'react-redux';
import {
  IngredientsProps,
  BurgerConstructorIngredientProps,
} from '../../services/actions/constructor';

import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

const OrderItemSortable = (props: BurgerConstructorIngredientProps) => {
  const { type, _id, image, name, price, classes, isLocked, index, moveCard } =
    props;
  const classNames = classes ? `item ${classes}` : 'item ml-2 mb-2';
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_INGREDIENT',
      pickedIngredient: { type, id: _id, index },
    });
  };

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'sortable-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IngredientsProps, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (moveCard) moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sortable-item',
    item: () => {
      return { _id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="order-scrollable-container ml-4"
      data-handler-id={handlerId}
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
        <div className="mr-7 remove-icon">
          {isLocked ? (
            <LockIcon type="secondary" />
          ) : (
            <CloseIcon type="primary" onClick={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemSortable;
