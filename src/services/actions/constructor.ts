import { IngredientDTO } from "../../components/ingredient/ingredient";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { createOrder, fetchIngredients } from "../api";

export interface IngredientsProps {
  id: string;
  index: number;
}

export interface BurgerConstructorIngredientProps extends IngredientDTO {
  index: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

export interface ConstructorState {
  ingredients: Record<string, IngredientDTO>;
  pickedIngredientIds: string[];
  ingredientsFailed: boolean;
  ingredientsRequest: boolean;
  orderNumber: number | null;
  selectedIngredientId: number | null;
  counter: Record<string, number>;
}

export type ConstructorAction =
  | { type: ConstructorActionType.PICK_INGREDIENT; pickedIngredient: IngredientsProps }
  | { type: ConstructorActionType.DELETE_INGREDIENT; pickedIngredient: IngredientsProps}
  | { type: ConstructorActionType.GET_INGREDIENTS_REQUEST }
  | { type: ConstructorActionType.GET_INGREDIENTS_SUCCESS; ingredients: Record<string, IngredientDTO> }
  | { type: ConstructorActionType.GET_INGREDIENTS_FAILED }
  | { type: ConstructorActionType.GET_ORDER_NUMBER_REQUEST }
  | { type: ConstructorActionType.GET_ORDER_NUMBER_SUCCESS; orderNumber: number | null }
  | { type: ConstructorActionType.GET_ORDER_NUMBER_FAILED }
  | { type: ConstructorActionType.VIEW_INGREDIENT_DETAILS; selectedIngredientId: string }
  | { type: ConstructorActionType.REMOVE_INGREDIENT_DETAILS }
  | { type: ConstructorActionType.INCREASE_ITEM_COUNT; pickedIngredient: IngredientsProps }
  | { type: ConstructorActionType.MOVE_ITEM; dragIndex: number; hoverIndex: number };

export enum ConstructorActionType {
  PICK_INGREDIENT = "PICK_INGREDIENT",
  DELETE_INGREDIENT = "DELETE_INGREDIENT",
  GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST",
  GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED",
  GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST",
  GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS",
  GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED",
  VIEW_INGREDIENT_DETAILS = "VIEW_INGREDIENT_DETAILS",
  REMOVE_INGREDIENT_DETAILS = "REMOVE_INGREDIENT_DETAILS",
  INCREASE_ITEM_COUNT = "INCREASE_ITEM_COUNT",
  MOVE_ITEM = "MOVE_ITEM",
}

export const getIngredients =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: "GET_INGREDIENTS_REQUEST" });

    try {
      const ingredients = await fetchIngredients();
      dispatch({ type: "GET_INGREDIENTS_SUCCESS", ingredients });
    } catch (e) {
      dispatch({ type: "GET_INGREDIENTS_FAILED" });
    }
  };

export const getOrderNumber =
  (pickedIngredientIds: string[]) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: "GET_ORDER_NUMBER_REQUEST" });

    try {
      const orderNumber = await createOrder(pickedIngredientIds);
      dispatch({ type: "GET_ORDER_NUMBER_SUCCESS", orderNumber });
    } catch (e) {
      dispatch({ type: "GET_ORDER_NUMBER_FAILED" });
    }
  };
