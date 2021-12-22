import request from '@/utils/request'
export default {
    createStatData(day) {
        return request({
            url: '/stat/registerCount/'+day,
            method: 'post'
          })
    },
    getDataStat(searchObj) {
        return request({
            url: `/stat/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
          })
    }
}