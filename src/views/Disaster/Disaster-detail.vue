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

    <div>

     <el-button type="text">灾情文件上传</el-button> 

      <el-form>
              <!-- 上传 -->
<!--               
              <el-form-item label="用户名" prop="username">
                <el-input v-model="param.username"></el-input>
                  </el-form-item>
              
              <el-form-item label="灾害码" prop="code">
                <el-input v-model="param.code" ></el-input>
                  </el-form-item> -->

  <!-- 单文件上传 -->
<el-upload
  class="upload-demo"
  ref="upload"
  action="api/uploadFile"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :data="objData"
  :auto-upload="false"
  style=" margin-left:10%">
  <el-button style="margin-top:60px;" size="small" type="primary">选取文件</el-button>
  <el-button style=" margin-top:60px; margin-left: 30px;" size="small" type="success" @click.stop="submitUpload">上传到服务器</el-button>
  <div  class="el-upload__tip">不限文件格式。不超过5MB</div>
</el-upload>
<!-- <el-upload
  class="upload-demo"
  ref="upload"
  action="api/uploadMultipleFiles"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :data="objData1"
  :auto-upload="false">
  <el-button style="margin-top:60px;" size="small" type="primary">选取文件</el-button>
  <el-button style=" margin-top:60px; margin-left: 30px;" size="small" type="success" @click.stop="submitUploadM">上传到服务器</el-button>
  <div  class="el-upload__tip">不限文件格式。不超过5MB</div>
</el-upload> -->
        </el-form> 
        
    </div>
    <div>
       <el-button type="text">灾情文件列表</el-button> 
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref,getCurrentInstance } from "vue";
import { onMounted } from "@vue/runtime-core";
//import * as echarts from 'echarts'
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// import axios from 'axios'
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

 const {proxy} = getCurrentInstance()

        const param = reactive({
            username: localStorage.getItem("ms_username"),
            code:"130105005021202205051154011001101004"
            // description: ""
        });
        
        const objData = reactive({
            username: localStorage.getItem("ms_username"),
            disasterid: "130105005021202205051154011001101004"
        });

          const submitUpload = () => {
          console.log(123)
          proxy.$refs.upload.submit()
        }
       
        const handlePreview = (a) => {
          console.log(a)
        }
        
        const handleRemove = () => {
          
        }
    return {
      disasterid,
      showMap,
      RefChilde,
      isShow,
        param,
            objData,
            submitUpload,
            // submitUploadM,
            handleRemove,
            handlePreview
    };
  },
};
</script>

<style>


</style>
