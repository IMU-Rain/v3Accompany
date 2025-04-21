<template>
  <el-row :gutter="20" class="container" justify="center">
    <el-card style="max-width: 480px; height: 100%">
      <template #header>
        <div class="card-header">
          <img src="../../assets/th.jpeg" />
        </div>
      </template>
      <div class="jump-link clearfix">
        <el-link class="fr" @click="handleClick">{{
          formType ? "注册账号" : "返回登陆"
        }}</el-link>
      </div>
      <div class="form">
        <el-form
          :model="formData"
          label-width="auto"
          style="max-width: 600px"
          :rules
        >
          <el-form-item prop="userName">
            <el-input
              placeholder="输入账号"
              v-model="formData.userName"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              placeholder="输入密码"
              v-model="formData.passWord"
              prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item prop="validCode" v-show="!formType">
            <el-input
              placeholder="验证码"
              v-model="formData.validCode"
              prefix-icon="Lock"
            >
              <template #append>
                <el-button @click="sendText">{{ textCount.text }}</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-button" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-row>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { getCode ,login,userAuthentication,menuPermissions} from "../../api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const formType = ref(true);
const store=useStore()
const handleClick = () => {
  formType.value = !formType.value;
};
const formData = reactive({
  userName: "",
  passWord: "",
  validCode: "",
});

// 电话校验
const phoneCheck = (phoneNum) => {
  const phoneReg = /^1[3-9]\d{9}$/;
  return phoneReg.test(phoneNum);
};
// 发送验证码
const textCount = reactive({
  text: "发送验证码",
  time: 60,
  sending: false,
});
const sendText = () => {
  if (phoneCheck(formData.userName)) {
    if (!textCount.sending) {
      ElMessage({
        message: "已发送，请查收",
        type: "success",
      });
      textCount.sending = true;
      getCode({tel:formData.userName}).then(({data})=>{
        console.log(data);
        if(data.code===10000){
            
        }
      })
      const textId = setInterval(() => {
        textCount.text = textCount.time;
        textCount.time -= 1;
        if (textCount.time === 0) {
          textCount.time = 60;
          textCount.text = "发送验证码";
          clearInterval(textId);
          textCount.sending = false;
        }
      }, 1000);
    } else {
      ElMessage({
        message: "再点我报警了",
        type: "warning",
      });
    }
  } else {
    ElMessage({
      message: "电话错误",
      type: "warning",
    });
  }
};
// 表单校验
const validatorUser = (rule, value, callback) => {
  if (!phoneCheck(value)) {
    callback(new Error("请输入正确的电话号"));
  }
};
const rules = reactive({
  userName: [
    {
      required: true,
      validator: validatorUser,
      trigger: "blur",
    },
  ],
});
// 表单提交
const router=useRouter()
const submitForm = () => {
    if(!formType.value){
        userAuthentication(formData).then(({data})=>{
            if(data.code===10000){
                ElMessage.success('注册成功,即将登陆')
            }
        })
    }else{
        login(formData).then(({data})=>{
            if(data.code=10000){
                ElMessage.success('登陆成功')
                localStorage.setItem('pz_token',data.data.token)
                localStorage.setItem('userInfo',JSON.stringify(data.data.userInfo))
                router.push('/')
            }
        })
    }
};
</script>

<style scoped lang="less">
.container {
  .card-header {
    img {
      width: 100%;
    }
  }
  .jump-link {
    margin-bottom: 10px;
  }
  .form {
    .submit-button {
      width: 100%;
    }
  }
}
</style>
