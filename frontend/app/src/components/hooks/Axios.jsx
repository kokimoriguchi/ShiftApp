import axios from "axios";

// nginxへのURLを定数
// const BASE_URL = "http://localhost/api/v1/";
const BASE_URL = "https://api.realworld-demo.com/api/v1/";

// axios.create()メソッドを使用して、デフォルトのaxiosインスタンスを作成
export default axios.create({ baseURL: BASE_URL, withCredentials: true });
