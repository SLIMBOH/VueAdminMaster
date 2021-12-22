import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/edu/course/addCourseInfo',
            method: 'post',
            data:courseInfo
          })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/edu/teacher/findAll',
            method: 'get'
          })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/edu/course/getCourseInfo/'+id,
            method: 'get'
          })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/edu/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },

    getPublishCourseInfo(id) {
        return request({
            url: '/edu/course/getPublishCourseInfo/'+id,
            method: 'get'
          })
    },

    publishCourse(id) {
        return request({
            url: '/edu/course/publishCourse/'+id,
            method: 'post'
          })
    },

    getCourseListPage(current,limit,courseQuery) {
        return request({
            url: `/edu/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            data: courseQuery
          })
    },
    deleteCourseId(id) {
        return request({
            url: `/edu/course/delete/${id}`,
            method: 'delete'
          })
    }

}
