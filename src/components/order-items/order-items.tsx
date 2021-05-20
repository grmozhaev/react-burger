import { useMemo } from "react";
import OrderItem from "../order-item/order-item";
import { IngredientDTO } from "../ingredient/ingredient";
import "./order-items.css";

interface OrderItemsProps {
  items: IngredientDTO[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
  const { bun, stuffing } = useMemo(() => {
    return {
      bun: items.find((item) => item.type === "bun"),
      stuffing: items.filter((item) => item.type !== "bun"),
    };
  }, [items]);

  return (
    <div>
      {bun && (
        <OrderItem
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
            <OrderItem
              type={item.type}
              _id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </li>
        ))}
      </ul>

      {bun && (
        <OrderItem
          type={bun.type}
          _id={bun._id}
          classes="item-last mr-5 mt-2 mb-4"
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
