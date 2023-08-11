import { useStoreCreate } from "../hooks/StoreCreateHook";
import { FadeIn } from "../hooks/FadeInHook";
import InputForm from "../hooks/InputForm";
import NavigateButton from "../hooks/NavigateButton";
import InputFormButton from "../hooks/InputFromButton";
import { useState } from "react";
import { validateNumber, validateName } from "../hooks/Validators";

const StoreCreate = () => {
  const [form, setForm] = useState({
    Name: "",
    Number: "",
  });
  const storeCreate = useStoreCreate();

  const [formValid, setFormValid] = useState({
    Name: false,
    Number: false,
  });

  //validateが通った場合にstateを更新する。
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidChange = (e) => {
    setFormValid({
      ...formValid,
      [e.target.name]: true,
    });
  };

  //formボタンで送信すると下記の関数呼び出してその後stateを空にする。
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid.Name || !formValid.Number) {
      return; // 無効な入力値がある場合、処理を中止
    }
    //ランダムなパスワードを生成する
    const randomPassword = Math.random().toString(36).slice(-8);

    const storeData = {
      name: form.Name,
      number: form.Number,
      password: randomPassword,
    };
    await storeCreate(storeData);
    setForm({
      Name: "",
      Number: "",
    });
    setFormValid({
      Name: false,
      Number: false,
    });
  };

  return (
    <div className="sm:pt-32 pt-24 h-auto min-h-[430px] sm:min-h-[650px] bg-sky-100 dark:bg-black">
      <FadeIn delay={50}>
        <div className="text-center dark:text-white text-gray-500 font-bold mb-5 text-3xl">
          <h1>新規店舗登録</h1>
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
              onValidChange={handleValidChange}
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
              onValidChange={handleValidChange}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <InputFormButton
              type={formValid.Name && formValid.Number ? "submit" : "button"}
              ButtonName={"新規作成"}
              isValid={formValid.Name && formValid.Number ? true : false}
            />
          </FadeIn>
        </form>
      </div>
      <div className="pt-8">
        <FadeIn delay={400}>
          <NavigateButton MoveTo={"スタッフログイン"} Path={"/login"} />
          <NavigateButton MoveTo={"戻る"} Path={"/"} />
        </FadeIn>
      </div>
    </div>
  );
};
export default StoreCreate;
