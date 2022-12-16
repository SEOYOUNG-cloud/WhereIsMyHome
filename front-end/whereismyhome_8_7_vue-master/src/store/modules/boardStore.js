import http from "@/util/http";
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

const boardStore = {
  namespaced: true,
  state: () => ({
    boardList: [],
    boardDetail: {},
  }),
  getters: {},
  mutations: {
    GET_BOARDLIST(state, payload) {
      state.boardList = payload;
    },
    GET_BOARDDETAIL(state, payload) {
      state.boardDetail = payload;
    },
  },
  actions: {
    async getBoardList({ commit }) {
      try {
        let { data } = await http.get("/board");
        if (!validCheck(data)) {
          return;
        }
        commit("GET_BOARDLIST", data);
      } catch (error) {
        console.log(error);
      }
    },
    async getBoardDetail({ commit }, articleNo) {
      try {
        let { data } = await http.get("/board/" + articleNo);
        if (!validCheck(data)) return;

        console.log(data);
        commit("GET_BOARDDETAIL", data);
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    async writeBoard({ commit }, board) {
      try {
        let { data } = await http.post("/board/write", board);
        validCheck(data);
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    async boardDelete({ commit }, articleNo) {
      try {
        let { data } = await http.delete("/board/delete/" + articleNo);
        validCheck(data);
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    async boardModify({ commit }, board) {
      try {
        let { data } = await http.put("/board/modify/" + board.articleNo, board);
        validCheck(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default boardStore;
