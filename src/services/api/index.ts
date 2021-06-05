import { IngredientDTO } from "../../components/ingredient/ingredient";

export const fetchIngredients = async () => {
  const url = "https://norma.nomoreparties.space/api/ingredients";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const result = await response.json();
  return result.data.reduce((acc: Object, item: IngredientDTO) => {
    const { _id, ...rest } = item;
    return {...acc, [_id]: {...rest}};
  }, {})
};

export const createOrder = async (pickedIngredientIds: string[]) => {
  const url = "https://norma.nomoreparties.space/api/orders";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients: pickedIngredientIds }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const result = await response.json();
  return result.order.number;
};

export const resetPassword = async (email: string) => {
  const url = 'https://norma.nomoreparties.space/api/password-reset';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const result = await response.json();
  return result.success;
}

export const setNewPassword = async (newPassword: string, token: string) => {
  const url = 'https://norma.nomoreparties.space/api/password-reset/reset';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ password: newPassword, token }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const result = await response.json();
  return result.success;
}