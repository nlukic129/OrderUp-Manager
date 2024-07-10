import { IWaiter } from "types/venueType";
import userIcon from "../../assets/images/user-icon.png";

interface ICheckBoxSupportProps {
  waiter: IWaiter;
  isChecked: boolean;
  toggle: (id: string) => void;
}

const CheckBoxSupport = ({ waiter, isChecked, toggle }: ICheckBoxSupportProps) => {
  return (
    <label className="container-cbx">
      {waiter.firstName} {waiter.lastName}
      <img src={userIcon} alt="user icon" className="user-icon-cbx" />
      <input type="checkbox" className="input-cbx" checked={isChecked} onChange={() => toggle(waiter.id)} />
      <span className="checkmark-cbx"></span>
    </label>
  );
};

export default CheckBoxSupport;
