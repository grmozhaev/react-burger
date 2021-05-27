import { RootStateOrAny, useSelector } from 'react-redux';

import Modal from '../modal/modal';
import { IngredientDTO } from '../ingredient/ingredient';

import './ingredient-details.css';
import '../modal/modal.css';

interface IngredientDetailsProps {
  onClose: () => void;
}

const IngredientDetails = (props: IngredientDetailsProps) => {
  const { ingredients, ingredientName } = useSelector(
    (store: RootStateOrAny) => store.root
  );

  const { onClose } = props;
  return (
    <Modal header="Детали ингредиента" onClose={onClose}>
      <div className="modal-container">
        {ingredients.map(
          (item: IngredientDTO, index: number) =>
            item.name === ingredientName && (
              <div key={index} className="info-container-item">
                <img
                  className="image-large"
                  src={item.image_large}
                  alt="inrgedient popup"
                />
                <p className="text text_type_main-medium mt-3">{item.name}</p>
                <p className="text text_type_main-default mt-3">
                  Превосходные котлеты из марсианской Магнолии для фирменных
                  космических бургеров, набирающих популярность по всей
                  вселенной.
                </p>
                <div className="info-container mt-3">
                  <div className="info-container-item">
                    <p className="text text_type_main-default subtitle-two">
                      Калории, ккал
                    </p>
                    <p className="text text_type_main-default subtitle-two">
                      {item.calories}
                    </p>
                  </div>
                  <div className="info-container-item">
                    <p className="text text_type_main-default subtitle-two">
                      Белки, г
                    </p>
                    <p className="text text_type_main-default subtitle-two">
                      {item.proteins}
                    </p>
                  </div>
                  <div className="info-container-item">
                    <p className="text text_type_main-default subtitle-two">
                      Жиры, г
                    </p>
                    <p className="text text_type_main-default subtitle-two">
                      {item.fat}
                    </p>
                  </div>
                  <div className="info-container-item">
                    <p className="text text_type_main-default subtitle-two">
                      Углеводы, г
                    </p>
                    <p className="text text_type_main-default subtitle-two">
                      {item.carbohydrates}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </Modal>
  );
};

export default IngredientDetails;
