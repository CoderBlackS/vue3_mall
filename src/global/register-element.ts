// 以下按需引入的方式在element-plus 2.2.6不在使用
import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
} from 'element-plus'
const components = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge
]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
