import React from "react"
import {Provider} from 'react-redux'
//  使用css in js
import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from  './style'
// renderRoutes 读取路由配置转换为router标签
import {renderRoutes} from 'react-router-config'
import routes from './routes/index.js'
import store from './store/index'
import {HashRouter} from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
      <GlobalStyle />
      <IconStyle/>
      {renderRoutes(routes)}
    </HashRouter>
    </Provider>
  )
}
export default App