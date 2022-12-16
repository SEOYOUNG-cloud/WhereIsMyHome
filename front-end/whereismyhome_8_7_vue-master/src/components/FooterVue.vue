<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Well, open up your mind and see like me Open up your plans and, damn, you're free Look into your heart and
        you'll find love, love, love, love Listen to the music of the moment, people dance and sing We're just one big
        family And it's our God-forsaken right to be loved, loved, loved, loved, loved So I won't hesitate no more, no
        more It cannot wait, I'm sure There's no need to complicate Our time is short This is our fate, I'm yours
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Copyright 2022. KBS&PSY Corp. ALL RIGHTS RESERVED.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
div {
  background-color: #005085;
}
</style>
