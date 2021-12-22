<template>

  <div class="app-container">

    <h2 style="text-align: center;">Add Banner</h2>

    <el-form label-width="120px">

        <el-form-item label="Title">
            <el-input v-model="bannerInfo.title" placeholder="Add Banner Title"/>
        </el-form-item>

        <el-form-item label="Priority">
            <el-input-number :min="0" v-model="bannerInfo.sort" controls-position="right" placeholder="Set Priority"/>
        </el-form-item>

        <el-form-item label="LinkUrl">
            <el-input v-model="bannerInfo.linkUrl" placeholder="Add Banner Description"/>
        </el-form-item>

        <el-form-item label="Image">

            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/oss/file/upload'"
                class="avatar-uploader">
                <img :src="bannerInfo.imageUrl">
            </el-upload>

        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">Save</el-button>
        </el-form-item>

        </el-form>
  </div>
</template>
<script>
import banner from '@/api/edu/banner'
export default {
    data() {
        return {
            saveBtnDisabled:false,
            bannerInfo:{
                id: '',
                title: '',
                sort: 0,
                linkUrl: '',
                imageUrl: '/static/01.jpg',
            },
            BASE_API: process.env.BASE_API, // 接口API地址
        }   
    },
    created() {
        if(this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getInfo(id)
        } else{
            bannerInfo = {}
        }
    },
    methods:{

        getInfo(id) {
            banner.getBannerInfo(id)
                .then(response => {
                this.bannerInfo = response.data.item
            })
        },

        handleAvatarSuccess(res, file) {
            this.bannerInfo.imageUrl = res.data.url
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },

        updateBanner() {
            banner.updateBannerInfo(this.bannerInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'Banner updated!'
                    });
                    this.$router.push({path:'/banner/list'})
                })
        },
        addBanner(){
            banner.addBanner(this.bannerInfo)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'New Banner Created!'
                    });
                    this.$router.push({path:'/banner/list'})
                })
        },
        saveOrUpdate() {
           if(!this.bannerInfo.id) {
               this.addBanner()
           } else {
               this.updateBanner()
           }
        }
    }
}
</script>