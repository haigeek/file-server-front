import Vue from 'vue'
import App from './App.vue'
import { Button, Select,Upload,Table,TableColumn,Message,Col,Row,Loading,MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios
Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Button)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Col)
Vue.use(Row)
Vue.use(Loading)

// Vue.use(MessageBox)
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
}).$mount('#app')
