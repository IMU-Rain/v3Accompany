<template>
  <div class="container">
    <el-card class="user-info" style="padding: 0;">
      <template #header>
        <div class="card-header">
          <span>用户信息</span>
        </div>
      </template>
      <div class="img-info">
        <el-image
          style="width: 100px; height: 100px"
          :src="userInfo.user_img"
        />
        <div class="info">
          <p>ip:{{ userInfo.ip }}</p>
          <p>权限:{{ userInfo.permission }}</p>
          <p>用户名:{{ userInfo.user_name }}</p>
        </div>
      </div>
    </el-card>
    <el-card class="order">
      <template #header>
        <div class="card-header">
          <span>订单状态</span>
        </div>
      </template>
      <el-row>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="success"
            :title="types[2].state"
            :sub-title="types[2].num"
          ></el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="warning"
            :title="types[1].state"
            :sub-title="types[1].num"
          ></el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="error"
            :title="types[0].state"
            :sub-title="types[0].num"
          ></el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="info"
            :title="types[3].state"
            :sub-title="types[3].num"
          ></el-result>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive } from "vue";
import { report } from "../../api";
const userInfo = reactive({});
const types = reactive([
  { name: "请稍后", num: "0" },
  { name: "请稍后", num: "0" },
  { name: "请稍后", num: "0" },
  { name: "请稍后", num: "0" },
]);
onBeforeMount(() => {
  report().then(({ data }) => {
    if (data.code === 10000) {
      Object.assign(userInfo, data.data.user);
      Object.assign(types, data.data.types);
      types.forEach((item) => {
        item.num = JSON.stringify(item.num);
      });
      console.log(types);
    }
  });
});
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  .user-info {
    width: 45%;
    padding-top: 20px;
    .img-info {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .info {
        padding: 10px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
  .order {
    width: 50%;
    .order-body {
      display: flex;
      flex-direction: row;
    }
    .el-result {
      padding: 0 40px;
    }
  }
}
.el-card__header {
  .card-header {
    text-align: center;
    span {
      font-size: 20px;
    }
  }
}
el-card{
    padding: 0;
}
</style>
