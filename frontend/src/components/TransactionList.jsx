export default function TransactionList({ items , onDelete }) {
  if (!items?.length) return <div className="text-sm text-gray-500">no transactions</div>
  return (
    <ul className="divide-y">
      {items.map(t => (
        <li key={t._id} className="flex items-center justify-between py-2">
          <div className="text-sm">
            <span className={ t.type === "income" ? "text-green-700" : "text-red-700" }>{t.type}</span>
            <span className="mx-2">₹{t.amount}</span>
            <span className="text-gray-600">{t.category}</span>
            { t.note ? <span className="ml-2 text-gray-500">• {t.note}</span> : null }
          </div>
          <button onClick={() => onDelete(t._id)} className="text-red-600 text-xs">delete</button>
        </li>
      ))}
    </ul>
  )
}
