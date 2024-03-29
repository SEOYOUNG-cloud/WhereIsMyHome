import axios from "axios";
import store from "@/store";

let instance = axios.create({
  baseURL: "http://localhost:9000/",
});

// axios 요청 보내기 전 인터셉트
instance.interceptors.request.use((config) => {
  // config : 요청 정보를 담은 객체
  // 헤더에 access-token 추가
  config.headers["access-token"] = store.state.userStore.token;
  return config;
});

export default instance;
