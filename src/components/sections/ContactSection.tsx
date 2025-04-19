import React from "react";
import Button from "../ui/Button";
import contact from "../../assets/Images/Contact.svg";
import { useNavigate } from "react-router-dom";

const ContactSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section
      className="w-full py-16 md:py-24 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${contact})` }}
    >
      <div className="container mx-auto px-4 text-center z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Contact Us
        </h2>

        <p className="text-gray-300 max-w-3xl mx-auto mb-12 px-16">
          We are always open to discuss new value-adding partnerships. Do reach
          out if you are an exchange or a project looking for liquidity; an
          algorithmic trader or a software developer looking to improve the
          markets with us or just have a great idea you can't wait to share with
          us!
        </p>

        <Button onClick={() => navigate("/login")} variant="primary">
          GET IN TOUCH
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
