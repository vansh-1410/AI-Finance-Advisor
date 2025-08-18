import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:5000/api",
});

const aiBase = axios.create({
  baseURL: "http://localhost:5001", // AI service alag port par hai
});

export const getToken = () => {
  const t = localStorage.getItem("token");
  if (t) base.defaults.headers.common["Authorization"] = `Bearer ${t}`;
  return t || "";
};

export const setToken = (t) => {
  localStorage.setItem("token", t);
  base.defaults.headers.common["Authorization"] = `Bearer ${t}`;
};

export const clearToken = () => {
  localStorage.removeItem("token");
  delete base.defaults.headers.common["Authorization"];
};

export const loginUser = (payload) => base.post("/auth/login", payload);
export const registerUser = (payload) => base.post("/auth/register", payload);

export const fetchTransactions = () => base.get("/transactions");
export const addTransaction = (payload) => base.post("/transactions", payload);
export const deleteTransaction = (id) => base.delete(`/transactions/${id}`);


export const fetchAdvice = (transactions) =>
  aiBase.post("/advice", { transactions });
