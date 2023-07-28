import { useState, useContext } from "react";
import { useEmployeeCreate } from "../hooks/EmployeeCreateHook";
import { FadeIn } from "../hooks/FadeInHook";
import InputForm from "../hooks/InputForm";
import NavigateButton from "../hooks/NavigateButton";
import InputFormButton from "../hooks/InputFromButton";
import {
  validateNumber,
  validatePassword,
  validateName,
} from "../hooks/Validators";
import { useParams } from "react-router-dom";
import { AuthContext } from "../hooks/Auth";

const EmployeeCreate = () => {
  const { storeNumber } = useParams();
  const { storeName } = useContext(AuthContext);
  const [form, setForm] = useState({
    Name: "",
    Number: "",
    Password: "",
    storeNumber: storeNumber,
  });
  const employeeCreate = useEmployeeCreate();

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
      name: form.Name,
      number: form.Number,
      password: form.Password,
      store_number: storeNumber,
    };
    await employeeCreate(employeeData);
    setForm({
      Name: "",
      Number: "",
      Password: "",
    });
  };

  return (
    <div className="pt-20 h-screen dark:bg-black">
      <FadeIn delay={50}>
        <div className="text-center dark:text-white text-gray-500 font-bold mb-5 text-3xl">
          <h1>{storeName}:新規スタッフ登録</h1>
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
              placeholder="Name"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              validator={validateName}
              onValidChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={200}>
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
          <FadeIn delay={300}>
            <InputForm
              type={"password"}
              placeholder="Password"
              name="Password"
              value={form.Password}
              onChange={handleChange}
              validator={validatePassword}
              onValidChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={500}>
            <InputFormButton type={"submit"} ButtonName={"新規登録"} />
          </FadeIn>
        </form>
      </div>
      <div className="pt-3">
        <FadeIn delay={600}>
          <NavigateButton MoveTo={"戻る"} Path={`/manager/${storeNumber}`} />
        </FadeIn>
      </div>
    </div>
  );
};

export default EmployeeCreate;
