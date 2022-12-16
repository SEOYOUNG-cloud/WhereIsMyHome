<template>
  <v-container style="position: relative" class="text-xs-center">
    <v-data-table :headers="headers" :items="userList" sort-by="userId" class="elevation-1">
      <template v-slot:top>
        <v-row justify="center" class="mb-10 mt-10"> <h2>전체 회원 관리</h2></v-row>
        <v-toolbar class="mt-10" flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#005085" dark class="mb-2 white--text" height="40px" v-bind="attrs" v-on="on">
                회원 추가
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.userName" label="user userName"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.userId" label="userId"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.userPwd" label="userPwd"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.emailId" label="email"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        prefix="@"
                        suffix=".com"
                        v-model="editedItem.emailDomain"
                        :items="domains"
                        item-text="name"
                        item-value="value"
                        label="Domain"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4"> </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">해당 회원을 삭제하시겠습니까?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data> </template>
      <template slot="item.manager" slot-scope="{ item }">
        <div v-if="flagIsMe(item)">
          <v-switch
            color="#005085"
            v-model="item.manager"
            true-value="T"
            false-value="F"
            disabled
            @click="grantManager(item)"
          ></v-switch>
        </div>
        <div v-else>
          <v-switch
            color="#005085"
            v-model="item.manager"
            true-value="T"
            false-value="F"
            @click="grantManager(item)"
          ></v-switch>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    manager: false,
    domains: [
      { name: "ssafy", value: "ssafy.com" },
      { name: "naver", value: "naver.com" },
      { name: "google", value: "google.com" },
      { name: "kakao", value: "kakao.com" },
    ],
    headers: [
      {
        text: "이름",
        align: "start",
        value: "userName",
      },
      { text: "아이디", value: "userId" },
      { text: "비밀번호", value: "userPwd" },
      { text: "이메일", value: "emailId" },
      { text: "도메인", value: "emailDomain" },
      { text: "관리자 권한", value: "manager", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    userList: [],
    editedIndex: -1,
    editedItem: {
      userName: "",
      userId: "",
      userPwd: "",
      emailId: "",
      emailDomain: "",
      manager: false,
    },
    defaultItem: {
      userName: "",
      userId: "",
      userPwd: "",
      emailId: "",
      emailDomain: "",
      manager: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "회원 추가" : "회원 수정";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    await this.$store.dispatch("userStore/allUserInfo");
    this.userList = this.$store.state.userStore.users;
  },

  methods: {
    flagIsMe(item) {
      if (item.userId == this.$store.state.userStore.loginInfo.id) {
        return true;
      } else {
        return false;
      }
    },
    grantManager(item) {
      this.$store.dispatch("userStore/grantManager", { id: item.userId, manager: item.manager });
    },
    editItem(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      console.log(this.editedItem.userId);
      this.userList.splice(this.editedIndex, 1);
      // 유저 삭제
      this.$store.dispatch("userStore/withdrawalUser", this.editedItem.userId);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // 수정 버튼 클릭 시
      if (this.editedIndex > -1) {
        Object.assign(this.userList[this.editedIndex], this.editedItem);
        this.$store.dispatch("userStore/modifyInfo", this.editedItem);
      } else {
        // 회원 추가 버튼 클릭 시
        this.userList.push(this.editedItem);
        this.$store.dispatch("userStore/join", this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
