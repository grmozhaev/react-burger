import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { getIngredients } from '../../services/actions/constructor';
import { IOrder } from '../../services/actions/websocket';
import { AppState } from '../../services/reducers';
import { formatDate } from '../../services/utils';
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

export const orderStatus = {
  done: 'Выполнен',
  pending: 'Отменён',
  created: 'Готовится',
};

export const Order = (props: IOrder) => {
  const { ingredients, _id, status, number, name, createdAt, showStatus } =
    props;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients: allIngredients } = useSelector(
    (state: AppState) => state.root
  );

  const images: string[] = useMemo(() => {
    return ingredients.map((ingredient) => allIngredients[ingredient]?.image);
  }, [ingredients, allIngredients]);

  const total = useMemo<number>(() => {
    return ingredients.reduce((total: number, ingredient: string) => {
      return allIngredients[ingredient].type === 'bun'
        ? total + 2 * allIngredients[ingredient]?.price
        : total + allIngredients[ingredient]?.price;
    }, 0);
  }, [ingredients, allIngredients]);

  return (
    <div className="order-bubble mb-6">
      <Link
        to={{
          pathname: `${location.pathname}/${_id}`,
          state: { from: location },
        }}
        className="link-decoration link-color__white"
      >
        <div className="order-number-and-date p-6">
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <span className="text text_type_main-default text_color_inactive">
            {formatDate(createdAt)}
          </span>
        </div>
        <p className="text text_type_main-medium pl-6 pr-6">{name}</p>

        {showStatus && (
          <p className="text text_type_main-default mt-2 pl-6 order-status">
            {orderStatus[status]}
          </p>
        )}

        <div className="order-ingredients-pics pl-6 pr-2 mt-6">
          {ingredientImages(images)}
          <Price price={total} />
        </div>
      </Link>
    </div>
  );
};
