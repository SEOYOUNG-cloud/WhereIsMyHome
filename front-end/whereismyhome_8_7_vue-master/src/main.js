import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import "vuetify/dist/vuetify.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

Vue.config.productionTip = false;

Vue.use(vuetify);
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "mdi",
});
new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
