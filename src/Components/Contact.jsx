import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setStatus("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-sky-200 via-sky-100 to-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-sky-900">
          Reach out to us
        </h2>

        <p className="text-sky-700 max-w-2xl mx-auto">
          Have a question or need help? Fill out the form below.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10 ring-1 ring-sky-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-sky-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-sky-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 border border-sky-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
          />

          {status && (
            <p className="text-center text-sm text-sky-800">{status}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-700 text-white py-4 rounded-lg hover:bg-sky-800 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;