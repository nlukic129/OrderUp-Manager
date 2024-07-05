import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import backIcon from "../assets/images/back-icon.png";
import Input from "components/Input";
import { StorageContext } from "data/StorageContext";
import TableSelection from "components/Selections/TableSelection";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddWaiterPage = () => {
  const { isLoading, selectedVenue, addWaiter } = useContext(StorageContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [selectedTablesIds, setSelectedTablesIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/waiters", { replace: true });
  };

  const addWaiterHandler = async () => {
    // TODO Popup za uspesno dodat sto, i popup za error gde ce se ispisati error
    try {
      await addWaiter({ email, firstName, lastName, password, tables: selectedTablesIds });
      navigate("/waiters", { replace: true });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const checkIsInputValid = () => {
    return isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  const firstNameInputConfig = {
    label: "First Name",
    placeholder: "exp. John",
    type: "text",
    onChangeInput: setFirstName,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => value.length > 0,
    onChangeValidity: setIsFirstNameValid,
    value: firstName,
  };
  const lastNameInputConfig = {
    label: "Last Name",
    placeholder: "exp. Doe",
    type: "text",
    onChangeInput: setLastName,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => value.length > 0,
    onChangeValidity: setIsLastNameValid,
    value: lastName,
  };
  const emailInputConfig = {
    label: `Email (Must end with @${selectedVenue?.name}.com)`,
    placeholder: `exp. j.doe@${selectedVenue?.name}.com`,
    type: "text",
    onChangeInput: setEmail,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => emailRegex.test(value) && value.endsWith(`${selectedVenue?.name}.com`),
    onChangeValidity: setIsEmailValid,
    value: email,
  };
  const passwordInputConfig = {
    label: "Password",
    placeholder: "",
    type: "password",
    onChangeInput: setPassword,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => passwordRegex.test(value),
    onChangeValidity: setIsPasswordValid,
    value: password,
  };
  const confirmPasswordInputConfig = {
    label: "Confirm Password",
    placeholder: "",
    type: "password",
    onChangeInput: setConfirmPassword,
    required: true,
    isDisabled: isLoading,
    checkValidity: (value: string) => value === password,
    onChangeValidity: setIsConfirmPasswordValid,
    value: confirmPassword,
  };
  // TODO Add "Add button" loader
  return (
    <>
      {selectedVenue && (
        <>
          <div className="flex items-center justify-between mb-5 flex-wrap">
            <div className="flex items-center">
              <img src={backIcon} alt="back icon" className="hover:scale-125 cursor-pointer" onClick={backHandler} />
              <h1 className="text-3xl ml-10">Add waiter</h1>
            </div>
            <div className="flex items-center w-full mt-10 justify-end sm:w-1/4 sm:mt-0">
              <button
                className={checkIsInputValid() ? "button-add-table" : "button-add-table-disabled"}
                type="button"
                onClick={addWaiterHandler}
                disabled={!checkIsInputValid()}
              >
                Add Waiter
              </button>
            </div>
          </div>
          <div className="h-96 add-table-form-wrapper no-scrollbar w-full">
            <div className="flex flex-wrap ">
              <div className="mt-0 w-full md:w-2/5 flex flex-wrap md:justify-between">
                <div className="w-full md:w-3/6 xl:w-3/6 md:pr-5">
                  <Input {...firstNameInputConfig}></Input>
                </div>
                <div className="w-full md:w-3/6 xl:w-3/6 md:pr-5">
                  <Input {...lastNameInputConfig}></Input>
                </div>
              </div>
              <div className="w-full md:w-2/5 xl:w-2/5">
                <Input {...emailInputConfig}></Input>
              </div>
            </div>
            <div className="flex flex-wrap md:mt-5 ">
              <div className="w-full md:w-2/5  md:pr-5">
                <Input {...passwordInputConfig}></Input>
              </div>
              <div className="w-full md:w-2/5 xl:w-2/5">
                <Input {...confirmPasswordInputConfig}></Input>
              </div>
            </div>
            <h1 className="text-3xl mt-10 mb-10">Add a table to the waiter</h1>
            <TableSelection tables={selectedVenue.tables} selectedTablesIds={selectedTablesIds} setSelectedTablesIds={setSelectedTablesIds} />
          </div>
        </>
      )}
    </>
  );
};

export default AddWaiterPage;
