<template>
  <v-col>
    <v-container
      style="margin: center; width: 600px; height: 60vh; display: flex; justify-content: center; align-items: center"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center" class="mb-10 mt-3"> <h2>JOIN</h2></v-row>
        <v-text-field
          v-model="joinInfo.userId"
          :rules="idRules"
          label="아이디"
          prepend-inner-icon="mdi-account"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="joinInfo.userPwd"
          :rules="pwdRules"
          label="비밀번호"
          prepend-inner-icon="mdi-lock"
          required
          outlined
        >
        </v-text-field>

        <v-text-field
          v-model="joinInfo.userName"
          :counter="10"
          :rules="nameRules"
          label="이름"
          prepend-inner-icon="mdi-rename-box"
          required
          outlined
        ></v-text-field>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="joinInfo.emailId"
              :rules="emailRules"
              label="E-mail"
              prepend-inner-icon="mdi-email"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              prefix="@"
              suffix=".com"
              v-model="joinInfo.emailDomain"
              :items="domains"
              item-text="name"
              item-value="value"
              :rules="[(v) => !!v || 'domain is required']"
              label="Domain"
              required
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-dialog v-model="dialog" persistent max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-checkbox v-model="checkbox" :rules="[(v) => !!v]" class="ml-3" required></v-checkbox>
              <h4 text color="#005085" dark v-bind="attrs" v-on="on" style="margin: 20px">이용약관 확인</h4>
            </template>
            <v-card>
              <v-card-title class="text-h5" style="color: black">
                개인정보의 수집 및 이용에 대한 동의 (필수)
              </v-card-title>
              <v-card-text>
                <br />
                <h2 style="color: #005085">1. 수집하는 개인정보 항목</h2>
                <br />
                <h3>
                  리브 이용자 참여와 이용통계 분석 등의 서비스를 위해 회원 가입시 아래의 개인정보를 수집하고 있습니다.
                </h3>
                <h3>가. 필수정보: 아이디, 이름, 비밀번호, 이메일</h3>
                <h3>나. 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.</h3>
                <h3>(접속로그, 접속IP정보, 쿠키, 방문 일시, 서비스 이용기록, 불량 이용 기록)</h3>
                <br />
                <h2 style="color: #005085">
                  2. 이용자 회원가입 시 직접 개인정보를 입력 및 수정하여 개인정보를 수집합니다.
                </h2>
                <br />
                <h2 style="color: #005085">3. 수집 개인정보의 이용목적</h2>
                <br />
                <h3>· 회원가입, 회원활동 실적 관리, 회원탈퇴 의사 확인 등 회원관리</h3>
                <h3>
                  · 제공되는 서비스 이용에 관한 인구통계학적 분석, 서비스 방문 및 이용기록 분석, 관심사에 기반한 맞춤형
                  서비스 등 제공
                </h3>
                <h3>· 향후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달 등</h3>
                <br />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#005085" text @click="dialog = false"> 취소 </v-btn>
                <v-btn color="#005085" text @click="(dialog = false), (checkbox = true)"> 동의합니다. </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          required
        ></v-checkbox> -->

        <v-btn :disabled="!valid" color="#005085" class="mr-4 white--text" @click="validate" height="50px" block>
          회원가입
        </v-btn>
      </v-form>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    joinInfo: {},
    valid: true,
    idRules: [(v) => !!v || "ID is required"],
    pwdRules: [(v) => !!v || "PASSWORD is required"],
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [(v) => !!v || "E-mail is required"],
    select: null,
    domains: [
      { name: "ssafy", value: "ssafy.com" },
      { name: "naver", value: "naver.com" },
      { name: "google", value: "google.com" },
      { name: "kakao", value: "kakao.com" },
    ],

    checkbox: false,
  }),

  methods: {
    async validate() {
      this.$refs.form.validate();
      if (!this.$refs.form.validate()) {
        console.log(this.joinInfo);
        try {
          await this.$store.dispatch("userStore/join", this.joinInfo);
          this.$router.push({ name: "login" }).catch(() => {});
        } catch (error) {
          console.log(error);
          alert("모든 항목을 입력해주세요!");
        }
      }
    },
  },
};
</script>

<style></style>
