import {getHotSingerListRequest, getSingerListRequest} from '../../../api/request'
import {
  CHANGE_SINGER_LIST,
  CHANGE_CATOGORY,
  CHANGE_ALPHA,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from './contants';
import {fromJS} from 'immutable'
// import { alphaTypes } from '../../../api/config';

export const changeAlpha = (data) => ({
  type: CHANGE_ALPHA,
  data
});
export const changeCategory = (data) => ({
  type: CHANGE_CATOGORY,
  data
});
// 获取歌手列表
const  changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
})
// 分页
export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data
})
// 进场动画
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
})
// 滑动最底部loading
export const changePullUpLoading  = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
})
// 顶部下拉刷新
export const changePullDownLoading  = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
})

// 第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      dispatch(changeSingerList(res.artists))
      // 获取数据后  进场动画结束
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    })
    .catch(() => {console.log('获取热门歌手列表失败')})
  }
}
// 加载更多热门歌手
export const refreshMoreHotSingerList  = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn('singers', 'pageCount')
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    })
    .catch(() => {console.log('热门歌手获取失败')})
  }
}
// 加载对应类别的歌手
export const getSingerList = (category, alpha) => {
  return (dispatch) => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
}
// 加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};
