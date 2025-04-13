import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "px-6 py-3 rounded-md font-medium transition-all duration-300";
  const variantClasses = {
    primary:
      "bg-gradient-to-br from-[#665DCD] via-[#5FA4E6] to-[#D2AB67] text-white hover:opacity-90",
    secondary: "bg-transparent text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
