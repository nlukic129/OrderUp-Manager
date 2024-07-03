interface ICheckBoxProps {
  isChecked: boolean;
  label: string;
  id: string;
  check: (id: string) => void;
}

const CheckBox = ({ isChecked, label, id, check }: ICheckBoxProps) => {
  return (
    <label className="block relative cursor-pointer text-xl select-none mt-1 checkbox-padding">
      <span className="ml-10 ">{label}</span>
      <input
        type="checkbox"
        checked={isChecked}
        name="checkbox"
        onChange={() => {
          check(id);
        }}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
