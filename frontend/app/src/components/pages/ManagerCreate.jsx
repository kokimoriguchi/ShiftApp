import { useManagerCreate } from "../hooks/ManagerCreateHook";
import { useState } from "react";

import HandleCreateFormPage from "../hooks/CreateFormPage";
import NavigateButton from "../hooks/NavigateButton";

const ManagerCreate = () => {
  const [form, setForm] = useState({
    employeeName: "",
    employeeNumber: "",
    employeePassword: "",
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
      name: form.employeeName,
      number: form.employeeNumber,
      password: form.employeePassword,
      store_number: form.storeNumber,
    };
    await managerCreate(employeeData);
    setForm({
      employeeName: "",
      employeeNumber: "",
      employeePassword: "",
      storeNumber: "",
    });
  };

  return (
    <div className="pt-10">
      <HandleCreateFormPage
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="New Manager"
      />
      <NavigateButton MoveTo={"Login as Manager"} Path={"manager/login"} />
    </div>
  );
};

export default ManagerCreate;
