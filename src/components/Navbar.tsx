import { useNavigate } from "react-router-dom";
import { Shield, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { Apple } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleAdmin = () => {
    if (token) {
      toast.success("Welcome Admin 👋");
      navigate("/admin");
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b shadow-sm">

      <div className="flex items-center justify-between px-4 py-3 md:px-8">

        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">

          <div className="relative">
            <Apple
              className="text-red-500 group-hover:rotate-12 transition-all duration-300 drop-shadow-md"
              size={24}
            />

            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="flex flex-col leading-none">

            <h1 className="font-extrabold text-base md:text-2xl tracking-wide">

              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Shah G
              </span>

              <span className="ml-1 md:ml-2 bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">
                Fruit
              </span>

              <span className="ml-1 md:ml-2 text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                Store
              </span>

            </h1>

            <p className="text-[8px] md:text-xs text-gray-500 tracking-[1px] md:tracking-[2px] uppercase mt-1">
              Fresh • Organic • Natural 🍉
            </p>

          </div>

        </div>

        <button
          onClick={handleAdmin}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          {token ? (
            <>
              <Shield size={18} />
              Admin Panel
            </>
          ) : (
            <>
              <LogIn size={18} />
              Admin Login
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default Navbar;