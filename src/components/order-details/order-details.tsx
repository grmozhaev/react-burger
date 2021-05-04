import Modal from "../modal/modal";
import "./order-details.css";
import "../modal/modal.css";

interface OrderDetailsProps {
  onClose: () => void;
}

const OrderDetails = ({ onClose }: OrderDetailsProps) => {
  const orderId = Math.floor(100000 + Math.random() * 900000);
  return (
    <Modal onClose={onClose}>
      <div className="modal-container">
        <p className="text text_type_digits-large order-id">{orderId}</p>
        <p className="text text_type_main-medium mt-4">идентификатор заказа</p>
        <div className="done-mark"></div>
        <p className="text text_type_main-default mt-5">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default mt-1 subtitle-two">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

export default OrderDetails;
