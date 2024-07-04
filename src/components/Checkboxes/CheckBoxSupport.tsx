import { IUser } from "types/venueType";

interface ICheckBoxSupportProps {
  waiter: IUser;
  isChecked: boolean;
  toggle: (id: string) => void;
}

const CheckBoxSupport = ({ waiter, isChecked, toggle }: ICheckBoxSupportProps) => {
  return (
    <label className="container-cbx">
      {waiter.firstName} {waiter.lastName}
      <input type="checkbox" className="input-cbx" checked={isChecked} onChange={() => toggle(waiter.id)} />
      <span className="checkmark-cbx"></span>
    </label>
  );
};

export default CheckBoxSupport;
