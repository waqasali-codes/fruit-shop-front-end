import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Fruit } from "../types/Fruit";
import FruitLoader from "../components/FruitLoader";
import { ShoppingCart, MapPin, Truck, ExternalLink, Apple } from "lucide-react";
import toast from "react-hot-toast";

const PHONE_NUMBER = "923096010519";

const Home = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/fruits");
        setFruits(res.data);

      } catch (error) {
        console.log(error);
        toast.error("Failed to load fruits");
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  if (loading) return <FruitLoader />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      <div className="flex items-center justify-center gap-3 mb-6 group">

        <div className="relative">

          <Apple
            className="text-red-500 animate-bounce group-hover:rotate-12 transition-all duration-300 drop-shadow-md"
            size={30}
            strokeWidth={2.3}
          />

          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-lime-500 rounded-full animate-pulse"></div>

        </div>

        <div className="flex flex-col leading-none">

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide animate-fade-in">

            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Shah G
            </span>

            <span className="ml-2 bg-gradient-to-r from-green-500 to-lime-500 bg-clip-text text-transparent">
              Fruit
            </span>

            <span className="ml-2 text-gray-800">
              Shop
            </span>

          </h1>

          <p className="text-[10px] md:text-sm text-center md:text-left text-gray-500 tracking-[2px] uppercase mt-1">
            Fresh • Organic • Natural 🍉
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {fruits.map((fruit) => {

          const message = `Hello, I want to order:
Fruit: ${fruit.name}
Price: Rs ${fruit.price} / ${fruit.unit}`;

          const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

          return (
            <div
              key={fruit._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-200"
            >

              <div className="w-full aspect-[9/12] overflow-hidden">
                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">

                <h2 className="text-lg font-bold">
                  {fruit.name}
                </h2>

                <p className="text-green-600 font-semibold mt-1">
                  Rs {fruit.price} / {fruit.unit}
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  onClick={() => toast.success("Opening WhatsApp...")}
                  className="mt-3 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  <ShoppingCart size={18} />
                  Order on WhatsApp
                </a>

              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 mb-16 bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-500" />
            <h2 className="text-xl font-bold">
              Our Location
            </h2>
          </div>

          <p className="text-gray-500 text-sm mt-1">
            Near Quaid Public High School Awan Sharif
          </p>
        </div>

        <iframe
          src="https://www.google.com/maps?q=32.8471535,74.2348874&z=17&output=embed"
          className="w-full h-64"
          loading="lazy"
        />

        <div className="p-4 space-y-3">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            <Truck size={16} />
            Free Delivery within 2 KM
          </div>

          <p className="text-gray-600 text-sm">
            We deliver fresh fruits quickly within a 2km radius around our shop location.
          </p>

          <a
            href="https://www.google.com/maps/place/Quaid+Public+High+School+Awan+Sharif/@32.847158,74.2323125,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition font-medium"
          >
            <ExternalLink size={18} />
            Open in Google Maps
          </a>

        </div>
      </div>

    </div>
  );
};

export default Home;