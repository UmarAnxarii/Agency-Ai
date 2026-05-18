import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md ring-1 ring-sky-200">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-sky-900 text-center mb-2">
          🤖 Agency AI
        </h1>
        <p className="text-sky-600 text-center mb-8 text-sm">
          {isLogin ? "Welcome back! Please login." : "Create your account."}
        </p>

        {/* Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-sky-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-sky-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-700 text-white py-4 rounded-lg hover:bg-sky-800 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-sky-200" />
          <span className="text-sky-400 text-sm">or</span>
          <hr className="flex-1 border-sky-200" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-sky-200 py-4 rounded-lg hover:bg-sky-50 transition duration-300"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sky-800 font-medium">
            Continue with Google
          </span>
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-sky-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-sky-700 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Auth;