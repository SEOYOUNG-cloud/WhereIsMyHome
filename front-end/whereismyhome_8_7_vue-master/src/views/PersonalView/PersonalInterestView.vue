<template>
  <div>
    <v-container style="position: relative" class="text-xs-center">
      <v-data-table :headers="headers" :items="interests" class="elevation-1">
        <template v-slot:top>
          <v-row justify="center" class="mb-5 mt-10"> <h2>관심 지역</h2></v-row>
          <v-toolbar flat>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">해당 지역을 삭제할까요?</v-card-title>
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
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "아파트 이름", value: "apartmentName" },
      { text: "건축년도", value: "buildYear" },
      { text: "지번", value: "jibun" },
      { text: "법정동", value: "dong" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    interests: [],
    editedIndex: -1,
    editedItem: {
      apartmentName: 0,
      buildYear: 0,
      jibun: 0,
      dong: 0,
    },
    defaultItem: {
      apartmentName: 0,
      buildYear: 0,
      jibun: 0,
      dong: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    await this.$store.dispatch("userStore/MyInterest", this.$store.state.userStore.loginInfo.id);
    this.interests = this.$store.state.userStore.myInterest;
  },

  methods: {
    // Delete 아이콘 클릭 시
    deleteItem(item) {
      console.log("해당 관심지역 삭제");
      this.editedIndex = this.interests.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // Dialog 창에서 삭제 버튼 클릭 시
    deleteItemConfirm() {
      this.interests.splice(this.editedIndex, 1);
      this.$store.dispatch("userStore/DeleteMyInterest", {
        id: this.$store.state.userStore.loginInfo.id,
        aptCode: this.editedItem.aptCode,
      });
      this.closeDelete();
    },

    // Dialog 창에서 Delete 버튼 클릭 시
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style></style>
