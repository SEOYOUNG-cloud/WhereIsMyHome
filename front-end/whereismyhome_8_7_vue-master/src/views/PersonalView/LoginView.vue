<template>
  <v-col>
    <v-container
      style="margin: center; width: 1000px; height: 60vh; display: flex; justify-content: center; align-items: center"
    >
      <v-form ref="form" style="width: 50%">
        <v-row justify="center" class="mb-10 mt-3"> <h2>LOGIN</h2></v-row>
        <v-text-field
          v-model="loginInfo.id"
          prepend-inner-icon="mdi-account"
          name="id"
          label="아이디"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="loginInfo.pwd"
          name="pwd"
          label="비밀번호"
          prepend-inner-icon="mdi-lock"
          :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
          required
          outlined
        ></v-text-field>
        <v-btn color="#005085" class="mb white--text" @click="login" height="50px" block> 로그인 </v-btn>
        <br />
        <v-row justify="center">
          <v-btn text color="#005085" @click="join"> 회원가입 | </v-btn>
          <v-btn text color="#005085" @click="find"> 아이디/비밀번호 찾기 </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      value: String,
      loginInfo: {},
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("userStore/login", this.loginInfo);
        this.$router.push({ name: "Home" }).catch(() => {});
      } catch (error) {
        alert("아이디 혹은 비밀번호를 확인하세요");
      }
    },
    find() {
      this.$router.push({ name: "find" }).catch(() => {});
    },
    join() {
      this.$router.push({ name: "join" }).catch(() => {});
    },
  },
};
</script>

<style></style>
