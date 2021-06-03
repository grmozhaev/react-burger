import { useSelector } from 'react-redux';

import Modal from '../modal/modal';

import './ingredient-details.css';
import '../modal/modal.css';
import { RootState } from '../../services/reducers';

interface IngredientDetailsProps {
  onClose: () => void;
}

const IngredientDetails = (props: IngredientDetailsProps) => {
  const ingredient = useSelector((store: RootState) => {
    if (store.root.selectedIngredientId !== null) {
      return store.root.ingredients[store.root.selectedIngredientId];
    }
    return null;
  });

  const { onClose } = props;
  return (
    <Modal header="Детали ингредиента" onClose={onClose}>
      <div className="modal-container">
        {ingredient && (
          <div className="info-container-item">
            <img
              className="image-large"
              src={ingredient.image_large}
              alt="inrgedient popup"
            />
            <p className="text text_type_main-medium mt-3">{ingredient.name}</p>
            <p className="text text_type_main-default mt-3">
              Превосходные котлеты из марсианской Магнолии для фирменных
              космических бургеров, набирающих популярность по всей вселенной.
            </p>
            <div className="info-container mt-3">
              <div className="info-container-item">
                <p className="text text_type_main-default subtitle-two">
                  Калории, ккал
                </p>
                <p className="text text_type_main-default subtitle-two">
                  {ingredient.calories}
                </p>
              </div>
              <div className="info-container-item">
                <p className="text text_type_main-default subtitle-two">
                  Белки, г
                </p>
                <p className="text text_type_main-default subtitle-two">
                  {ingredient.proteins}
                </p>
              </div>
              <div className="info-container-item">
                <p className="text text_type_main-default subtitle-two">
                  Жиры, г
                </p>
                <p className="text text_type_main-default subtitle-two">
                  {ingredient.fat}
                </p>
              </div>
              <div className="info-container-item">
                <p className="text text_type_main-default subtitle-two">
                  Углеводы, г
                </p>
                <p className="text text_type_main-default subtitle-two">
                  {ingredient.carbohydrates}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default IngredientDetails;
