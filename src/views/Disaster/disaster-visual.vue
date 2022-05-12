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
    <div class="container"></div>

    <div>
      <el-button type="text" @click="showMap()">灾情地图测试</el-button>
      <div v-show="isShow">
        <v-map />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
//import vHeader from "../components/Header.vue";
import vMap from "../../components/DisasterMap.vue";

export default {
  components: {
    vMap,
  },
  setup() {

    const isShow = ref(true); 
    const showMap = () => {
     isShow.value = !isShow.value;
      console.log("show map : "+ isShow);
    };

    return {
      showMap,
      isShow,
    };
  },
};
</script>

<style>
</style>