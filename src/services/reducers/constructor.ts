import { Action, PickedIngredientsState } from "../actions/constructor";
import update from 'immutability-helper';

const initialState: PickedIngredientsState = { 
  ingredients: [], 
  pickedIngredientIds: [], 
  isBun: false,
  ingredientsFailed: false,
  ingredientsRequest: false,
  orderNumber: null,
  ingredientName: null,
  counter: []
};

export const constructorReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "PICK_INGREDIENT":
      if ((action.pickedIngredient.type === "bun" && !state.isBun) || action.pickedIngredient.type !== "bun") {
        return {
          ...state,
          isBun: action.pickedIngredient.type !== "bun" ? state.isBun : true,
          pickedIngredientIds: [
            ...state.pickedIngredientIds,
            {
              type: action.pickedIngredient.type,
              id: action.pickedIngredient.id,
              index: action.pickedIngredient.index,
            },
          ],
        };
      } else {
        return {
          ...state,
          pickedIngredientIds: [
            ...state.pickedIngredientIds.map((item) =>
              item.type === "bun"
                ? { type: item.type, id: action.pickedIngredient.id, index: action.pickedIngredient.index }
                : item
            ),
          ],
        };
      }

    case "DELETE_INGREDIENT":
      return {
        ...state,
        pickedIngredientIds: [
          ...state.pickedIngredientIds.filter((item, index) => index !== action.pickedIngredient.index)
        ],
        counter: [
          ...state.counter.map(item => 
            item.id === action.pickedIngredient.id ? {...item, counter: item.counter - 1} : item
          )]
      };
      
    case "GET_INGREDIENTS_REQUEST": 
      return {
        ...state,
        ingredientsRequest: true
      };

    case "GET_INGREDIENTS_SUCCESS":
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    
    case 'GET_INGREDIENTS_FAILED': 
      return { 
        ...state, 
        ingredientsFailed: true, 
        ingredientsRequest: false 
      };
    
    case 'GET_ORDER_NUMBER_REQUEST': 
      return { 
        ...state, 
        orderNumber: null, 
        orderNumberRequest: true 
      }; 
    
    case 'GET_ORDER_NUMBER_SUCCESS': 
      return { 
        ...state, 
        orderNumber: action.orderNumber, 
        orderNumberFailed: false, 
        orderNumberRequest: false 
      }; 
    
    case 'GET_ORDER_NUMBER_FAILED': 
      return { 
        ...state, 
        orderNumberFailed: true, 
        orderNumberRequest: false 
      }; 

    case 'VIEW_INGREDIENT_DETAILS':
      return { ...state, ingredientName: action.ingredientName};

    case 'REMOVE_INGREDIENT_DETAILS':
      return { ...state, ingredientName: null};

    case 'INCREASE_ITEM':
      const isBun = action.pickedIngredient.type === 'bun';
      const itemFound = state.counter.find(item => item.id === action.pickedIngredient.id);
      const bunFound = state.counter.find(item => item.type === action.pickedIngredient.type);

      if((!isBun && !itemFound) || (isBun && !bunFound)) {
        return { 
          ...state, 
          counter: [
            ...state.counter,
            { 
              id: action.pickedIngredient.id, 
              type: action.pickedIngredient.type, 
              counter: 1 
            }
          ]
        }
      }

      if (!isBun && itemFound) {
          return { 
            ...state, 
            counter: [
              ...state.counter.map(item => (
                item.id === action.pickedIngredient.id ? {...item, counter: item.counter + 1} : item
              ))
            ]
          }
        }

      if (isBun && bunFound) {
        return {
          ...state,
          counter: [
            ...state.counter.map(item => (
              item.type === 'bun' ? { ...item, id: action.pickedIngredient.id } : item
            ))
          ]
        }          
      }

      return state;

    case 'MOVE_ITEM':
      const newPickedIngredientIds = update(state.pickedIngredientIds, {
        $splice: [
          [action.dragIndex, 1],
          [action.hoverIndex, 0, state.pickedIngredientIds[action.dragIndex]],
        ],
      })
      
      return {
        ...state,
        pickedIngredientIds: [
          ...newPickedIngredientIds
        ]
      }

    default:
      return state;
  }
};
