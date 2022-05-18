<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>灾情详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <h4>灾情码：{{ disasterid }}</h4>
    </div>

    <div>
      <el-button type="text" @click="showMap()">灾情地图</el-button>
      <div v-show="isShow">
        <v-map ref="RefChilde" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
//import * as echarts from 'echarts'
import { useRoute } from "vue-router";

import vMap from "../../components/DisasterMap.vue";

export default {
  name: "father",
  components: {
     vMap,
  },
  setup() {
    onMounted(() => {
      //初始化灾情码
      if (route.query.id) {
        disasterid.value = route.query.id.toString();
      } else {
        disasterid.value = "130105005021202205051154011001101004";
      }

      //初始化地图
      fnCallChild()
    });
    //路由配置
    const route = useRoute();
    const disasterid = ref("130105005021202205051154011001101004");

    //控制地图组件显示
    const isShow = ref(true);
    const showMap = () => {
      isShow.value = !isShow.value;
      console.log("show map : " + isShow);
    };

    //控制切换坐标点
    const RefChilde = ref();

    const temp = reactive({
      name: "衡水",
      position: "河北省衡水市",
      desc: "发生地震",
    });

    //手动改变
    const fnCallChild = () => {
      temp.name = "衡水";
      temp.position = "河北省衡水市";
      temp.desc = "发生地震";
      RefChilde.value.ChangeData(temp);
    };

    return {
      disasterid,
      showMap,
      RefChilde,
      isShow,
    };
  },
};
</script>

<style>
</style>