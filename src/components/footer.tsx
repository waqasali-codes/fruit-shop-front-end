import React, { useState } from "react";
import emailjs from "emailjs-com";
import { MessageCircle, Heart, CodeXml, Citrus } from "lucide-react";

const telegramSVG = (
  <svg
    className="w-4 md:w-5 aspect-square"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.34 9.32013L6.34 2.32013C5.78749 2.04514 5.16362 1.94724 4.55344 2.03978C3.94326 2.13232 3.37646 2.4108 2.93033 2.83724C2.48421 3.26369 2.18046 3.81735 2.0605 4.42274C1.94054 5.02813 2.0102 5.65578 2.26 6.22013L4.66 11.5901C4.71446 11.72 4.74251 11.8593 4.74251 12.0001C4.74251 12.1409 4.71446 12.2803 4.66 12.4101L2.26 17.7801C2.0567 18.2368 1.97076 18.7371 2.00998 19.2355C2.0492 19.7339 2.21235 20.2145 2.48459 20.6338C2.75682 21.0531 3.12953 21.3977 3.56883 21.6363C4.00812 21.875 4.50009 22 5 22.0001C5.46823 21.9955 5.92949 21.8861 6.35 21.6801L20.35 14.6801C20.8466 14.4303 21.264 14.0474 21.5557 13.5742C21.8474 13.101 22.0018 12.556 22.0018 12.0001C22.0018 11.4442 21.8474 10.8993 21.5557 10.4261C21.264 9.95282 20.8466 9.56994 20.35 9.32013H20.34Z"
      fill="white"
    />
  </svg>
);

const commonClass =
  "input border-0 border-b-2 focus:outline-none focus:placeholder:text-green-500 placeholder:text-sm md:placeholder:text-base focus:border-green-500 border-green-200 w-full rounded-none px-0 bg-transparent";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const messageField = e.target.message;

    messageField.value =
      `${messageField.value}\n\nFrom: Fruit Shop Project`;

    emailjs
      .sendForm(
        "service_pn3xdhk",
        "template_94ha19c",
        e.target,
        "hpMhH2qqsBm1j2sbh"
      )
      .then(
        () => {
          setMsg("Message sent successfully");
          setLoading(false);
          e.target.reset();
        },
        (error) => {
          console.log(error);
          setMsg("Something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };
  return (
    <footer className="bg-gradient-to-r from-green-50 to-lime-50 border-t border-green-100 mt-20">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">

        {/* TOP */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-green-600 leading-tight">
              Let’s Build Your Next Website or App
            </h2>

            <p className="text-gray-600 mt-5 text-sm md:text-lg leading-relaxed">
              Need a modern website, dashboard, eCommerce store,
              portfolio, or mobile app for your business?
              I’m available for freelance projects and collaborations.
              <CodeXml size={20} className="inline-block ml-2 mb-1 text-green-500" />
              <span className="font-semibold text-green-600">
                {" "}— Fruit Shop Project <Citrus className="inline-block ml-2 mb-1 text-green-500" />
              </span>
            </p>

            <a
              href="https://wa.me/923201079760?text=Hi%20Waqas!%20I%20want%20to%20make%20a%20website%20or%20mobile%20app."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg mt-7"
            >
              <MessageCircle size={20} />
              Contact on WhatsApp
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-6 md:p-8">

            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <input
                type="text"
                name="user_name"
                placeholder="Your Name*"
                className={commonClass}
                required
              />

              <input
                type="email"
                name="user_email"
                placeholder="Your Email*"
                className={commonClass}
                required
              />

              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={3}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    e.target.scrollHeight + "px";
                }}
                className={`${commonClass} resize-none overflow-hidden`}
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md"
              >
                {loading ? "Sending..." : "Send Message"}
                {telegramSVG}
              </button>
            </form>

            {msg && (
              <p className="text-center mt-4 text-sm font-medium text-green-600 flex items-center justify-center gap-2">
                {msg}
                <Citrus className="text-green-500" size={18} />
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-green-100 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Fruit Shop. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            Built with <Heart size={16} className="text-red-500 fill-red-500" />
            by <span className="font-semibold text-green-600">Waqas Ali</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;