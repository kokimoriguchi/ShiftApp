import { useState } from "react";
import { useManagerCreate } from "../hooks/ManagerCreateHook";
import { FadeIn } from "../hooks/FadeInHook";
import InputForm from "../hooks/InputForm";
import NavigateButton from "../hooks/NavigateButton";
import InputFormButton from "../hooks/InputFromButton";

const ManagerCreate = () => {
  const [form, setForm] = useState({
    Name: "",
    Number: "",
    Password: "",
    storeNumber: "",
  });
  const managerCreate = useManagerCreate();

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
    await managerCreate(employeeData);
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
        <div className="text-center text-gray-500 font-bold mb-5 text-3xl">
          <h1>新店舗マネージャー登録</h1>
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
            <InputFormButton type={"submit"} ButtonName={"登録"} />
          </FadeIn>
        </form>
      </div>
      <div>
        <FadeIn delay={600}>
          <NavigateButton
            MoveTo={"マネージャーログイン"}
            Path={"manager/login"}
          />
          <NavigateButton MoveTo={"戻る"} Path={"/"} />
        </FadeIn>
      </div>
    </div>
  );
};

export default ManagerCreate;
