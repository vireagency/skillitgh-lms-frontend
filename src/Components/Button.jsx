const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Button = ({ children, className, variant = "primary", ...props }) => {
  const baseStyle =
    "px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 focus:outline-none";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700",
    ghost: "bg-transparent hover:bg-opacity-10",
  };

  return (
    <button
      className={cn(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
