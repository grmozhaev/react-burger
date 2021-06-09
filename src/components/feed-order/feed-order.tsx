import { useHistory, useLocation } from 'react-router-dom';
import Price from '../price/price';

import './feed-order.css';

const ingredientImages = (ingredients: string[]) => {
  return (
    <div className="ingredients__container mb-6">
      {ingredients.map((ingredient, index) => {
        if (index < 5) {
          return (
            <div
              className="ingredients__item"
              key={index}
              style={{
                zIndex: ingredients.length - index,
                background: `center / cover url(${ingredient}) no-repeat #000`,
              }}
            ></div>
          );
        } else if (index === 5) {
          if (ingredients.length === 6) {
            return (
              <div
                key={index}
                className="ingredients__item"
                style={{
                  zIndex: ingredients.length - index,
                  background: `center / cover url(${ingredient}) no-repeat #000`,
                }}
              ></div>
            );
          } else {
            return (
              <div
                key={index}
                className="ingredients__cumulative"
                style={{
                  zIndex: ingredients.length - index,
                  background: `center / cover url(${ingredient}) no-repeat #000`,
                }}
              >
                <span className="text text_type_main-medium ingredients__more">
                  {`+${ingredients.length - 5}`}
                </span>
              </div>
            );
          }
        } else {
          return console.log('More than 5 ingredients');
        }
      })}
    </div>
  );
};

interface OrderProps {
  ingredients: string[];
  showStatus?: boolean;
}

export const Order = (props: OrderProps) => {
  const { ingredients, showStatus } = props;
  const history = useHistory();
  const { pathname } = useLocation();

  const handleOrderClick = () => {
    history.push(`${pathname}/34535`);
  };

  return (
    <div className="order-bubble mb-6" onClick={handleOrderClick}>
      <div className="order-number-and-date p-6">
        <span className="text text_type_digits-default">#034535</span>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <p className="text text_type_main-medium pl-6 pr-6">
        Death Star Starship Main бургер
      </p>
      {showStatus && (
        <p className="text text_type_main-default mt-2 pl-6 order-status">
          Выполнен
        </p>
      )}
      <div className="order-ingredients-pics pl-6 pr-2 mt-6">
        {ingredientImages(ingredients)}
        <Price price={540} />
      </div>
    </div>
  );
};
