import React from "react";
import { useState } from "react";
import { Star, Send, CheckCircle, Sparkles, MessageCircle } from "lucide-react";

export default function LandingPage() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating || !formData.comment.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    setIsSubmitting(true);

    const newReview = {
      ...formData,
      date: new Date().toLocaleString(),
      id: Date.now(),
    };
    setReviews([newReview, ...reviews]);

    const phoneNumber = "+254 758 025570";
    const message = `New Review for Mel Laundry Services:%0A⭐ Rating: ${formData.rating} Stars%0A📝 Comment: ${formData.comment}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ rating: 0, comment: "" });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 500);
  };

  const getRatingEmoji = (rating) => {
    const emojis = { 1: "😞", 2: "😐", 3: "👍", 4: "😊", 5: "🎉" };
    return emojis[rating] || "";
  };

  const getRatingText = (rating) => {
    const texts = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Great", 5: "Excellent" };
    return texts[rating] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-16 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, transparent 0%, transparent 50%, rgba(255,255,255,0.1) 50%)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Mel Laundry Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            Clean clothes. Fresh service. Honest reviews.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:sticky md:top-8 h-fit">
            <div className="bg-white shadow-2xl rounded-3xl p-8 transform transition-all duration-300 hover:shadow-3xl">
              {showSuccess ? (
                <div className="text-center py-12 animate-fade-in">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your review has been submitted.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <MessageCircle className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Leave a Review
                    </h2>
                    <p className="text-gray-500">Share your experience with us</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                      Rate Your Experience
                    </label>
                    <div className="flex justify-center gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleStarClick(num)}
                          onMouseEnter={() => setHoverRating(num)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform duration-200 hover:scale-125"
                        >
                          <Star
                            className={`w-12 h-12 transition-colors duration-200 ${
                              num <= (hoverRating || formData.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {formData.rating > 0 && (
                      <div className="text-center animate-fade-in">
                        <p className="text-2xl font-bold text-gray-900">
                          {getRatingEmoji(formData.rating)} {getRatingText(formData.rating)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formData.rating} out of 5 stars
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      name="comment"
                      placeholder="Tell us about your experience..."
                      value={formData.comment}
                      onChange={handleChange}
                      rows="5"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.rating || !formData.comment.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Submit Review
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
              <p className="text-gray-600">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            {reviews.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <Star
                            key={num}
                            className={`w-5 h-5 ${
                              num <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl">{getRatingEmoji(review.rating)}</span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full text-center py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12">
        <p className="text-sm">
          © {new Date().getFullYear()} Mel Laundry Services — All Rights Reserved
        </p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}