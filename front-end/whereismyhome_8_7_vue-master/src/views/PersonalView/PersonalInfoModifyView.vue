<template>
  <v-col style="height: 60vh">
    <v-container
      style="margin: center; width: 600px; height: 60vh; display: flex; justify-content: center; align-items: center"
    >
      <v-card class="mx-auto mt-10" max-width="500" title="User Information">
        <v-row justify="center" class="mb-10 mt-3" style="margin-bottom: 0.5rem !important">
          <h2>회원정보 수정</h2></v-row
        >
        <v-container>
          <v-form class="mt-4" ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-text-field
                class="ml-5 mr-5"
                label="아이디"
                v-model="userInfo.userId"
                color="primary"
                variant="underlined"
                readonly
                filled
              ></v-text-field>
            </v-row>

            <v-row>
              <v-text-field
                class="ml-5 mr-5"
                label="비밀번호"
                v-model="userInfo.userPwd"
                :rules="pwdRules"
                required
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="ml-5 mr-5"
                v-model="userInfo.userName"
                label="이름"
                :counter="10"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="ml-5 mr-5"
                label="이메일"
                v-model="userInfo.emailId"
                :rules="emailRules"
                required
                outlined
              ></v-text-field>

              <v-select
                class="ml-5 mr-5"
                prefix="@"
                suffix=".com"
                label="도메인"
                v-model="userInfo.emailDomain"
                :items="domains"
                item-text="name"
                item-value="value"
                :rules="[(v) => !!v || 'domain is required']"
                required
                outlined
              ></v-select>
            </v-row>
          </v-form>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :disabled="!valid" color="#005085" class="white--text" height="50px" width="5pc" @click="modify">
            수정
          </v-btn>
          <v-btn
            class="white--text"
            color="#005085"
            height="50px"
            width="5pc"
            @click="$router.push({ name: 'myInfo' }).catch(() => {})"
          >
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      pwdRules: [(v) => !!v || "PASSWORD is required"],
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [(v) => !!v || "E-mail is required"],
      select: "",
      domains: [
        { name: "ssafy", value: "ssafy.com" },
        { name: "naver", value: "naver.com" },
        { name: "google", value: "google.com" },
        { name: "kakao", value: "kakao.com" },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
  methods: {
    modify() {
      this.$store.dispatch("userStore/modifyInfo", this.$store.state.userStore.userInfo);
      this.$router.back();
    },
  },
};
</script>

<style></style>
