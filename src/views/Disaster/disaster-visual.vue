<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      
    </div>

    <div>
      <el-button type="text" @click="showMap()">灾情地图测试</el-button>
      <el-button type="text" @click="fnCallChild">change</el-button>
      <el-button type="text" @click="fnCallChild2">change2</el-button>
      <div v-show="isShow">
        <v-map ref="RefChilde" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//import * as echarts from 'echarts'
import { ref, reactive } from "vue";

import vMap from "../../components/DisasterMap.vue";

export default {
  name: "father",
  components: {
    vMap,
  },
  setup() {
    //控制组件显示
    const isShow = ref(true);
    const showMap = () => {
      isShow.value = !isShow.value;
      console.log("show map : " + isShow);
    };

    //控制切换位置
    const RefChilde = ref();

    const temp = reactive({
      name: "衡水",
      position: [115.6754061376161, 37.745191408077424],
      desc: "发生地震",
    });

    //手动改变
    const fnCallChild = () => {
       temp.name = "衡水";
      temp.position = [115.6754061376161, 37.745191408077424];
      temp.desc = "发生地震";
      RefChilde.value.ChangeData(temp);
    };
    const fnCallChild2 = () => {
      temp.name = "上海";
      temp.position = [121.48, 31.22];
      temp.desc = "发生灾害";
      RefChilde.value.ChangeData(temp);
    };

    return {
      isShow,
      showMap,
      RefChilde,
      fnCallChild,
      fnCallChild2,
    };
  },
};
</script>

<style>
</style>