<template>
  <v-app>
    <HeaderVue />
    <v-main>
      <router-view />
    </v-main>
    <FooterVue />
  </v-app>
</template>

<script>
import HeaderVue from "@/components/HeaderVue";
import FooterVue from "@/components/FooterVue";

export default {
  name: "App",
  components: {
    HeaderVue,
    FooterVue,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
* {
  font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
}
</style>
