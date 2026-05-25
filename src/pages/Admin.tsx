import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Trash2,
  Upload,
  ImagePlus,
  IndianRupee,
  Apple,
  Package,
} from "lucide-react";

interface Fruit {
  _id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

const Admin = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  // 🔥 DEFAULT UNIT
  const [unit, setUnit] = useState("kg");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFruitId, setSelectedFruitId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // 🔥 Check token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // 🔥 Fetch fruits
  const fetchFruits = async () => {
    try {
      setFetchLoading(true);

      const res = await api.get("/api/fruits");

      setFruits(res.data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch fruits");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  // 🔥 Add Fruit
  const addFruit = async (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDATIONS
    if (!name.trim()) {
      toast.error("Fruit name is required");
      return;
    }

    if (!price || price <= 0) {
      toast.error("Valid price is required");
      return;
    }

    if (!file) {
      toast.error("Please select image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", String(price));
      formData.append("image", file);

      // 🔥 UNIT
      formData.append("unit", unit);

      await api.post("/api/fruits", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Fruit added successfully 🍎");

      // RESET
      setName("");
      setPrice(0);
      setFile(null);

      // DEFAULT AGAIN
      setUnit("kg");

      fetchFruits();

    } catch (err) {
      console.log(err);
      toast.error("Failed to add fruit");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Delete Fruit
  const deleteFruit = (id: string) => {
    setSelectedFruitId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {

    try {

      setDeleteLoading(true);

      await api.delete(`/api/fruits/${selectedFruitId}`);

      toast.success("Fruit deleted 🗑️");

      fetchFruits();

    } catch (err) {

      console.log(err);

      toast.error("Delete failed");

    } finally {

      setDeleteLoading(false);

      setShowDeleteModal(false);

      setSelectedFruitId("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">

        <div className="bg-green-100 p-3 rounded-full">
          <Apple className="text-green-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 flex items-center gap-2">
  Manage your fresh fruits
  <Apple
    className="text-red-500 animate-pulse"
    size={18}
  />
</p>
        </div>

      </div>

      {/* FORM */}
      <form
        onSubmit={addFruit}
        className="bg-white rounded-2xl shadow-lg p-6 mb-10"
      >

        <h2 className="text-xl font-semibold mb-5">
          Add New Fruit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-500">
              Fruit Name
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-1">
              <Apple size={18} className="text-gray-400" />

              <input
                required
                className="w-full p-3 outline-none"
                placeholder="Mango"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-500">
              Price
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-1">
              <IndianRupee
                size={18}
                className="text-gray-400"
              />

              <input
                required
                className="w-full p-3 outline-none"
                placeholder="500"
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-500">
              Fruit Image
            </label>

            <div className="border rounded-lg p-3 mt-1 bg-gray-50">

              <label className="flex items-center gap-2 cursor-pointer">

                <ImagePlus
                  size={18}
                  className="text-gray-500"
                />

                <span className="text-sm text-gray-600">
                  {file ? file.name : "Choose Image"}
                </span>

                <input
                  required
                  type="file"
                  hidden
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />

              </label>

            </div>
          </div>

        </div>

        {/* UNIT SELECTION */}
        <div className="mt-6">

          <label className="text-sm text-gray-500 flex items-center gap-2">
            <Package size={16} />
            Select Unit
          </label>

          <div className="flex items-center gap-6 mt-3">

            {/* KG */}
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg">

              <input
                type="radio"
                value="kg"
                checked={unit === "kg"}
                onChange={(e) => setUnit(e.target.value)}
              />

              <span>Per Kg</span>

            </label>

            {/* DOZEN */}
            <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg">

              <input
                type="radio"
                value="dozen"
                checked={unit === "dozen"}
                onChange={(e) => setUnit(e.target.value)}
              />

              <span>Per Dozen</span>

            </label>

          </div>

        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`mt-6 w-full md:w-auto px-6 py-3 rounded-xl text-white flex items-center justify-center gap-2 transition
          ${loading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          <Upload size={18} />

          {loading ? "Uploading..." : "Add Fruit"}
        </button>

      </form>

      {/* LIST */}
      {fetchLoading ? (

        <div className="text-center py-10">

          <div className="text-4xl animate-bounce">
            🍎
          </div>

          <p className="text-gray-500 mt-2">
            Loading fruits...
          </p>

        </div>

      ) : fruits.length === 0 ? (

        <div className="text-center text-gray-500">
          No fruits found
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {fruits.map((fruit) => (
            <div
              key={fruit._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
            >

              {/* IMAGE */}
              <div className="aspect-[9/12] overflow-hidden">

                <img
                  src={fruit.image}
                  alt={fruit.name}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {fruit.name}
                </h2>

                <p className="text-green-600 font-semibold mt-1">
                  Rs {fruit.price} / {fruit.unit || "kg"}
                </p>

                <button
                  type="button"
                  onClick={() => deleteFruit(fruit._id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  <Trash2 size={18} />
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">

            <h2 className="text-2xl font-bold text-center">
              Delete Fruit?
            </h2>

            <p className="text-gray-500 text-center mt-2">
              Are you sure you want to delete this fruit?
            </p>

            <div className="flex gap-3 mt-6">

              {/* CANCEL */}
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              {/* DELETE */}
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className={`flex-1 py-3 rounded-xl text-white transition
  ${deleteLoading
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default Admin;