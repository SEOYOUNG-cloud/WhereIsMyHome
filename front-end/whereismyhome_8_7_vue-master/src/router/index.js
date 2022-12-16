import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
// import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: ["/home", "/"],
    name: "Home",
    component: HomeView,
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/MapView/MapView.vue"),
  },
  {
    path: "/board",
    name: "BoardMain",
    component: () => import("@/views/BoardView/BoardView"),
    children: [
      {
        path: "/notice",
        name: "boardList",
        component: () => import("@/views/BoardView/BoardList"),
      },
      {
        path: "/notice/view?no=:articleNo",
        name: "boardDetail",
        component: () => import("@/views/BoardView/BoardDetailView"),
      },
      {
        path: "/notice/write",
        name: "boardWrite",
        component: () => import("@/views/BoardView/BoardWriteView"),
      },
      {
        path: "/notice/modify?no=:articleNo",
        name: "boardModify",
        component: () => import("@/views/BoardView/BoardModifyView"),
      },
    ],
  },
  {
    path: "/info",
    name: "personal",
    component: () => import("@/views/PersonalView/PersonalView"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/PersonalView/LoginView"),
      },
      {
        path: "/join",
        name: "join",
        component: () => import("@/views/PersonalView/JoinView"),
      },
      {
        path: "/find",
        name: "find",
        component: () => import("@/views/PersonalView/FindView"),
      },
      {
        path: "/myInfo",
        name: "myInfo",
        component: () => import("@/views/PersonalView/PersonalInfoView"),
      },
      {
        path: "/myInfoModify",
        name: "myInfoModify",
        component: () => import("@/views/PersonalView/PersonalInfoModifyView"),
      },
      {
        path: "/mInterest",
        name: "myInterest",
        component: () => import("@/views/PersonalView/PersonalInterestView"),
      },
      {
        path: "/allUserInfo",
        name: "allUserInfo",
        component: () => import("@/views/AdminView/UserListView"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((/*이동하려는 라우트 정보*/ to, from, next) => {
//   console.log(to.path);
//   // 라우팅 시 해당 라우트가 책 관련 라우트이고
//   // 유저 정보를 갖고 있지 않다면
//   if (to.path.includes("map") || (to.path.includes("notice") && !store.state.userStore.loginInfo.id)) {
//     alert("로그인이 필요한 페이지입니다.");
//     router.push({ name: "login" });
//   }
//   //해당 라우트로 이동
//   next();
// });

export default router;
