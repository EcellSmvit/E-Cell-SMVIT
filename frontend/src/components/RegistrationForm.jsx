import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default function RegistrationForm({ eventId }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage(null);

      const file = data.file?.[0];
      const base64 = file ? await fileToBase64(file) : "";

      const payload = {
        eventId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        college: data.college,
        answers: { note: data.note || "" },
        file: base64, // base64 image string for Cloudinary
      };

      const res = await axios.post(
        `${backendUrl}/api/registrations/event`,
        payload,
        { withCredentials: true }
      );

      if (res.data?.success) {
        setMessage({ type: "success", text: "Registered successfully!" });
        reset();
      } else {
        setMessage({ type: "error", text: res.data?.message || "Registration failed" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err?.response?.data?.message || err.message || "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-indigo-100 mt-10">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700 text-center tracking-tight">
        Event Registration
      </h3>

      {message && (
        <div
          className={`mb-5 p-3 rounded-lg text-center font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        autoComplete="off"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <small className="text-red-500 mt-1 block">Name is required</small>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email", { required: true })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            type="email"
          />
          {errors.email && (
            <small className="text-red-500 mt-1 block">Email is required</small>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone
          </label>
          <input
            {...register("phone")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your phone number"
            type="tel"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            College
          </label>
          <input
            {...register("college")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter your college name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Note / Answers
          </label>
          <textarea
            {...register("note")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
            placeholder="Any additional notes or answers"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Upload proof <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            {...register("file")}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
          />
          <small className="text-xs text-gray-500 block mt-1">
            JPEG/PNG allowed
          </small>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition
            ${
              loading
                ? "bg-indigo-300 text-white cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
            }`}
        >
          {loading ? (
            <span>
              <svg
                className="inline mr-2 w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
