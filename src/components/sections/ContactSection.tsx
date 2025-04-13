import React from "react";
import Button from "../ui/Button";
import contact from "../../assets/Images/Contact.svg";

const ContactSection: React.FC = () => {
  return (
    <section
      className="w-full py-16 md:py-24 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${contact})` }}
    >
      {/* Blue/purple glow effects */}
      {/* <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-20 transform -translate-y-1/2"></div> */}
      {/* <div className="absolute hidden sm:block w-[72rem] h-[30rem] z-0 -left-48 -bottom-30 mb-0 -ml-32 bg-[radial-gradient(ellipse,#63c3ff,transparent_30%)] opacity-100 pointer-events-none blur-2xl" /> */}
      {/* <div className="absolute w-[30rem] h-[30rem]  z-0 right-0 -bottom-30 mb-20 mr-40  pointer-events-none blur-3xl">
        <div className="relative w-[25rem] h-[15rem] overlay z-0 right-0  mb-20 mr-40 bg-[radial-gradient(circle,#FEF08A,transparent_50%)]  pointer-events-none blur-3xl" />
        <div className="relative w-[30rem] h-[30rem] overlay z-0 right-0 top-30 mb-20 mr-40 bg-[radial-gradient(circle,#665DCD,transparent_50%)]  pointer-events-none blur-3xl" />
        <div className="relative w-[30rem] h-[30rem] overlay z-0 right-0  mb-20 mr-40 bg-[radial-gradient(circle,#FEF08A,transparent_50%)]  pointer-events-none blur-3xl" />
      </div> */}
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

        <Button variant="primary">GET IN TOUCH</Button>
      </div>
    </section>
  );
};

export default ContactSection;
