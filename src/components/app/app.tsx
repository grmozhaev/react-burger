import { useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../services/actions/constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import './app.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients } = useSelector((state: RootStateOrAny) => state.root);

  return (
    <div className="app">
      <header className="app-header">
        <AppHeader />
      </header>
      <p className="text text_type_main-large subtitle mb-3 mt-3">
        Соберите бургер
      </p>
      {ingredients.length > 0 && (
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

export default App;
