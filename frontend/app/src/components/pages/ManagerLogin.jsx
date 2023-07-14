import { useState } from "react";
import { FadeIn } from "../hooks/FadeInHook";
import { useManagerLogin } from "../hooks/LoginHook";
import InputForm from "../hooks/InputForm";
import NavigateButton from "../hooks/NavigateButton";
import InputFormButton from "../hooks/InputFromButton";

const EmployeeLogin = () => {
  const [form, setForm] = useState({
    employeeNumber: "",
    employeePassword: "",
  });
  const login = useManagerLogin();

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
      number: form.employeeNumber,
      password: form.employeePassword,
    };
    await login(employeeData);
    setForm({
      employeeNumber: "",
      employeePassword: "",
    });
  };

  return (
    <div className="pt-10">
      <FadeIn delay={50}>
        <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
          <h1>Manager Login</h1>
        </div>
      </FadeIn>
      <div className="flex justify-center">
        <form
          className="w-full md:max-w-md sm:max-w-sm max-w-xs"
          onSubmit={handleSubmit}
        >
          <FadeIn delay={100}>
            <InputForm
              label="StaffNumber"
              placeholder="StaffNumber"
              name="employeeNumber"
              value={form.employeeNumber}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <InputForm
              label="StaffPassword"
              placeholder="StaffPassword"
              name="employeePassword"
              value={form.employeePassword}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <InputFormButton type={"submit"} ButtonName={"Login"} />
          </FadeIn>
        </form>
      </div>
      <NavigateButton MoveTo={"Create Staff"} Path={"/employee/create"} />
      <NavigateButton MoveTo={"Home"} Path={"/"} />
    </div>
  );
};
export default EmployeeLogin;
