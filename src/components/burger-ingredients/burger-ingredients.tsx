import Ingredient from '../ingredient/ingredient';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Link as LinkScroll, Element } from 'react-scroll';
import { AppState } from '../../services/reducers';

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
    (store: AppState) => store.constructor
  );
  const [state, setState] = useState({ activeTab: tabs[0].label });
  const location = useLocation();

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
              <LinkScroll
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
                  value={tabName.label}
                  onClick={handleTabClick}
                >
                  {tabName.label}
                </Tab>
              </LinkScroll>
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
                  {Object.keys(ingredients).map((id: string, index) => {
                    return (
                      ingredients[id].type === activeTab.value && (
                        <Link
                          key={id}
                          to={{
                            pathname: `ingredients/${id}`,
                            state: { from: location },
                          }}
                          className="link-decoration link-color__white"
                        >
                          <li className="list-item">
                            <Ingredient
                              data-testid={`ingredient-${index}`}
                              type={ingredients[id].type}
                              _id={id}
                              image_large={ingredients[id].image_large}
                              image={ingredients[id].image}
                              name={ingredients[id].name}
                              price={ingredients[id].price}
                              counter={counter[id]}
                            />
                          </li>
                        </Link>
                      )
                    );
                  })}
                </ul>
              </ul>
            </Element>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
