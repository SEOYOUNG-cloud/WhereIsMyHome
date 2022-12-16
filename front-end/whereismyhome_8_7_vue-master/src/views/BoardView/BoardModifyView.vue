<template>
  <v-container style="position: relative" class="text-xs-center">
    <div>
      <h2 class="mb-10 mt-5">공지사항 수정</h2>
      <div v-if="manager" style="width: 200px">
        <v-select v-model="board.bullet" :items="['공지', '일반']" required></v-select>
      </div>
      <v-text-field v-model="board.subject" solo label="제목을 입력하세요." clearable></v-text-field>
      <div style="height: 600px">
        <tiptap-vuetify
          class="ttvue"
          v-model="board.content"
          :extensions="extensions"
          placeholder="타인에 대한 비방이나 욕설, 광고 등 게시판의 목적과 관련 없는 내용은 삭제될 수 있습니다."
        />
        <v-btn
          color="#005085"
          class="mt-5 white--text"
          height="40px"
          style="float: right"
          @click="$router.push({ name: 'boardDetail' })"
        >
          취소
        </v-btn>
        <v-btn color="#005085" class="mt-5 mr-3 white--text" height="40px" style="float: right" @click="clickModifyBtn">
          수정
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  created() {
    // 관리자만 공지 쓰기 가능
    if (this.$store.state.userStore.loginInfo.manager === "T") this.manager = true;
    this.board.userId = this.$store.state.userStore.loginInfo.id;
  },
  components: { TiptapVuetify },
  data: () => ({
    manager: false,
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
  methods: {
    async clickModifyBtn() {
      let flag = confirm("수정하시겠습니까?");
      if (flag) {
        await this.$store.dispatch("boardStore/boardModify", this.board);
        this.$router.push({ name: "boardDetail" }).catch(() => {});
      }
    },
  },
  computed: {
    board() {
      return this.$store.state.boardStore.boardDetail;
    },
  },
};
</script>

<style scoped>
::v-deep .tiptap-vuetify-editor__content {
  height: 400px;
  max-height: 400px;
}
</style>
