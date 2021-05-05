import { useMemo } from "react";
import OrderItem, { OrderItemProps } from "../order-item/order-item";
import "./order-items.css";

interface OrderItemsProps {
  items: OrderItemProps[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  const { upper, middle, bottom } = useMemo(() => {
    return {
      upper: items[0],
      middle: items.slice(1, items.length - 2),
      bottom: items[items.length - 1],
    };
  }, [items]);
  return (
    <div>
      <OrderItem
        classes="item-first mr-5 mb-2"
        isLocked={true}
        image={upper.image}
        name={upper.name}
        price={upper.price}
      />

      <ul className="order-scrollable">
        {middle.map((item, index) => (
          <li key={index} className="list-item">
            <OrderItem image={item.image} name={item.name} price={item.price} />
          </li>
        ))}
      </ul>

      <OrderItem
        classes="item-last mr-5 mt-2 mb-4"
        isLocked={true}
        image={bottom.image}
        name={bottom.name}
        price={bottom.price}
      />
    </div>
  );
};

export default OrderItems;
