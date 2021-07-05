import { IngredientDTO, IngredientStoreObject } from "../../components/ingredient/ingredient";
import { getCookie, setCookie, deleteCookie } from "../utils";

const url = "https://norma.nomoreparties.space/api";

export const fetchIngredients = async () => {
  const response = await fetch(`${url}/ingredients`);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data.reduce((acc: IngredientStoreObject, item: IngredientDTO) => {
    const { _id, ...rest } = item;
    return { ...acc, [_id]: { ...rest } };
  }, {});
};

export const fetchOrder = async (orderId: string) => {
  const response = await fetch(`${url}/orders/${orderId}`);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.orders;
};

export const createOrder = async (pickedIngredientIds: string[]) => {
  const response = await fetch(`${url}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients: pickedIngredientIds }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.order.number;
};

export const resetPassword = async (email: string) => {
  const response = await fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const setNewPassword = async (newPassword: string, token: string) => {
  const response = await fetch(`${url}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password: newPassword, token }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  localStorage.setItem("refreshToken", result.refreshToken);
  setCookie("accessToken", result.accessToken.split("Bearer ")[1]);

  return {
    name: result.user.name,
    email: result.user.email,
  };
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  localStorage.setItem("refreshToken", result.refreshToken);
  setCookie("accessToken", result.accessToken.split("Bearer ")[1]);

  return {
    name: result.user.name,
    email: result.user.email,
  };
};

export const logout = async () => {
  const response = await fetch(`${url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }

  localStorage.removeItem("refreshToken");
  deleteCookie("accessToken");
};

export const getUser = async () => {
  const result = await fetchWithRefresh(`${url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer " + getCookie("accessToken"),
    },
  });

  return {
    name: result.user.name,
    email: result.user.email,
  };
};

export const editUser = async (
  name: string,
  email: string,
  password: string
) => {
  const result = await fetchWithRefresh(`${url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  });  

  return {
    name: result.user.name,
    email: result.user.email,
  };
};

const checkResponse = (res: any) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

export const refreshToken = async () => {
  return fetch(`${url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse)
  .catch(err => console.error(err));
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      console.log('jwt expired');      
      const refreshData = await refreshToken();
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};