import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-950 via-purple-950 to-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between w-full px-10 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white">KaliWebApp</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            <LogIn size={20} />
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            <UserPlus size={20} />
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl text-center space-y-8">
          {/* Title Section */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to <span className="text-blue-400">KaliWebApp</span>
            </h2>
            <p className="text-xl text-gray-300">
              Your gateway to an exclusive community of innovators, learners,
              and leaders
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 hover:border-blue-400 transition">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-white mb-2">Events</h3>
              <p className="text-gray-300">
                Discover amazing events and networking opportunities
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 hover:border-blue-400 transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Community
              </h3>
              <p className="text-gray-300">
                Connect with a vibrant community of members
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 hover:border-blue-400 transition">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Achievements
              </h3>
              <p className="text-gray-300">
                Earn certificates and showcase your accomplishments
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Ready to get started?
            </h3>
            <p className="text-blue-100">
              Join thousands of members and unlock exclusive content, events,
              and opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => navigate("/register")}
                className="flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Create Account
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Already have an account?
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 backdrop-blur-lg bg-black/30 px-10 py-6">
        <p className="text-center text-gray-400 text-sm">
          © 2024 KaliWebApp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
