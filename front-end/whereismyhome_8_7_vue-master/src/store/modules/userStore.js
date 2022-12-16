import http from "@/util/http";
// import { HttpStatusCode } from "axios";
import jwt_decode from "jwt-decode";
import router from "@/router";
import store from "@/store";
let validCheck = function (data) {
  if (data == "not Login") {
    alert("로그인 해주세요.");
    router.push({ name: "login" });
    return false;
  } else if (data == "not Valid") {
    alert("유효하지 않은 토큰입니다.");
    store.dispatch("userStore/logout");
    router.push({ name: "login" });
    return false;
  }
  return true;
};

const userStore = {
  namespaced: true,
  state: () => ({
    token: {},
    loginInfo: {}, //로그인한 유저 정보
    userInfo: {},
    users: [],
    userId: "",
    userPwd: "",
    myInterest: [],
  }),
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
    SET_USER_INFO(state, payload) {
      state.loginInfo = payload;
    },
    SET_USER(state, payload) {
      state.joinInfo = payload;
    },
    GET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    GET_ALL_USER_INFO(state, payload) {
      state.users = payload;
    },
    FIND_ID(state, payload) {
      state.userId = payload;
    },
    FIND_PWD(state, payload) {
      state.userPwd = payload;
    },
    MY_INTEREST(state, payload) {
      state.myInterest = payload;
    },
  },
  actions: {
    async login({ commit }, loginInfo) {
      console.log(commit);
      let { data } = await http.post("/users/login", loginInfo);

      let token = data.token;
      console.log("발급받은 토큰: ", token);

      // userStore에 토큰 정보 저장
      commit("SET_TOKEN", { token });

      let decodedToken = jwt_decode(token);
      console.log("토큰 정보: ", decodedToken);

      // vuex에 userInfo 정보 세팅
      const { id, pwd, manager } = decodedToken;
      commit("SET_USER_INFO", { id, pwd, manager });
    },
    logout({ commit }) {
      // 저장해놓은 토큰과 userInfo만 지우면 됨

      //userStore에 token 정보 지우기
      commit("SET_TOKEN", { token: null });

      // vuex store의 유저 정보 비우기
      commit("SET_USER_INFO", {});
      commit("GET_USER_INFO", {});
    },
    // eslint-disable-next-line
    async join({ commit }, joinInfo) {
      console.log("유저정보: ", joinInfo);
      let { data } = await http.post("/users/join", joinInfo);
      console.log(data);
    },
    async getUserInfo({ commit }, userId) {
      try {
        let { data } = await http.get("/users/confirm/" + userId);
        if (!validCheck(data)) return;
        console.log("setUserInfo: ", data);
        commit("GET_USER_INFO", data);
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    async modifyInfo({ commit }, userInfo) {
      try {
        // console.log(commit);
        let { data } = await http.put("/users/update", userInfo);
        validCheck(data);
      } catch (error) {
        console.log(error);
      }
    },

    // eslint-disable-next-line
    async withdrawalUser({ commit }, id) {
      try {
        let { data } = await http.delete("/users/" + id);
        validCheck(data);
      } catch (error) {
        console.log(error);
      }
    },

    // 모든 유저 정보 가져오기
    async allUserInfo({ commit }) {
      try {
        let { data } = await http.get("/admin");
        if (!validCheck(data)) return;
        console.log("모든 유저 정보 ", data);
        commit("GET_ALL_USER_INFO", data);
      } catch (error) {
        alert("유저 정보를 얻어오는 것에서 에러 발생!");
        console.log(error);
      }
    },
    // admin: 관리자 권한 변경
    // eslint-disable-next-line
    async grantManager({ commit }, { id, manager }) {
      try {
        let { data } = await http.put("/admin/" + id + "/" + manager);
        validCheck(data);
      } catch (error) {
        console.log(error);
      }
    },
    // 아이디 찾기
    // eslint-disable-next-line
    async findId({ commit }, user) {
      let { data } = await http.post("/users/find-id", user);
      commit("FIND_ID", data);
    },
    // 비밀번호 찾기
    // eslint-disable-next-line
    async findPwd({ commit }, user) {
      let { data } = await http.post("/users/find-pwd", user);
      commit("FIND_PWD", data);
    },

    // 개인 관심매물 확인
    // eslint-disable-next-line
    async MyInterest({ commit }, id) {
      let { data } = await http.get("/apts/ck/" + id);
      if (!validCheck(data)) return;
      commit("MY_INTEREST", data);
    },

    // 개인 관심매물 삭제
    // eslint-disable-next-line
    async DeleteMyInterest({ commit }, { id, aptCode }) {
      let { data } = await http.delete("/apts/ck/" + id + "/" + aptCode);
      validCheck(data);
    },
  },
};

export default userStore;
