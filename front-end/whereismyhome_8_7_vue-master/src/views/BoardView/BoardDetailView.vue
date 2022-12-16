<template>
  <v-container style="position: relative" class="text-xs-center">
    <v-card style="height: auto" class="mx-auto" outlined>
      <v-card-text>
        <p class="mt-5">작성자 | {{ board.userName }}</p>
        <p class="text-h4 text--primary mb-5">{{ board.subject }}</p>
        <v-divider />
        <div class="tiptap-vuetify-editor__content text-xs-center mt-5 text--primary" v-html="board.content" />
      </v-card-text>
      <v-col>
        <v-card-actions>
          <v-btn
            class="white--text"
            color="#005085"
            height="45px"
            @click="$router.push({ name: 'boardList' }).catch(() => {})"
          >
            목록
          </v-btn>
          <v-btn class="white--text" color="#005085" v-if="writer" height="45px" @click="goModifyPageBtn"> 수정 </v-btn>
          <v-btn class="white--text" color="#005085" v-if="writer" height="45px" @click="clickDeleteBtn"> 삭제 </v-btn>
        </v-card-actions></v-col
      >
    </v-card></v-container
  >
</template>

<script>
export default {
  created() {
    this.board = this.$store.state.boardStore.boardDetail;
    if (
      // 매니저이거나 작성자일 경우 글 수정/삭제 가능
      this.board.userId === this.$store.state.userStore.loginInfo.id ||
      this.$store.state.userStore.loginInfo.manager === "T"
    )
      this.writer = true;
  },
  data() {
    return {
      board: {},
      writer: false,
    };
  },
  methods: {
    goModifyPageBtn() {
      this.$router.push({ name: "boardModify" }).catch(() => {});
    },
    clickDeleteBtn() {
      let flag = confirm("해당 글을 삭제하시겠습니까?");
      if (flag) {
        this.$store.dispatch("boardStore/boardDelete", this.board.articleNo);
        alert("삭제되었습니다.");
        this.$router.push({ name: "boardList" }).catch(() => {});
      }
    },
  },
};
</script>

<style></style>
