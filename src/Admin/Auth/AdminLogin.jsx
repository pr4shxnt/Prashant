import { useEffect, useState } from "react";
import { useContent } from "../../Utils/ContextProvider";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const {
    isAdminAuthenticated,
    handleAdminLogin,
    error,
    isLoading,
    setAdminData,
  } = useContent();
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated === true) {
      navigate("/admin");
    }
  }, [isAdminAuthenticated, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setAdminData((prev) => ({
      ...prev,
      password,
      cred,
    }));
    handleAdminLogin();
  };

  return (
    <div className="min-h-screen  relative flex items-center justify-center bg-gradient-to-b from-black to-gray-800 py-4 px-4">
      <div className="bg-gray-600 hidden md:block shadow-md rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold flex flex-col text-gray-400  mb-4 text-center">
          Administrator login
          {error && (
            <p className="text-red-500 text-center font-light text-sm">
              {error}
            </p>
          )}
        </h2>

        <form onSubmit={onSubmit} className="space-y-2 pt-1">
          <input
            type="text"
            placeholder="Email or Username"
            value={cred}
            onChange={(e) => setCred(e.target.value)}
            className="w-full pl-3 bg-black/50 outline-none text-white rounded-full p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-3 bg-black/50 outline-none text-white rounded-full p-2"
            required
          />

          <button
            type="submit"
            className="w-full mt-3 bg-black text-white py-2 rounded-full cursor-pointer duration-300 hover:bg-gray-900"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
