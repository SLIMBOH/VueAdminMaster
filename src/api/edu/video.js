import request from '@/utils/request'
export default {

    //添加小节
    addVideo(video) {
        return request({
            url: '/edu/video/addVideo',
            method: 'post',
            data: video
          })
    },
    
    //删除小节
    deleteVideo(id) {
        return request({
            url: '/edu/video/'+id,
            method: 'delete'
          })
    },

    getVideo(id) {
        return request({
            url: '/edu/video/getVideoInfo/'+id,
            method: 'get'
          })
    },

    updateVideo(video) {
        return request({
            url: '/edu/video/updateVideo',
            method: 'post',
            data: video
          })
    },

    deleteVod(id) {
        return request({
            url: '/vod/video/removeVideo/'+id,
            method: 'delete'
          })
    }
}