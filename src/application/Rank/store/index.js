import { fromJS } from 'immutable';
import {getRankListRequest} from '../../../api/request'

// 声明actionType常量 
export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST '
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING'

// 创建action
export const changeRankList = (data) => (
  {
    type: CHANGE_RANK_LIST,
    data: fromJS (data)
  }
)

// 获取排行榜列表
export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then(data => {
      let list = data && data.list
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}

// 停止加载状态
 export const changeLoading = (data) => ({
   type: CHANGE_LOADING,
   data: data
 }) 

 // reducer 部分
 // 声明默认值
  const defaultState = fromJS({
    rankList: [],
    loading: true
  })

  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case CHANGE_RANK_LIST:
        return state.set('rankList', action.data);
      case CHANGE_LOADING:
        return state.set('loading', action.data);
      default:
        return state;
    }
  }

  export {reducer}