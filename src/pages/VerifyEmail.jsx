import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No verification token provided");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-email/${token}`,
          {
            method: "GET",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setMessage(data.message || "Verification failed");
          return;
        }

        setStatus("success");
        setMessage("Email verified successfully! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage("Network error: " + error.message);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-purple-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Email Verification
        </h2>

        {status === "verifying" && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600">Verifying your email...</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="text-green-600 text-5xl">✓</div>
            <p className="text-green-600 font-semibold">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="text-red-600 text-5xl">✕</div>
            <p className="text-red-600">{message}</p>
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Back to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
