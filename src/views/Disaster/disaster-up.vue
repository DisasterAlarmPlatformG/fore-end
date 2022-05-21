<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 首页
                </el-breadcrumb-item>
                <el-breadcrumb-item>灾情上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
          <el-form :model="param" status-icon :rules="rules" ref="upform" label-width="100px" class="demo-ruleForm">
              <!-- 上传用户名 -->
              
              <el-form-item label="用户名" prop="username">
                <el-input v-model="param.username" placeholder="username" ></el-input>
                  </el-form-item>
              
              <el-form-item label="灾害码" prop="code">
                <el-input  v-model="param.code" placeholder="code"></el-input>
                  </el-form-item>

              <el-form-item label="灾情描述" prop="description">
                <el-input type="textarea" v-model="param.description" placeholder="description"></el-input>
                  </el-form-item>
                
  

        
          <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
            <!-- <el-button type="primary" @click="getdata">提交</el-button> -->
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
        </el-form> 
        
    </div>
    <div>
      <el-form>
              <!-- 上传 -->
              
              <el-form-item label="用户名" prop="username">
                <el-input v-model="param.username"></el-input>
                  </el-form-item>
              
              <el-form-item label="灾害码" prop="code">
                <el-input v-model="param.code" ></el-input>
                  </el-form-item>

  <!-- 单文件上传 -->
<el-upload
  class="upload-demo"
  ref="upload"
  action="api/uploadFile"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :data="objData"
  :auto-upload="false">
  <el-button style="margin-top:60px;" size="small" type="primary">选取文件</el-button>
  <el-button style=" margin-top:60px; margin-left: 30px;" size="small" type="success" @click.stop="submitUpload">上传到服务器</el-button>
  <div  class="el-upload__tip">不限文件格式。不超过5MB</div>
</el-upload>
        </el-form> 
        
    </div>
    <div>
      <el-button type="text">一体化编码规范</el-button>
      <el-card class="box-card">
         <img src="../../assets/img/code.png" class="image">
      </el-card>
    </div>

  

    </div>
</template>


<script>
import { ref, reactive, getCurrentInstance } from "vue";
import {onMounted} from "vue";
import {UpForm}  from "../../api/index";
import { ElMessage } from "element-plus";
// import axios from 'axios'

 export default {
   setup(){ 
        const {proxy} = getCurrentInstance()
        const param = reactive({
            username: localStorage.getItem("ms_username"),
            code: "",
            description: ""
        });
        
        const objData = reactive({
            username: localStorage.getItem("ms_username"),
            disasterid: param.code
        });
        const rules = {
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入灾害码', trigger: 'blur' },
            { min: 36, max: 36, message: '长度为36位', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填输入灾情描述', trigger: 'blur' }
          ]
        };
        const upform = ref(null);
        const submitForm = () => {
           upform.value.validate((valid) => {
                if (valid) {
                  alert('submit!');
                  console.log(param);
                  _UpForm();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        };
        const submitUpload = () => {
          console.log(123)
          proxy.$refs.upload.submit()
        }
        const handlePreview = (a) => {
          console.log(a)
        }
        
        const handleRemove = () => {
          
        }
        const resetForm = () =>{
          param.username = localStorage.getItem("ms_username");
          param.code = '';
          param.description = '';
          
        };

        //   const store = useStore();
        // store.commit("clearTags");

        // const params = reactive({
        //     username:"gongjingzhe",
        //     password:""
        // });
        const _UpForm = () => {
            UpForm(param).then((res) => {
                console.log(res)

                if(res.code == 200){
                ElMessage.success("新增成功");
                
                }else{
                ElMessage.warning("请检查输入信息");
                }
             
            })
            .catch((res)=>{
            ElMessage.error("登录失败");
            });
        };
      

      

        return {
            param,
            rules,
            upform,
            submitForm,
            resetForm,
            objData,
            submitUpload,
            handleRemove,
            handlePreview
        };


   }

    // data() {
    //   return {
    //     ruleForm: {
    //       username: '',
    //       code: '',
    //       desc: ''
    //     },
    //     rules: {
    //       username: [
    //         { required: true, message: '请输入用户名', trigger: 'blur' },
            
    //       ],
    //       code: [
    //         { required: true, message: '请输入灾害码', trigger: 'blur' },
    //         { min: 36, max: 36, message: '长度为36位', trigger: 'blur' }
    //       ],
    //       desc: [
    //         { required: true, message: '请填输入灾情描述', trigger: 'blur' }
    //       ]
    //     }
    //   };
    // },
    // methods: {
    //   getdata(){
    //      console.log(this.ruleForm)
    //   },
    //   submitForm(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //         console.log('success submit!!');
    //         console.log(this.resetForm.username);
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   }
    // }
  }
</script>

<style>
/* 走马灯style */
 /* .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  } */
</style>
