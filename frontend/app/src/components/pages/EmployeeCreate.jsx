import { useState } from "react";
import { useEmployeeCreate } from "../hooks/EmployeeCreateHook";
import HandleCreateFormPage from "../hooks/CreateFormPage";
import NavigateButton from "../hooks/NavigateButton";

const EmployeeCreate = () => {
  const [form, setForm] = useState({
    employeeName: "",
    employeeNumber: "",
    employeePassword: "",
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
      name: form.employeeName,
      number: form.employeeNumber,
      password: form.employeePassword,
      store_number: form.storeNumber,
    };
    await employeeCreate(employeeData);
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
        title="New Employee"
      />
      <NavigateButton MoveTo={"Login"} Path={"/login"} />
    </div>
  );
};

export default EmployeeCreate;
