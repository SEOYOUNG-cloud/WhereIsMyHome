<template>
  <v-app id="App">
    <v-app-bar id="header" color="#FFFFFF" height="100px">
      <v-row style="margin-left: 200px; margin-right: 200px">
        <v-toolbar-title style="cursor: pointer" @click="$router.push({ name: 'Home' }).catch(() => {})">
          <v-img :src="require('@/assets/Live_logo.jpg')" height="60" width="60" contain></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row style="display: flex; justify-content: center; align-items: center">
          <v-btn
            style="
              font-weight: bold;
              font-family: Nanum Gothic Coding;
              background: none;
              border: 0px;
              box-shadow: none;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.2rem;
            "
            :to="{ name: 'Map' }"
            >매물</v-btn
          >
          <v-btn
            text
            :to="{ name: 'boardList' }"
            style="
              font-weight: bold;
              font-family: Nanum Gothic Coding;
              background: none;
              border: 0px;
              box-shadow: none;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.2rem;
            "
            >공지사항</v-btn
          >
        </v-row>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="isLoginBoxShow">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="black" v-bind="attrs" v-on="on">
              <v-icon>mdi-account-outline</v-icon>
            </v-btn>
          </template>
          <v-list flat>
            <v-list-item-group v-model="selectedItem" color="prim">
              <v-list-item v-for="(item, i) in loginItems" :key="i" @click="loginMenuAction(item.action)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <v-menu offset-y v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="black" v-bind="attrs" v-on="on"><v-icon>mdi-account</v-icon></v-btn>
          </template>
          <v-list v-if="isManager" flat>
            <v-list-item-group v-model="selectedItem" color="black">
              <v-list-item v-for="(item, i) in ManagerItems" :key="i" @click="myMenuAction(item.action)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-list v-else flat>
            <v-list-item-group v-model="selectedItem" color="black">
              <v-list-item v-for="(item, i) in MyItems" :key="i" @click="myMenuAction(item.action)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  created() {
    console.log(this.$store.state.userStore.loginInfo);
  },
  data: function () {
    return {
      selectedItem: "",
      loginItems: [
        { text: "로그인", icon: "mdi-login", action: "login" },
        { text: "회원가입", icon: "mdi-account-plus", action: "join" },
        { text: "아이디 찾기", icon: "mdi-file-find", action: "find" },
      ],
      MyItems: [
        { text: "로그아웃", icon: "mdi-logout-variant", action: "logout" },
        { text: "회원정보", icon: "mdi-account-multiple", action: "myInfo" },
        { text: "관심지역", icon: "mdi-flag", action: "myInterest" },
      ],
      ManagerItems: [
        { text: "로그아웃", icon: "mdi-logout-variant", action: "logout" },
        { text: "내정보", icon: "mdi-account-edit", action: "myInfo" },
        {
          text: "회원정보",
          icon: "mdi-account-multiple",
          action: "allUserInfo",
        },
        { text: "관심지역", icon: "mdi-flag", action: "myInterest" },
      ],
    };
  },
  methods: {
    loginMenuAction(action) {
      if (action === "login") {
        this.$router.push({ name: "login" }).catch(() => {});
      } else if (action === "join") {
        this.$router.push({ name: "join" }).catch(() => {});
      } else if (action === "find") {
        this.$router.push({ name: "find" }).catch(() => {});
      }
    },
    myMenuAction(action) {
      if (action === "logout") {
        this.logout();
      } else if (action === "myInfo") {
        this.$router.push({ name: "myInfo" }).catch(() => {});
      } else if (action === "myInterest") {
        this.$router.push({ name: "myInterest" }).catch(() => {});
      } else if (action === "allUserInfo") {
        this.$router.push({ name: "allUserInfo" }).catch(() => {});
      }
    },
    async logout() {
      await this.$store.dispatch("userStore/logout");
      this.$router.push("/home").catch(() => {}); //홈 화면 이동
    },
  },
  computed: {
    isLoginBoxShow() {
      return this.$store.state.userStore.loginInfo.id ? false : true;
    },
    isManager() {
      return this.$store.state.userStore.loginInfo.manager === "F" ? false : true;
    },
  },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/font-nanum/1.0/nanumgothiccoding/nanumgothiccoding.css");

::v-deep .v-application--wrap {
  min-height: fit-content;
}
* {
  font-family: Nanum Gothic Coding;
}
</style>
