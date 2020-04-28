import {axiosInstance} from './config'

// 获取bannerList
export const getBannerRequest = () => {
  return axiosInstance.get ('/banner')
}

// 获取推荐列表
export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized')
}

// 获取热门歌手列表
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}
// 获取歌手列表
export const getSingerListRequest = (category,alpha,count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)
}