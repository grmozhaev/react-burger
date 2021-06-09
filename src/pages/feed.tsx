import { Order } from '../components/feed-order/feed-order';
import './feed.css';

const ingredients = [
  [
    'https://code.s3.yandex.net/react/code/meat-02.png',
    'https://code.s3.yandex.net/react/code/meat-04.png',
    'https://code.s3.yandex.net/react/code/meat-01.png',
    'https://code.s3.yandex.net/react/code/bun-02.png',
  ],
  [
    'https://code.s3.yandex.net/react/code/meat-02.png',
    'https://code.s3.yandex.net/react/code/meat-04.png',
    'https://code.s3.yandex.net/react/code/meat-01.png',
    'https://code.s3.yandex.net/react/code/bun-02.png',
    'https://code.s3.yandex.net/react/code/meat-02.png',
    'https://code.s3.yandex.net/react/code/meat-04.png',
    'https://code.s3.yandex.net/react/code/meat-01.png',
    'https://code.s3.yandex.net/react/code/bun-02.png',
  ],
];

const ordersDone = ['034533', '034532', '034530', '034527', '034525'];
const ordersInProgress = ['034538', '034541', '034542'];

export const FeedPage = () => {
  return (
    <div>
      <p className="text text_type_main-large mb-3 mt-3">Лента заказов</p>
      <div className="feed-container mt-6">
        <div>
          <Order ingredients={ingredients[0]} />
          <Order ingredients={ingredients[1]} />
        </div>
        <div className="ml-20 orders-readiness-display">
          <div className="order-numbers-container">
            <div className="done-orders">
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              <div>
                {ordersDone.map((order, index) => (
                  <p
                    key={index}
                    className="text text_type_digits-default done-orders-color"
                  >
                    {order}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <div>
                {ordersInProgress.map((order, index) => (
                  <p
                    key={`${index}-${order}`}
                    className="text text_type_digits-default"
                  >
                    {order}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium mt-6">
              Выполнено за все время:
            </p>
            <span className="text text_type_digits-large">28 752</span>
          </div>
          <div>
            <p className="text text_type_main-medium mt-6">
              Выполнено за сегодня:
            </p>
            <span className="text text_type_digits-large">138</span>
          </div>
        </div>
      </div>
    </div>
  );
};
