import "./Button.css";
import { Link } from "react-router-dom";

export const buttonVariants = {
  default: "default",
  red: "red",
  green: "green",
};

const Button = ({ children, to, variant, className, ...props }) => {
  const generatedClassName = `btn btn-info btn-default
   ${variant === buttonVariants.red && "btn-red"} 
   ${variant === buttonVariants.green && "btn-green"}
   ${className || ""}`;

  return to ? (
    <Link to={to} {...props} className={generatedClassName}>
      {children}
    </Link>
  ) : (
    <button type="submit" {...props} className={generatedClassName}>
      {children}
    </button>
  );
};

export default Button;
