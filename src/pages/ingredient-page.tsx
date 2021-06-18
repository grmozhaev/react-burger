import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { AppState } from '../services/reducers';
import { getIngredients } from '../services/actions/constructor';

import '../components/ingredient-details/ingredient-details.css';
import Modal from '../components/modal/modal';
import { IngredientDTO } from '../components/ingredient/ingredient';

interface State {
  from?: Location;
}

export const IngredientPage = () => {
  const params = useParams<Record<string, string>>();
  const dispatch = useDispatch();
  const location: Location<State> = useLocation();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const from = location?.state?.from?.pathname;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredient = useSelector((store: AppState) => {
    return store.root.ingredients[params.id];
  });

  const header = 'Детали ингредиента';

  interface IngredientInfoProps {
    ingredient: IngredientDTO;
  }

  const IngredientInfo = (props: IngredientInfoProps) => {
    const { ingredient } = props;

    return (
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
    );
  };

  return (
    <div>
      {from === '/' ? (
        <Modal header={header} onClose={handleClose}>
          <IngredientInfo ingredient={ingredient} />
        </Modal>
      ) : (
        <IngredientInfo ingredient={ingredient} />
      )}
    </div>
  );
};
