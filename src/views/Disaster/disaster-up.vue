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

              <el-form-item label="灾情描述" prop="desc">
                <el-input type="textarea" v-model="param.desc" placeholder="desc"></el-input>
                  </el-form-item>
  
        
          <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
            <!-- <el-button type="primary" @click="getdata">提交</el-button> -->
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
        </el-form> 
        
    </div>
    <!-- 走马灯显示编码规范 -->
    <!-- <div class="block">
     <el-button type="text">一体化编码参考</el-button>
     <el-carousel trigger="click" height="700px">
      <el-carousel-item v-for="item in 4" :key="item">
        <el-card :body-style="{ padding: '0px' }">
        </el-card>
      </el-carousel-item>
     </el-carousel>
    </div> -->
    </div>
</template>


<script>
import { ref, reactive } from "vue";
import {onMounted} from "vue"

 export default {
   setup(){ 

        const param = reactive({
            username: localStorage.getItem("ms_username"),
            code: "",
            desc: ""
        });

        const rules = {
         username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入灾害码', trigger: 'blur' },
            { min: 36, max: 36, message: '长度为36位', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填输入灾情描述', trigger: 'blur' }
          ]
        };
        const upform = ref(null);
        const submitForm = () => {
           upform.value.validate((valid) => {
                if (valid) {
                  alert('submit!');
                  console.log(param);
                  
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        };

        const resetForm = () =>{
          param.username = localStorage.getItem("ms_username");
          param.code = '';
          param.desc = '';
          
        }
      
        return {
            param,
            rules,
            upform,
            submitForm,
            resetForm,
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