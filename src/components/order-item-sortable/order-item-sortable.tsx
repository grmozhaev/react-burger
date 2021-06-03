import { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

import OrderItem, { OrderItemProps } from '../order-item/order-item';
import { IngredientsProps } from '../../services/actions/constructor';

const OrderItemSortable = (props: OrderItemProps) => {
  const { type, _id, image, name, price, index, moveCard } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'sortable-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IngredientsProps, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      if (moveCard) moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [style, drag] = useDrag({
    type: 'sortable-item',
    item: () => {
      return { _id, index };
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <OrderItem
      innerRef={ref}
      style={style}
      data-handler-id={handlerId}
      index={index}
      type={type}
      _id={_id}
      image={image}
      name={name}
      price={price}
    />
  );
};

export default OrderItemSortable;
