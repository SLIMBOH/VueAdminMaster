<template>
  <div class="app-container">
    Banner List

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="#"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="title" width="80" />

      <el-table-column prop="imageUrl" label="imageUrl" />

      <el-table-column prop="gmtCreate" label="createTime" width="100"/>

      <el-table-column prop="gmtModified" label="editTime" width="100" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import banner from '@/api/edu/banner'

export default {
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:10,//每页记录数
          total:0,//总记录数
        }
    },
    created() {
        this.getList() 
    },
    methods:{
        getList(page=1) {
            this.page = page
            banner.getBannerListPage(this.page,this.limit)
                .then(response =>{
                    this.list = response.data.items
                    this.total = response.data.total
                    console.log(response.data.items)
                }) 
        },
        removeDataById(id) {
            this.$confirm('Do you want to delete this banner?', 'Warning', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {
                banner.deleteBannerId(id)
                    .then(response =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })
            }).catch((err) => {
                console.log(err)
            }); 
        }
 
    }
}
</script>
