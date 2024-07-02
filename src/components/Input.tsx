import { useEffect, useRef, useState } from "react";
import passwordEye from "../assets/images/password-eye.png";
import passwordEyeShow from "../assets/images/password-eye-show.png";

interface IInputProps {
  label: string;
  placeholder: string;
  type: string;
  onChangeInput: (value: string) => void;
  value: string;
  required?: boolean;
  isDisabled?: boolean;
  checkValidity?: (value: string) => boolean;
  onChangeValidity?: (value: boolean) => void;
}

const Input = ({
  label,
  placeholder,
  type,
  value,
  required = false,
  checkValidity,
  onChangeValidity,
  onChangeInput,
  isDisabled = false,
}: IInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [isInputValid, setIsInputValid] = useState(required ? false : true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChangeValidity && onChangeValidity(isInputValid);
  }, [isInputValid]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setInputType(isPasswordVisible ? "password" : "text");
  };

  const handleBlur = () => {
    if (required && inputRef.current) {
      const inputValue = inputRef.current.value.trim();
      if (inputValue && isInputValid) {
        inputRef.current.classList.remove("error-input");
      } else {
        inputRef.current.classList.add("error-input");
      }
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.classList.remove("error-input");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (required && checkValidity) {
      setIsInputValid(checkValidity(newValue));
    }
    onChangeInput(newValue);
  };

  const passwordToggleIcon = type === "password" && (
    <img
      src={isPasswordVisible ? passwordEyeShow : passwordEye}
      alt="Toggle password visibility"
      className="w-6 absolute z-10 right-4 top-7 cursor-pointer"
      onClick={togglePasswordVisibility}
    />
  );

  return (
    <>
      <label className="text-typography font-global text-lg">{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          className="input-style font-global"
          placeholder={placeholder}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          required={required}
          disabled={isDisabled}
        />
        {passwordToggleIcon}
      </div>
    </>
  );
};

export default Input;
