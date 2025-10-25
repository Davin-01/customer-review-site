import React, { useState } from "react";

export default function LandingPage() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: 0, comment: "" });

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating || !formData.comment) return;

    // Save to local display
    setReviews([...reviews, { ...formData, date: new Date().toLocaleString() }]);
    setFormData({ rating: 0, comment: "" });

    // Send to WhatsApp
    const phoneNumber = "254797682721"; // 🔁 replace with your number
    const message = `New Review for Mel Laundry Services:%0A⭐ Rating: ${formData.rating} Stars%0A📝 Comment: ${formData.comment}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-fullscreen bg-gray-200 flex flex-col items-center text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-[#1E40AF] text-white text-center py-10 shadow-md">
        <h1 className="text-4xl font-bold">Mel Laundry Services</h1>
        <p className="mt-2 text-lg text-blue-100">
          Clean clothes. Fresh service. Honest reviews.
        </p>
      </section>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mt-10 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#1E40AF] text-center">
          Leave a Review
        </h2>

        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              onClick={() => handleStarClick(num)}
              className={`cursor-pointer text-3xl transition ${
                num <= formData.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          name="comment"
          placeholder="Write your review..."
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#1E40AF] text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Submit Review
        </button>
      </form>

     

      {/* Footer */}
      <footer className="w-full text-center py-4 text-sm bg-gray-800 text-white border-t">
        © {new Date().getFullYear()} Mel Laundry Services — All Rights Reserved
      </footer>
    </div>
  );
}
