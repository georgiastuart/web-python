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
        'print(np.ones((2, 2))',
    lineNumbers: true,
    output: ""
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.python)
    },
    runPython(code) {
      console.log(code)
      code += '\n'
      let indentedCode = '';
      let i = 0;
      let j = 0;

      while ((j = code.indexOf('\n', i)) != -1) {
        indentedCode += '    ' + code.substring(i, j) + '\n';
        i = j + 1;
      }
      console.log(indentedCode);
      let preamble = 'from contextlib import redirect_stdout\nimport io\nf=io.StringIO()\nwith redirect_stdout(f):\n';
      this.output = window.pyodide.runPython(preamble + indentedCode + 'f.getvalue()');
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