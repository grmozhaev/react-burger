import ProfileSidebar from '../components/profile-sidebar/profile-sidebar';
import { Order } from '../components/feed-order/feed-order';

import './profile.css';
import './orders-history.css';

export const OrderHistoryPage = () => {
  return (
    <div className="profile-container">
      <ProfileSidebar />
      <div className="order-history-container ml-10">
        <Order showStatus={true} ingredients={ingredients[0]} />
        <Order showStatus={true} ingredients={ingredients[1]} />
        <Order showStatus={true} ingredients={ingredients[1]} />
      </div>
    </div>
  );
};

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
