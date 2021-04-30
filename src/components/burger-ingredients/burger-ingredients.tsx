import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-ingredients.css";
import { data } from "../../utils/data";
import Ingredient from "../ingredient/ingredient";

const tabs = [
  {
    label: "Булки",
    value: "bun",
  },
  {
    label: "Соусы",
    value: "sauce",
  },
  {
    label: "Начинки",
    value: "main",
  },
];

class BurgerIngredients extends React.Component {
  state = {
    activeTab: tabs[0].label,
  };

  handleTabClick = (activeTab: string) => {
    this.setState({ activeTab });
    document.querySelector(`#${activeTab}`)?.scrollIntoView();
  };

  render() {
    return (
      <section>
        <div className="ingredients-container">
          <div className="tabs">
            {tabs.map((tabName) => {
              return (
                <Tab
                  active={this.state.activeTab === tabName.label}
                  key={tabName.value}
                  value={tabName.label}
                  onClick={this.handleTabClick}
                >
                  {tabName.label}
                </Tab>
              );
            })}
          </div>

          <div className="ingredients-scrollable">
            {tabs.map((activeTab) => (
              <ul key={activeTab.label} className="ingredients-list mt-2">
                <li className="list-item">
                  <p
                    id={`${activeTab.label}`}
                    className="text text_type_main-medium"
                  >
                    {activeTab.label}
                  </p>
                </li>

                <ul className="ingredients-list p-2">
                  {data.map(
                    (item) =>
                      item.type === activeTab.value && (
                        <li key={item._id} className="list-item">
                          <Ingredient
                            image={item.image}
                            name={item.name}
                            price={item.price}
                          />
                        </li>
                      )
                  )}
                </ul>
              </ul>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
