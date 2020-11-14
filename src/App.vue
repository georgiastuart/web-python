<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
      <Editor/>
    </v-main>
  </v-app>
</template>

<script>
import Editor from "@/components/Editor";

export default {
  name: 'App',

  components: {
    Editor
  },

  data: () => ({
    //
  }),
};
</script>
