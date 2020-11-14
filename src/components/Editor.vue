<template>
<v-container>
  <v-btn class="my-3" v-on:click="runPython(code)">Run Python</v-btn>

  <v-row class="pt-3">
    <v-col cols="6">
  <prism-editor
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
      :line-numbers="lineNumbers"
  ></prism-editor>
    </v-col>
    <v-col cols="6">
      <div class="output">{{ output }}</div>
<!--      <textarea disabled class="output flex" v-model="output"></textarea>-->
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-solarizedlight.css'

export default {
name: "Editor",
  components: {
    PrismEditor,
  },
  data: () => ({
    code: 'import numpy as np\n' +
        'np.random.randn(5)',
    lineNumbers: true,
    output: ""
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.python)
    },
    runPython(code) {
      this.output = window.pyodide.runPython(code);
    }
  }
}
</script>

<style lang="scss">
.my-editor {
  font-family: monospace;
  height: 300px;
  border: black solid 1px;
  border-radius: 5px;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}

.output {
  height: 300px;
  overflow: auto;
}
</style>