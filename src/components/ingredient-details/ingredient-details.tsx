import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../modal/modal';
import { IngredientPage } from '../../pages';

import './ingredient-details.css';
import '../modal/modal.css';

const IngredientDetails = () => {
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Modal header="Детали ингредиента" onClose={handleClose}>
      <IngredientPage />
    </Modal>
  );
};

export default IngredientDetails;
