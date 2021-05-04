import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./price.css";

interface PriceProps {
  price: number;
  classes?: string;
}

const Price: FC<PriceProps> = (props) => {
  const { price, classes } = props;
  return (
    <div className={`price-tag ${classes}`}>
      <p className="text text_type_digits-default mr-1">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;
