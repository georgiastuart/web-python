import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

window.onload = () => {
window.languagePluginLoader.then(() => {
  window.pyodide.loadPackage(['numpy', 'matplotlib']).then(() => {
    new Vue({
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })
});
}