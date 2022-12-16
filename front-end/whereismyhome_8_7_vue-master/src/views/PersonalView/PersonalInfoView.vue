<template>
  <v-col style="height: 60vh">
    <v-container
      style="margin: center; width: 600px; height: 60vh; display: flex; justify-content: center; align-items: center"
    >
      <v-card class="mx-auto mt-10" max-width="500" title="User Information">
        <v-row justify="center" class="mb-10 mt-3" style="margin-bottom: 0.5rem !important"> <h2>회원정보</h2></v-row>
        <v-container>
          <v-row>
            <v-text-field
              class="ml-5 mr-5 mt-4"
              v-model="userInfo.userId"
              color="primary"
              label="아이디"
              variant="underlined"
              readonly
              filled
            ></v-text-field>
          </v-row>

          <v-row>
            <v-text-field
              class="ml-5 mr-5"
              v-model="userInfo.userPwd"
              color="primary"
              label="비밀번호"
              variant="underlined"
              readonly
              filled
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              class="ml-5 mr-5"
              v-model="userInfo.userName"
              color="primary"
              label="이름"
              variant="underlined"
              readonly
              filled
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              class="ml-5 mr-5"
              v-model="userInfo.emailId"
              color="primary"
              label="이메일"
              variant="underlined"
              readonly
              filled
            ></v-text-field>

            <v-text-field
              class="ml-5 mr-5"
              v-model="userInfo.emailDomain"
              color="primary"
              variant="underlined"
              label="도메인"
              prefix="@"
              readonly
              filled
            ></v-text-field>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="white--text" color="#005085" @click="modify" height="50px" width="5pc"> 수정 </v-btn>
          <v-btn class="white--text" color="#005085" @click="withdrawal" height="50px" width="5pc"> 탈퇴 </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
  async created() {
    console.log(this.loginInfo);
    await this.$store.dispatch("userStore/getUserInfo", this.loginInfo.id);
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("userStore", ["userInfo", "loginInfo"]),
  },
  methods: {
    modify() {
      this.$router.push({ name: "myInfoModify" }).catch(() => {});
    },
    withdrawal() {
      let flag = confirm("정말 탈퇴하시겠습니까?");
      if (flag) {
        this.$store.dispatch("userStore/withdrawalUser", this.loginInfo.id);
        this.$store.dispatch("userStore/logout");
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style></style>
