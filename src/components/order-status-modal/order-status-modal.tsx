import { useHistory } from 'react-router-dom';

import Modal from '../modal/modal';
import { OrderStatusPage } from '../../pages/order-status';

import '../modal/modal.css';

export const OrderStatusModal = () => {
  const history = useHistory();

  const back = () => {
    history.goBack();
  };

  return (
    <Modal onClose={back}>
      <OrderStatusPage />
    </Modal>
  );
};
