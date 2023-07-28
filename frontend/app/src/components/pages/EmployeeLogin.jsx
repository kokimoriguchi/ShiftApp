import { useState } from "react";
import { useLogin } from "../hooks/LoginHook";
import { FadeIn } from "../hooks/FadeInHook";
import InputForm from "../hooks/InputForm";
import NavigateButton from "../hooks/NavigateButton";
import InputFormButton from "../hooks/InputFromButton";
import { validateNumber, validatePassword } from "../hooks/Validators";

const EmployeeLogin = () => {
  const [form, setForm] = useState({
    Number: "",
    Password: "",
  });
  const login = useLogin();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //formボタンで送信すると下記の関数呼び出してその後stateを空にする。
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      number: form.Number,
      password: form.Password,
    };
    await login(employeeData);
    setForm({
      Number: "",
      Password: "",
    });
  };

  return (
    <div className="pt-24 h-screen dark:bg-black dark:text-white">
      <FadeIn delay={50}>
        <div className="text-center dark:text-white text-gray-500 font-bold mb-5 text-3xl">
          <h1 className="font-mono">Login</h1>
        </div>
      </FadeIn>
      <div className="flex justify-center">
        <form
          className="w-full md:max-w-md sm:max-w-sm max-w-xs"
          onSubmit={handleSubmit}
        >
          <FadeIn delay={100}>
            <InputForm
              type={"text"}
              placeholder="Number"
              name="Number"
              value={form.Number}
              onChange={handleChange}
              validator={validateNumber}
              onValidChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <InputForm
              type={"password"}
              placeholder="*****************"
              name="Password"
              value={form.Password}
              onChange={handleChange}
              validator={validatePassword}
              onValidChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <InputFormButton type={"submit"} ButtonName={"login"} />
          </FadeIn>
        </form>
      </div>
      <div className="pt-10">
        <FadeIn delay={500}>
          <NavigateButton
            MoveTo={"ログインマネージャー"}
            Path={"/manager/login"}
          />
          <NavigateButton MoveTo={"戻る"} Path={"/"} />
        </FadeIn>
      </div>
    </div>
  );
};
export default EmployeeLogin;
