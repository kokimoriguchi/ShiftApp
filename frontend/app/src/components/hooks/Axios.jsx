import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// axios.create()メソッドを使用して、デフォルトのaxiosインスタンスを作成
export default axios.create({ baseURL: BASE_URL, withCredentials: true });
