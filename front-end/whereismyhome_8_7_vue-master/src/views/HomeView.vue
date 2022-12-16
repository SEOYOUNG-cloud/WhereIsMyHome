<template>
  <div>
    <div data-aos="zoom-out-up" data-aos-easing="ease-in-cubic">
      <v-parallax class="mb-6" :src="require(`@/assets/banner.png`)" height="900"> </v-parallax>
    </div>
    <v-container>
      <div style="padding: 50px 70px" name="empty"></div>
      <div data-aos="fade-up" data-aos-easing="ease-in-cubic">
        <v-row class="mt-10" justify="center">
          <h3 class="text-h2" style="font-weight: bold">LIFE ON LIVE</h3>
        </v-row>
        <v-row class="mt-6" justify="center">
          <p class="text-h5" style="font-weight: bold">
            리브는 새로운 인프라 경험, 새로운 커뮤니케이션 경험을 모두에게 전달하고자 합니다.
          </p>
        </v-row>
      </div>
      <div style="padding: 100px 70px" name="empty"></div>

      <div>
        <h1 class="mb-5">ARTICLES</h1>
        <v-container>
          <v-row>
            <v-layout row wrap>
              <v-card
                outlined
                hover
                v-for="(newsItem, index) in news"
                :key="index"
                @click="cardClick(newsItem.url)"
                width="30%"
                style="margin: 10px"
                class="rounded-lg"
              >
                <v-container style="display: flex; justify-content: center; align-items: center">
                  <v-card flat class="text-xs-center" width="100%">
                    <v-row justify="center" align="center">
                      <v-img
                        class="rounded-lg rounded-b-0"
                        :src="newsItem.photo"
                        width="95%"
                        aspect-ratio="2.75"
                      ></v-img>
                      <v-card-title primary-title>
                        <div style="font-size: 1vw">
                          {{ newsItem.title }}
                        </div>
                      </v-card-title>
                    </v-row>
                  </v-card>
                </v-container>
              </v-card>
            </v-layout>
          </v-row>
        </v-container>
      </div>
    </v-container>
    <div style="padding: 100px 70px" name="empty"></div>
  </div>
</template>

<script>
import http from "@/util/http.js";

export default {
  async created() {
    let { data } = await http.get("/news/all");
    this.news = data;
  },
  data() {
    return {
      news: [],
    };
  },
  methods: {
    cardClick(url) {
      window.location.href = "https://land.naver.com" + url;
    },
  },
};
</script>
<style scoped>
* {
  font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
}
</style>
