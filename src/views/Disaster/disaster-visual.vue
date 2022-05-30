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
      <v-disaster-all-count />
      <v-disaster-cat-count />
      <v-disaster-pro-count />
      <v-disaster-year-count />
    </div>
  </div>
</template>

<script lang="ts">
//import * as echarts from 'echarts'

import vDisasterAllCount from "../../components/DisasterAllCount.vue";

import vDisasterCatCount from "../../components/DisasterCatCount.vue";

import vDisasterProCount from "../../components/DisasterProCount.vue";

import vDisasterYearCount from "../../components/DisasterYearCount.vue";

export default {
  name: "father",
  components: {
    vDisasterAllCount,
    vDisasterCatCount,
    vDisasterProCount,
    vDisasterYearCount
  },
  setup() {},
};
</script>

<style>
</style>