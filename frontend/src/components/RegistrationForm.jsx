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
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Event Registration</h3>

      {message && (
        <div
          className={`mb-3 p-2 rounded ${
            message.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm">Full name</label>
          <input {...register("name", { required: true })} className="w-full p-2 border rounded" />
          {errors.name && <small className="text-red-500">Name is required</small>}
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input {...register("email", { required: true })} className="w-full p-2 border rounded" />
          {errors.email && <small className="text-red-500">Email is required</small>}
        </div>

        <div>
          <label className="block text-sm">Phone</label>
          <input {...register("phone")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">College</label>
          <input {...register("college")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Note / Answers</label>
          <textarea {...register("note")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Upload proof (optional)</label>
          <input {...register("file")} type="file" accept="image/*" />
          <small className="text-xs text-gray-500">JPEG/PNG allowed</small>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
