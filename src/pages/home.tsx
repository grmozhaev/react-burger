import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

import { getIngredients } from '../services/actions/constructor';
import { AppState } from '../services/reducers';

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients } = useSelector((state: AppState) => state.root);

  return (
    <div>
      <p className="text text_type_main-large subtitle mb-3 mt-3">
        Соберите бургер
      </p>
      {Object.keys(ingredients).length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <div className="burger-container">
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      )}
    </div>
  );
};
