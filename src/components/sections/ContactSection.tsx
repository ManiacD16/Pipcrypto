import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { Twitter, Linkedin, Github, MessagesSquare } from "lucide-react";

const ContactSection: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-900 bg-no-repeat bg-center bg-cover relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gray-800 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-gray-700 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/4 w-64 h-64 bg-gray-800 opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Subtle heading decoration */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              Connect
            </span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12 px-4 sm:px-8 md:px-16 leading-relaxed">
            We are always open to discuss new value-adding partnerships. Do
            reach out if you are an exchange or a project looking for liquidity;
            an algorithmic trader or a software developer looking to improve the
            markets with us or just have a great idea you can't wait to share
            with us!
          </p>

          {/* Enhanced button with hover effect */}
          <div
            className="inline-block transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              onClick={() => navigate("/login")}
              variant="primary"
              className={`px-8 py-4 text-lg uppercase tracking-wider font-semibold rounded-lg shadow-lg ${
                isHovered
                  ? "bg-gradient-to-r from-blue-600 to-teal-500"
                  : "bg-blue-600"
              } hover:shadow-xl transition-all duration-300`}
            >
              Get in Touch
              <svg
                className="inline-block ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </div>

          {/* Social media icons using lucide-react */}
          <div className="flex justify-center mt-12 space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <span className="sr-only">Twitter</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300">
                <Twitter size={20} />
              </div>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300">
                <Linkedin size={20} />
              </div>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300">
                <Github size={20} />
              </div>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              aria-label="Discord"
            >
              <span className="sr-only">Discord</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300">
                <MessagesSquare size={20} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
