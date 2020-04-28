import React, {forwardRef, useState,useEffect, useRef, useImperativeHandle} from 'react'
import BScroll from 'better-scroll'
import PropTypes from "prop-types"
import styled from 'styled-components'

// 初始化样式
const ScrollContainer = styled.div`
  width:100%;
  height:100%;
  overflow:hidden;
`

// 函数式组件天生不具备被上层组件直接调用 ref 的条件，因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹。
// scroll组件所需要参数
// Scroll.propTypes = {
//   direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
//   click: true,// 是否支持点击
//   refresh: PropTypes.bool,// 是否刷新
//   onScroll: PropTypes.func,// 滑动触发的回调函数
//   pullUp: PropTypes.func,// 上拉加载逻辑
//   pullDown: PropTypes.func,// 下拉加载逻辑
//   pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
//   pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
//   bounceTop: PropTypes.bool,// 是否支持向上吸顶
//   bounceBottom: PropTypes.bool// 是否支持向下吸底
// };

// 该方法返回一个组件，参数为函数
// 参数中的函数第一个参数为父组件传递的props  第二个参数为父组件传递的ref
// 目的 希望可以在封装组件时，外层组件可以通过ref直接控制内层组件或元素的行为
const Scroll = forwardRef ((props, ref) => {
  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState()
  // current 指向初始化bs实例需要的dom元素
  const scrollContainerRef = useRef()
  // 解构赋值获取参数
  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll } = props
  // 页面初始化时实例=化better-scroll对象
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, [])
  // 每次渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  }, [])
  // 给实例绑定scroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])
  // 进行上拉到底的判断
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scrpllEnd', () => {
      // 判断是否下滑到底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrpllEnd')
    }
  }, [pullUp, bScroll])
  // 进行下拉判断
  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown ();
      }
    });
    return () => {
      bScroll.off ('touchEnd')
    }
  }, [pullDown, bScroll])
  // 向外暴露
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  })
  // 自定义暴露给父组件的实例值
  // 接受两个参数，第一个为通过forwardRef引用子组件的ref实例，第二个为一个函数，返回的是一个对象，包含要暴露的属性或方法
  useImperativeHandle (ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
    </ScrollContainer>
  )
})
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}
Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
}

export default Scroll