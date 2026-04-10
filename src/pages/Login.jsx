import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, authAPI } from "../utils/api";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authAPI.login(formData);

      if (!result.success) {
        setError(result.error || "Login failed");
        setLoading(false);
        return;
      }

      const { data } = result;

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update authentication state and navigate
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      const backendUrl = API_URL || "this site's /api endpoint";
      setError(
        `Network error: ${err.message}\n\nMake sure the backend is reachable at ${backendUrl}.`,
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-purple-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-wrap text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => navigate("/forgot-password")}
          className="w-full text-blue-600 hover:underline text-sm mt-2"
        >
          Forgot Password?
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
