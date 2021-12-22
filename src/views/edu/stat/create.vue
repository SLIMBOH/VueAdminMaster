<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="Date">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="choose date"
          value-format="yyyy-MM-dd" />
      </el-form-item>


      <el-button
        :disabled="btnDisabled"
        type="primary"
        @click="create()">create</el-button>
    </el-form>

  </div>
</template>
<script>
import stat from '@/api/edu/stat'
export default {
    data() {
        return {
            day:'',
            btnDisabled: false
        }
    },
    created() {

    },
    methods:{
        create() {
            stat.createStatData(this.day)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: 'New data created!'
                    })
                    this.$router.push({path:'/stat/show'})
                })
        }
    }
}
</script>
