<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>测试页面</el-breadcrumb-item>
      </el-breadcrumb>

      <input
        ref="uploadInput"
        type="file"
        class="dl-none"
        name="icon"
        @change="dealfilechange"
      />
    </div>

    <div>
      <el-button type="text" @click="showMap()">灾情地图测试</el-button>
      <el-button type="text" @click="fnCallChild">change</el-button>
      <el-button type="text" @click="fnCallChild2">change2</el-button>
      <el-button type="text" @click="uploadFile">单文件上传测试</el-button>
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

import { UploadFile } from "../../api/index";

export default {
  components: {
    vMap,
  },
  setup() {
    //控制组件显示
    const isShow = ref(true);
    const file = ref();
    const showMap = () => {
      isShow.value = !isShow.value;
      console.log("show map : " + isShow);
    };

    //
    const uploadInput = ref<HTMLElement | null>(null);
    const formData = new FormData();
    const dealfilechange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      let files = input.files;
      if (files) {
        console.log(files[0]);
        formData.append("file", files[0]);
      }
    };
    const uploadFile = () => {
      formData.append("username", "gong");
      formData.append("disasterid", "130105005021202205051154011000101003");
      UploadFile(formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("fail");
        });
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
    const fnCallChild2 = () => {
      temp.name = "上海";
      temp.position = "上海市";
      temp.desc = "发生灾害";
      RefChilde.value.ChangeData(temp);
    };

    return {
      isShow,
      showMap,
      RefChilde,
      fnCallChild,
      fnCallChild2,
      uploadFile,
      uploadInput,
      dealfilechange,
    };
  },
};
</script>

<style>
</style>