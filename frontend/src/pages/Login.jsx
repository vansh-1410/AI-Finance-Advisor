import { useState } from "react";
import { loginUser, registerUser, setToken } from "../services/api.js";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      if (mode === "login") {
        const { data } = await loginUser({ email, password });
        setToken(data.token);
        window.location.href = "/dashboard";
      } else {
        const { data } = await registerUser({ name, email, password });
        setToken(data.token);
        window.location.href = "/dashboard";
      }
    } catch {
      setMsg("failed, check details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-gray-800 p-8 rounded-2xl shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {msg && <div className="text-red-400 text-sm text-center">{msg}</div>}

        {mode === "register" && (
          <input
            className="w-full border border-gray-600 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          className="w-full border border-gray-600 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-600 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white p-2 rounded">
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <button
          type="button"
          className="w-full p-2 text-sm text-gray-300 hover:text-white"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "Create a new account"
            : "Already have an account?"}
        </button>
      </form>
    </div>
  );
}
