import React from 'react'
// renderRoutes只能渲染一层路由，如需根据二层数据进行路由跳转  须在home中再次调用renderRoutes
import { renderRoutes } from "react-router-config"
import { Top, Tab, TabItem } from './style'
// 利用NavLink进行路由跳转
import {NavLink} from 'react-router-dom'

function Home(props) {
  const {route} = props
  return (
    <div>
      <Top>
        <span className = "iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default Home