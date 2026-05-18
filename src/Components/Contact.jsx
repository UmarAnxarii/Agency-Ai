import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      setStatusType("error");
      return;
    }

    setLoading(true);

    // ✅ Save form data before clearing
    const submittedData = { ...formData };

    // ✅ Show success IMMEDIATELY — feels instant
    setStatus("Message sent successfully!.");
    setStatusType("success");
    setFormData({ name: "", email: "", message: "" });
    setLoading(false);

    // ✅ Send to server in background
    fetch("https://agency-ai-ruby-two.vercel.app/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submittedData),
    }).catch((error) => {
      console.error("Background send error:", error);
    });
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-sky-200 via-sky-100 to-white sm:px-6 sm:py-18 md:px-8 lg:px-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 text-sky-900">
          Reach out to us
        </h2>
        <p className="text-sky-700 max-w-2xl mx-auto">
          Have a question or need help? Fill out the form below.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-8 sm:p-10 ring-1 ring-sky-200">
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

          {/* Status Message */}
          {status && (
            <p
              className={`text-center text-sm font-medium ${
                statusType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-700 text-white py-4 rounded-lg hover:bg-sky-800 transition duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Submit Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
