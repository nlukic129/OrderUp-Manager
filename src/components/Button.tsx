interface IButtonProps {
  children: string;
  click: () => void;
  disabled?: boolean;
}

const Button = ({ children, click, disabled = false }: IButtonProps) => {
  return (
    <button onClick={click} className={!disabled ? "button-style" : "button-disabled-style"} disabled={disabled} type="button">
      {children}
    </button>
  );
};

export default Button;
