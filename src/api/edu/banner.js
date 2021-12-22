import request from '@/utils/request'
export default {
    getBannerListPage(current,limit) {
        return request({
            url: `/cms/admin/banner/pageBanner/${current}/${limit}`,
            method: 'get',
          })
    },
    deleteBannerId(id) {
        return request({
            url: `/cms/admin/banner/remove/${id}`,
            method: 'delete'
          })
    },
    addBanner(banner) {
        return request({
            url: `/cms/admin/banner/addBanner`,
            method: 'post',
            data: banner
          })
    },
    getBannerInfo(id) {
        return request({
            url: `/cms/admin/banner/get/${id}`,
            method: 'get'
          })
    },
    updateBannerInfo(banner) {
        return request({
            url: `/cms/admin/banner/update`,
            method: 'post',
            data: banner
          })
    }
}
