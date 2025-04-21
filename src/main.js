import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import PanelHead from './compoents/panelHead.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
router.beforeEach((to,from)=>{
    const token=localStorage.getItem('pz_token')
    if(!token && to.path!=='/login'){
        return '/login'
    }else{
        return true
    }
})
app.component('PanelHead',PanelHead)
app.use(store)
app.use(router)
app.mount('#app')
