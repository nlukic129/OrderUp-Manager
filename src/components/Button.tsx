import { useEffect, useState } from "react";
import LoadSpinner from "./LoadSpinner";

interface IButtonProps {
  children: string;
  click: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({ children, click, disabled = false, isLoading = false }: IButtonProps) => {
  const [displayElement, setDisplayElement] = useState<any>(<p className="h-7">{children}</p>);

  useEffect(() => {
    if (isLoading) {
      setDisplayElement(<LoadSpinner />);
    } else {
      setDisplayElement(<p className="h-7">{children}</p>);
    }
  }, [isLoading]);

  return (
    <button onClick={click} className={!disabled ? "button-style relative" : "button-disabled-style"} disabled={disabled} type="button">
      {displayElement}
    </button>
  );
};

export default Button;
