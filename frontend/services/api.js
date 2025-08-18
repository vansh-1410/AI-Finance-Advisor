import axios from "axios"


const base = axios.create({
  baseURL: "http://localhost:5000/api"
})


const aiBase = axios.create({
  baseURL: "http://localhost:5001"
})


base.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const setToken = (token) => {
  localStorage.setItem("token", token)
}

export const getToken = () => {
  return localStorage.getItem("token") || ""
}

export const clearToken = () => {
  localStorage.removeItem("token")
}


export const registerUser = (data) => base.post("/auth/register", data)
export const loginUser = (data) => base.post("/auth/login", data)


export const fetchTransactions = () => base.get("/transactions")
export const addTransaction = (data) => base.post("/transactions", data)
export const deleteTransaction = (id) => base.delete(`/transactions/${id}`)


export const fetchAdvice = (transactions) =>
  aiBase.post("/advice", { transactions })
