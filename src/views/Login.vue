<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">多源异构灾情数据管理平台</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 无注册需求。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {onMounted} from "vue"
import { Login } from "../api/index";

export default {
    setup() {
        const router = useRouter();
        const param = reactive({
            username: "gongjingzhe",
            password: "123456",
        });

        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {
                    localStorage.setItem("ms_username", param.username);
                    _Login();
                  
                } else {
                   
                    return false;
                }
            });
        };

        const store = useStore();
        store.commit("clearTags");

        // const params = reactive({
        //     username:"gongjingzhe",
        //     password:""
        // });
        const _Login = () => {
            Login(param).then((res) => {
                console.log(res)

                if(res.code == 200){
                ElMessage.success("登录成功");
                router.push("/");
                }else{
                ElMessage.warning("检查账号密码");
                }
             
            })
            .catch((res)=>{
            ElMessage.error("登录失败");
            });
        };
      

        return {
            param,
            rules,
            login,
            submitForm,
        };


    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg3.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    /* color: #fff; */
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>