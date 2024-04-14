import { createApp } from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })
  

const app = createApp(App);
app.use(Vant).use(router).use(vuetify).mount('#app')

if (typeof window.ethereum !== "undefinedd") {
  console.log("MetaMask is installed!");
}
