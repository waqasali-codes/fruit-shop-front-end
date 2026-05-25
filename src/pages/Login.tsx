import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🚀");

      setTimeout(() => {
        navigate("/admin");
      }, 800);

    } catch (err: any) {
      console.log(err);
      toast.error("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-white">

      <form
        onSubmit={handleLogin}
        className="w-80 p-6 bg-white rounded-2xl shadow-xl border"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        <div className="mb-3">
          <label className="text-sm text-gray-600">Email</label>

          <div className="flex items-center border rounded-lg px-3 mt-1">
            <Mail size={18} className="text-gray-400" />

            <input
              className="w-full p-2 outline-none"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>

          <div className="flex items-center border rounded-lg px-3 mt-1">
            <Lock size={18} className="text-gray-400" />

            <input
              className="w-full p-2 outline-none"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white flex items-center justify-center gap-2 transition
            ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login;