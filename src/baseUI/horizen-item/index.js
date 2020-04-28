import React, {useState, useEffect, memo, useRef} from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
// 检测子组件类型是否符合传入规则
import { PropTypes } from 'prop-types';
import Scroll from '../scroll/index'

function Horizen(props) {
  const Category = useRef(null)
  // 加入初始化内容的宽度
  useEffect(() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll ("span")
    let totalWidth = 0
    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth
    })
    categoryDOM.style.width = `${totalWidth}px`
  }, [])
  // 从父组件中解构出所需要的值
  const {list, oldval, title} = props
  const {handleClick} = props
  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
     <List>
       <span>{title}</span>
       {
         list.map((item) => {
           return (
             <ListItem key={item.key} className={`${oldval === item.key ? 'selected' : ''}`} onClick={() => handleClick (item.key)}>{item.name}</ListItem>
           )
         })
       }
     </List>
     </div>
    </Scroll>
  )
}

// 接受的参数
// 默认值
Horizen.defaultProps = {
  list: [], // 接受的列表数据
  oldval: '', // 当前选中item值
  title: '', // 列表左边标题
  handleClick: null, // 点击不同item执行的方法
}
// 传入规则
Horizen.propTypes = {
  list: PropTypes.array,
  oldval: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}
export default Horizen

const List = styled.div`
display: flex;
align-items: center;
height: 30px;
overflow: hidden;
>span:first-of-type {
  display: block;
  flex: 0 0 auto;
  padding: 5px 0;
  margin-right: 5px;
  color: grey;
  font-size: ${style ["font-size-m"]};
  vertical-align: middle;
}
`
const ListItem = styled.span`
flex: 0 0 auto;
font-size: ${style ["font-size-m"]};
padding: 5px 8px;
border-radius: 10px;
&.selected {
  color: ${style ["theme-color"]};
  border: 1px solid ${style ["theme-color"]};
  opacity: 0.8;
}
`