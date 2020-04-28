// 编写具体的action
import * as actionTypes from './constants'
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

// 轮播广告
export const changeBannerList = (data) => (
  {
    type: actionTypes.CHANGE_BANNER,
    data: fromJS (data)
  }
)

// 列表推荐
export const changeRecommendList = (data) => (
  {
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS (data)
  }
)

// 加载状态
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

// 获取广告列表数据
export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners));
    }).catch(() => {
      console.log('请求轮播数据出错')
    })
  }
}
// 获取推荐列表
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result))
      // 获取推荐歌单完毕后  将加载状态赋值为true
      dispatch(changeEnterLoading(false))
    }).catch(err => {
      console.log('获取推荐列表失败')
    })
  }
}