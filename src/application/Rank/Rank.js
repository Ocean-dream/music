import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { filterIndex } from '../../api/untils';
import Scroll from '../../baseUI/scroll/index';
import { getRankList } from './store/index'
import { EnterLoading } from '../Singer/style';
import { renderRoutes } from 'react-router-config';
import {
  List, 
  ListItem,
  SongList,
  Container
} from './style';

function Rank(props) {
  console.log(props)
  // 从props中取出绑定的值
  const { rankList: list, loading} = props
  const {getRankListDataDispatch} = props
  // 将列表数据从fromjs结构转换成数组
  let rankList =  list ? list.toJS() : []

  // 页面初始化发送请求
  useEffect(() => {
    if(!rankList.length){
      getRankListDataDispatch();
    }
  }, [])
  let globalStartIndex = filterIndex (rankList);
  let officialList = rankList.slice (0, globalStartIndex);
  let globalList = rankList.slice (globalStartIndex);

//   const enterDetail = (name) => {
//     const idx = filterIdx(name);
//     if(idx === null) {
//       alert("暂无相关数据");
//       return;
//     } 
// }

    // 
    const renderSongList = (list) => {
      return list.length ? (
        <SongList>
          {
            list.map ((item, index) => {
              return <li key={index}>{index+1}. {item.first} - {item.second}</li>
            })
          }
        </SongList>
      ) : null;
    }
  // 渲染榜单列表函数
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
        list.map ((item) => {
          return (
            <ListItem key={item.coverImgId} tracks={item.tracks}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""/>
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              { renderSongList (item.tracks)  }
            </ListItem>
          )
        })
      } 
      </List>
    )
  }
  
  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? {"display":"none"}:  {"display": ""};
  return (
    <Container>
    <Scroll>
      <div>
        <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          { renderRankList (officialList) }
        <h1 className="global" style={displayStyle}> 全球榜 </h1>
          { renderRankList (globalList, true) }
        {/* { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null } */}
      </div>
    </Scroll> 
    {renderRoutes (props.route.routes)}
  </Container>
  )
}


// 映射redux 全局的state到组件的props上
const mapStateToProps  = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading']),
})
// 映射dispat到组见的props上
const mapDispatchToProps = (dispatch) => {
  return{
    getRankListDataDispatch () {
      dispatch (getRankList());
    }
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank))