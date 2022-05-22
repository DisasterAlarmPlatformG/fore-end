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
      <h4>灾情地：{{ disastername }}</h4>
      <h4>发生时间：{{ disasterdate }}</h4>
      <h4>灾情分类：{{ disastercategory }}</h4>
      <h4>灾情描述：{{ disasterdesc }}</h4>
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
          style="margin-left: 10%"
        >
          <el-button style="margin-top: 60px" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-top: 60px; margin-left: 30px"
            size="small"
            type="success"
            @click.stop="submitUpload"
            >上传到服务器</el-button
          >
          <div class="el-upload__tip">不限文件格式。不超过5MB</div>
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
      <!-- <div align="center">
                <el-input v-model="searchQuery.item" placeholder="请输入灾情码..." class="handle-input "></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <br /><br />
            </div> -->
      <div>
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          width="1510"
        >
          <el-table-column
            prop="id"
            label="编号"
            width="140"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="disasterId"
            align="center"
            label="灾情码"
            width="330"
          ></el-table-column>

          <el-table-column
            prop="fileName"
            label="文件名称"
            align="center"
            width="240"
          ></el-table-column>

          <!-- <el-table-column prop="fileLocation" label="文件下载" align="center" width="260" >

                    </el-table-column> -->

          <el-table-column
            prop="fileType"
            align="center"
            label="文件类型"
            width="220"
          ></el-table-column>

          <el-table-column
            prop="fileSize"
            label="文件大小"
            align="center"
            width="120"
          ></el-table-column>

          <el-table-column
            prop="uploadTime"
            label="上传时间"
            align="center"
            width="260"
          ></el-table-column>

          <el-table-column
            prop="uploadId"
            label="上传用户"
            align="center"
            width="150"
          ></el-table-column>

          <el-table-column
            prop="fileLocation"
            label="文件下载"
            align="center"
            width="170"
          >
            <template #default="scope">
              <el-button
                type="primary"
                @click="download(scope.row.fileLocation)"
                >下载</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
import { reactive, ref, getCurrentInstance } from "vue";
import { onMounted } from "@vue/runtime-core";
//import * as echarts from 'echarts'
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// import axios from 'axios'
import vMap from "../../components/DisasterMap.vue";
import { SelectFile } from "../../api/index";

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
        //disasterid.value = "130105005021202205051154011001101005";
      }
      //初始化riq
      if (route.query.date_for_view) {
        disasterdate.value = route.query.date_for_view.toString();
      } else {
      }
      //初始化分类
      if (route.query.category) {
        disastercategory.value = route.query.category.toString();
      } else {
      }
      console.log(route.query.description);
      //初始化描述
      if (route.query.description) {
        disasterdesc.value = route.query.description.toString();
      } else {
      }
      //初始化日期
      if (route.query.address_for_search) {
        disastername.value = route.query.address_for_search.toString();
      } else {
      }
      //初始化地图
      fnCallChild();

      //query.disasterid = disasterid.value;
      //获取表格数据

      getData();

    });
    //路由配置
    const route = useRoute();
    const disasterid = ref("130105005021202205051154011000101003");
    const disastername = ref("河北省石家庄市新华区东焦街道");
    const disasterdate = ref("2022-05-06 15:23");
    const disastercategory = ref("震情");
    const disasterdesc = ref("3");

    //控制地图组件显示
    const isShow = ref(true);
    const showMap = () => {
      isShow.value = !isShow.value;
      console.log("show map : " + isShow);
    };

    //控制切换坐标点
    const RefChilde = ref();

    const temp = reactive({
      name: "",
      position: "",
      desc: "",
      category:"",
      date:""
    });

    //手动改变
    const fnCallChild = () => {
      temp.name = disastername.value;
      temp.position = disastername.value;
      temp.desc = disasterdesc.value;
      temp.category = disastercategory.value;
      temp.date = disasterdate.value;
      RefChilde.value.ChangeData(temp);
    };

    const { proxy } = getCurrentInstance();

    const param = reactive({
      username: localStorage.getItem("ms_username"),
      code: 130105005021202205051154011001101004,
      // description: ""
    });

    const objData = reactive({
      username: localStorage.getItem("ms_username"),
      disasterid: disasterid.value,
    });

    const submitUpload = () => {
      console.log(123);
      objData.disasterid = disasterid.value;
      proxy.$refs.upload.submit();
    };

    const handlePreview = (a) => {
      console.log(a);
    };

    const handleRemove = () => {};
    const tableData = ref([]);

    // 获取表格数据
    const query = reactive({
      // disasterid:"130105005021202205051154011001101004"
      disasterid: disasterid.value,
    });

    const getData = () => {
      query.disasterid = disasterid.value;
      SelectFile(query).then((res) => {
        // console.log(res.data);
        tableData.value = res.data;
      });
    };
    

    const download = (value) => {
      //  console.log(value)
      window.open(value, "_blank");
    };

    return {
      disasterid,
      disastername,
      disasterdate,
      disastercategory,
      disasterdesc,
      showMap,
      RefChilde,
      isShow,
      param,
      objData,
      submitUpload,
      // submitUploadM,
      handleRemove,
      handlePreview,
      query,
      tableData,
      download,
    };
  },
};
</script>

<style>
</style>
