import { HTMLAttributes, useState } from "react";
import eyeOn from "../../assets/icons/Input/eyeOn.svg";
import eyeOff from "../../assets/icons/Input/eyeOff.svg";

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  icon?: string;
  value?: string;
  type?: string;
  variant?:
    | "primary"
    | "info"
    | "success"
    | "danger"
    | "warning"
    | "dark"
    | "secondary"
    | "light";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
  isPassword?: boolean;
}

const Input: React.FC<IInputProps> = ({
  icon,
  value,
  variant,
  size,
  rounded,
  isPassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div
      className={[
        "input-container",
        `input-container-${variant}`,
        `${rounded ? "input-rounded" : ""}`,
      ].join(" ")}
    >
      {icon && <img src={icon} alt="icon" className="icon" />}
      <input
        value={value}
        type={isPassword ? (showPassword ? "password" : "text") : "text"}
        className={["input", `input-${size}`, `input-${variant}`].join(" ")}
        {...props}
      />
      {isPassword && (
        <img
          src={showPassword ? eyeOn : eyeOff}
          alt="eye-icon"
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};

type InputDefaultProps = Pick<
  IInputProps,
  "icon" | "value" | "variant" | "size" | "rounded" | "isPassword"
>;

Input.defaultProps = {
  icon: "",
  value: "Input",
  variant: "primary",
  size: "md",
  rounded: true,
  isPassword: false,
} as InputDefaultProps;

export default Input;
