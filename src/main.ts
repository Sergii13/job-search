import { createApp } from 'vue'
import App from './App.vue'

import '@/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '@/router'
import { createPinia } from 'pinia'

library.add(faSearch)
library.add(faAngleDown)
library.add(faAngleUp)

const pinia = createPinia()
createApp(App).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
