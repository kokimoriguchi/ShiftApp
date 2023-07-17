import { useState } from "react";
import { useEmployeeCreate } from "../hooks/EmployeeCreateHook";
import { FadeIn } from "../hooks/FadeInHook";
import InputForm from "../hooks/InputForm";
import NavigateButton from "../hooks/NavigateButton";
import InputFormButton from "../hooks/InputFromButton";

const EmployeeCreate = () => {
  const [form, setForm] = useState({
    Name: "",
    Number: "",
    Password: "",
    storeNumber: "",
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
      store_number: form.storeNumber,
    };
    await employeeCreate(employeeData);
    setForm({
      Name: "",
      Number: "",
      Password: "",
      storeNumber: "",
    });
  };

  return (
    <div className="pt-20 h-screen dark:bg-black">
      <FadeIn delay={50}>
        <div className="text-center dark:text-white text-gray-500 font-bold mb-5 text-3xl">
          <h1>スタッフ新規作成</h1>
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
            />
          </FadeIn>
          <FadeIn delay={200}>
            <InputForm
              type={"text"}
              placeholder="Number"
              name="Number"
              value={form.Number}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <InputForm
              type={"password"}
              placeholder="Password"
              name="Password"
              value={form.Password}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={400}>
            <InputForm
              type={"text"}
              placeholder="StoreNumber"
              name="storeNumber"
              value={form.storeNumber}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={500}>
            <InputFormButton type={"submit"} ButtonName={"新規作成"} />
          </FadeIn>
        </form>
      </div>
      <div className="pt-3">
        <FadeIn delay={600}>
          <NavigateButton MoveTo={"スタッフログイン"} Path={"/login"} />
          <NavigateButton MoveTo={"戻る"} Path={"/"} />
        </FadeIn>
      </div>
    </div>
  );
};

export default EmployeeCreate;
