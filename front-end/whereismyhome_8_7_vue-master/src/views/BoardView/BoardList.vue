<template>
  <v-container style="position: relative" class="text-xs-center">
    <v-card flat>
      <v-row justify="center" class="mt-10"> <h2>공지사항</h2></v-row>
      <v-spacer></v-spacer>
      <v-col class="mb-10">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          style="float: right"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-btn
        class="mt-10 ml-3 mb-5 white--text"
        color="#005085"
        @click="$router.push({ name: 'boardWrite' }).catch(() => {})"
      >
        글쓰기
      </v-btn>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="displayItems"
              :search="search"
              @click:row="clickRow"
              hide-default-footer
            >
            </v-data-table>
          </v-col>
        </v-row>
        <div class="table-footer text-center pt-2 mt-10 mb-10">
          <v-pagination
            color="#005085"
            v-model="page"
            class="ml-4"
            :length="pageCount"
            @input="pageChange"
          ></v-pagination>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("boardStore/getBoardList");
    this.boardAllList = this.$store.state.boardStore.boardList;
    if (Array.isArray(this.boardAllList)) {
      this.displayItems = this.boardAllList.slice(0, this.pageSize);
      this.totalCount = this.boardAllList.length;
      this.pageCount = Math.ceil(this.boardAllList.length / this.pageSize);
    }
  },
  data() {
    return {
      page: 1,
      pageCount: 1,
      pageSize: 5,
      search: "",
      headers: [
        { text: "no", value: "articleNo", sortable: false },
        { text: "분류", value: "bullet", sortable: false },
        { text: "제목", value: "subject", sortable: false },
        { text: "등록일", value: "registerTime", sortable: false },
      ],
      displayItems: [],
      boardAllList: [],
    };
  },
  methods: {
    async clickRow(value) {
      console.log(value.articleNo);
      // vuex에 boardDetail 정보 넣어놓기
      await this.$store.dispatch("boardStore/getBoardDetail", value.articleNo);
      // BoardListView로 이동
      this.$router.push({
        name: "boardDetail",
        params: { articleNo: value.articleNo },
      });
    },
    pageChange(pageNumber) {
      this.displayItems = this.boardAllList.slice(this.pageSize * (pageNumber - 1), this.pageSize * pageNumber);
    },
  },
};
</script>

<style scoped>
.table-footer {
  display: flex;
  bottom: 0;
  padding: 10px;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
</style>
