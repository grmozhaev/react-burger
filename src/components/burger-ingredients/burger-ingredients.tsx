import Ingredient from '../ingredient/ingredient';
import { useState, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalType } from '../modal/modal';
import './burger-ingredients.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';

import { Link, Element } from 'react-scroll';
import { RootState } from '../../services/reducers';

const tabs = [
  {
    label: 'Булки',
    value: 'bun',
  },
  {
    label: 'Соусы',
    value: 'sauce',
  },
  {
    label: 'Начинки',
    value: 'main',
  },
];

const BurgerIngredients = () => {
  const { ingredients, counter } = useSelector(
    (store: RootState) => store.root
  );
  const [state, setState] = useState({ activeTab: tabs[0].label });
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const dispatch = useDispatch();

  const openIngredientModal = useCallback(
    (selectedIngredientId) => {
      setModalType(ModalType.PICKED_INGREDIENT);
      dispatch({ type: 'VIEW_INGREDIENT_DETAILS', selectedIngredientId });
    },
    [setModalType, dispatch]
  );

  const closeModal = useCallback(() => {
    setModalType(null);
    dispatch({ type: 'REMOVE_INGREDIENT_DETAILS' });
  }, [setModalType, dispatch]);

  const handleTabClick = (activeTab: string) => {
    setState({ activeTab });
    document.querySelector(`#${activeTab}`)?.scrollIntoView();
  };

  const handleSetActive = (activeTab: string) => {
    setState({ activeTab });
  };

  return (
    <section>
      <div className="ingredients-container">
        <div className="tabs">
          {tabs.map((tabName) => {
            return (
              <Link
                containerId="tabs-container"
                key={tabName.value}
                to={tabName.label}
                spy={true}
                smooth={true}
                duration={200}
                onSetActive={handleSetActive}
              >
                <Tab
                  active={state.activeTab === tabName.label}
                  key={tabName.value}
                  value={tabName.label}
                  onClick={handleTabClick}
                >
                  {tabName.label}
                </Tab>
              </Link>
            );
          })}
        </div>

        <div className="ingredients-scrollable" id="tabs-container">
          {tabs.map((activeTab, index) => (
            <Element name={activeTab.label} key={activeTab.label}>
              <ul className="ingredients-list mt-2">
                <li key={`${activeTab.label}-${index}`} className="list-item">
                  <p
                    id={`${activeTab.label}`}
                    className="text text_type_main-medium"
                  >
                    {activeTab.label}
                  </p>
                </li>

                <ul className="ingredients-list p-2">
                  {Object.keys(ingredients).map((id: string) => {
                    return (
                      ingredients[id].type === activeTab.value && (
                        <li key={id} className="list-item">
                          <Ingredient
                            type={ingredients[id].type}
                            _id={id}
                            image_large={ingredients[id].image_large}
                            onClick={openIngredientModal}
                            image={ingredients[id].image}
                            name={ingredients[id].name}
                            price={ingredients[id].price}
                            counter={counter[id]}
                          />
                        </li>
                      )
                    );
                  })}
                </ul>
              </ul>
            </Element>
          ))}
        </div>

        {modalType === ModalType.PICKED_INGREDIENT && (
          <IngredientDetails onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default BurgerIngredients;
