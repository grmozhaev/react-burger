import {
  CloseIcon,
  LockIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import "./order-item.css";

export interface OrderItemProps {
  image: string;
  name: string;
  price: number;
  classes?: string;
  isLocked?: boolean;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
}

const OrderItem = (props: OrderItemProps) => {
  const { image, name, price, classes, isLocked } = props;
  const classNames = classes ? `item ${classes}` : "item ml-2 mb-2";

  return (
    <div className="order-scrollable-container">
      {!isLocked && <DragIcon type="primary" />}
      <div className={classNames}>
        <img src={image} className="item-image" alt="ingredient" />
        <p className="item-name">{name}</p>
        <Price price={price} classes="mr-7" />
        <div className="mr-7 remove-icon">
          {isLocked ? (
            <LockIcon type="secondary" />
          ) : (
            <CloseIcon type="primary" />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
