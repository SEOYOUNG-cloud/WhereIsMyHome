<template>
  <v-col>
    <v-container
      style="margin: center; width: 600px; height: 60vh; display: flex; justify-content: center; align-items: center"
    >
      <v-card max-width="100%">
        <v-tabs class="mb-5" v-model="tab" background-color="#005085" centered dark icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1" style="margin: 0; width: 50%"> 아이디 찾기 </v-tab>

          <v-tab href="#tab-2" style="margin: 0; width: 50%"> 비밀번호 찾기 </v-tab>
        </v-tabs>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 lighten-2"> Information </v-card-title>
            <v-divider></v-divider>
            <v-col v-if="conf">
              <h4 class="ml-3 mt-2">아이디 : {{ this.id }}</h4>
            </v-col>
            <v-col v-else>
              <h4 class="ml-3 mt-2">비밀번호 : {{ this.pwd }}</h4>
            </v-col>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="white--text mt-3" color="#005085" @click="closeDialog"> 확인 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
            <v-card v-if="i === 1" flat>
              <v-text-field
                class="mt-10"
                v-model="findInfo.userName"
                :counter="10"
                label="Name"
                required
                outlined
              ></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="findInfo.emailId" label="E-mail" required outlined></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    prefix="@"
                    suffix=".com"
                    v-model="findInfo.emailDomain"
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
              <v-btn color="#005085" class="mt-5 white--text" @click="findId" height="50px" block> 아이디 찾기 </v-btn>
            </v-card>
            <v-card v-else flat>
              <v-text-field class="mt-10" v-model="findInfo.userId" label="ID" required outlined></v-text-field>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="findInfo.emailId" label="E-mail" required outlined></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    prefix="@"
                    suffix=".com"
                    v-model="findInfo.emailDomain"
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
              <v-btn color="#005085" class="mt-5 white--text" @click="findPwd" height="50px" block>
                비밀번호 찾기
              </v-btn>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      id: "",
      pwd: "",
      conf: false,
      findInfo: {},
      tab: null,
      domains: [
        { name: "ssafy", value: "ssafy.com" },
        { name: "naver", value: "naver.com" },
        { name: "google", value: "google.com" },
        { name: "kakao", value: "kakao.com" },
      ],
    };
  },
  methods: {
    async findId() {
      // 아이디 찾기
      try {
        await this.$store.dispatch("userStore/findId", this.findInfo);
        this.id = this.$store.state.userStore.userId;
        this.conf = true;
        this.dialog = true;
      } catch (error) {
        alert("일치하는 아이디가 존재하지 않습니다.");
      }
    },
    async findPwd() {
      // 비밀번호 찾기
      try {
        await this.$store.dispatch("userStore/findPwd", this.findInfo);
        this.pwd = this.$store.state.userStore.userPwd;
        this.dialog = true;
      } catch (error) {
        alert("일치하는 비밀번호가 존재하지 않습니다.");
      }
    },
    closeDialog() {
      this.dialog = false;
      this.conf = false;
    },
  },
};
</script>

<style></style>
