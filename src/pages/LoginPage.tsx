import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import Input from "components/Input";
import loginCover from "../assets/images/login-cover.png";
import Button from "components/Button";
import { checkEmail, checkPassword } from "utils/validators";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { login, isLoading } = useContext(StorageContext);

  const navigate = useNavigate();

  const emailInputConfig = {
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
    isDisabled: isLoading,
    onChangeInput: setEmail,
    required: true,
    checkValidity: checkEmail,
    onChangeValidity: setIsEmailValid,
  };
  const passwordInputConfig = {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    onChangeInput: setPassword,
    required: true,
    isDisabled: isLoading,
    checkValidity: checkPassword,
    onChangeValidity: setIsPasswordValid,
  };

  const loginHandler = async () => {
    try {
      setLoginError("");
      await login(email, password);
      navigate(`/`, { replace: true });
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden flex justify-between">
      <div className="w-full flex mt-16 lg:items-center lg:mt-0 justify-center">
        <div className="w-11/12 lg:w-6/12">
          <h1 className="font-global font-semibold text-typography text-4xl	">Welcome Back 👋</h1>
          <p className="text-lg text-supporting mt-4 font-global">We are happy to have you back</p>
          <form className="mt-20">
            <div className="flex flex-col">
              <Input {...emailInputConfig} />
            </div>
            <div className="flex flex-col mt-10">
              <Input {...passwordInputConfig} />
            </div>
            <p className="text-center text-error">{loginError}</p>
            <Button click={loginHandler} isLoading={isLoading} disabled={!isEmailValid || !isPasswordValid}>
              Login
            </Button>
          </form>
        </div>
      </div>
      <img src={loginCover} alt="login-cover-image" className="object-cover hidden lg:block" />
    </div>
  );
};

export default LoginPage;
