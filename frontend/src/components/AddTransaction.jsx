import { useState } from "react"
import { addTransaction } from "../services/api.js"

export default function AddTransaction({ onAdded }) {
  const [type , setType] = useState("income")
  const [amount , setAmount] = useState("")
  const [category , setCategory] = useState("")
  const [note , setNote] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    await addTransaction({ type , amount : Number(amount) , category , note })
    setType("income")
    setAmount("")
    setCategory("")
    setNote("")
    onAdded()
  }

  return (
    <form onSubmit={submit} className="space-y-2 border p-4 rounded">
      <select className="w-full border p-2" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">income</option>
        <option value="expense">expense</option>
      </select>
      <input className="w-full border p-2" placeholder="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input className="w-full border p-2" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input className="w-full border p-2" placeholder="note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="w-full bg-green-600 text-white p-2">add</button>
    </form>
  )
}
