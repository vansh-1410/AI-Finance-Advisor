import { useEffect, useState } from "react";
import {
  fetchTransactions,
  deleteTransaction,
  fetchAdvice,
  clearToken,
  getToken
} from "../services/api.js";
import AddTransaction from "../components/AddTransaction.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [advice, setAdvice] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await fetchTransactions();
    setItems(data);
  };

const loadAdvice = async () => {
  try {
    console.log("Transactions sending to AI:", items);

    const tx = items.map(({ type, amount, category }) => ({
      type,
      amount: Number(amount) || 0,
      category: category || "other"
    }));

    console.log("Formatted tx:", tx);

    const { data } = await fetchAdvice(tx);
    console.log("AI response:", data);
    setAdvice(data);
  } catch (err) {
    console.error("AI advice error:", err);
    setAdvice(null);
  }
};


  const remove = async (id) => {
    await deleteTransaction(id);
    load();
  };

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  useEffect(() => {
    getToken();
    load();
  }, []);

  
  useEffect(() => {
    if (items.length) {
      loadAdvice();
    }
  }, [items]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Add Transaction */}
      <AddTransaction onAdded={load} />

      {/* Transactions */}
      <div className="border rounded-lg p-4 shadow bg-gray-900">
        <h3 className="font-semibold mb-3 text-lg">Transactions</h3>
        {items.length > 0 ? (
          <TransactionList items={items} onDelete={remove} />
        ) : (
          <p className="text-gray-400 text-sm">No transactions yet.</p>
        )}
      </div>

      {/* AI Advice */}
      <div className="border rounded-lg p-4 shadow bg-gray-900">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">AI Advice</h3>
          <button
            onClick={loadAdvice}
            className="text-blue-400 hover:underline text-sm"
          >
            Refresh
          </button>
        </div>

        {advice ? (
          <div className="text-sm space-y-2">
            <div>
              <span className="font-medium">Income:</span> ₹
              {Math.round(advice.income || 0)}
            </div>
            <div>
              <span className="font-medium">Expense:</span> ₹
              {Math.round(advice.expense || 0)}
            </div>
            <div>
              <span className="font-medium">Net:</span> ₹
              {Math.round(advice.net || 0)}
            </div>
            <ul className="list-disc ml-6 text-gray-300">
              {advice.tips?.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Press refresh to get advice
          </div>
        )}
      </div>
    </div>
  );
}
