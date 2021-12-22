<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="choose catalogue">
          <el-option label="login  stat" value="login_num"/>
          <el-option label="register stat" value="register_num"/>
          <el-option label="video stat" value="video_view_num"/>
          <el-option label="course stat" value="course_num"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="begin"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="end"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">search</el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>

import * as echarts from 'echarts'
import statApi from '@/api/edu/stat'

export default {
    data() {
        return {
            searchObj:{},
            btnDisabled:false,
            xData:[],
            yData:[]
        }
    },
    methods:{
        showChart() {
            statApi.getDataStat(this.searchObj)
                .then(response => {
                    console.log('*****************'+response)
                    this.yData = response.data.numDataList
                    this.xData = response.data.date_calculatedList

                    this.setChart()
                })
        },
        setChart() {
            this.chart = echarts.init(document.getElementById('chart'))
            // console.log(this.chart)

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '数据统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [
                        0
                    ],
                    bottom: 30,
                    start: 10,
                    end: 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: '#d3dee5'

                    },
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: '#90979c'
                    },
                    {
                    type: 'inside',
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                 }],
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: this.xData
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value'
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    data: this.yData,
                    // 折线图
                    type: 'line'
                }]
            }

            this.chart.setOption(option)
        }
    }
}
</script>
