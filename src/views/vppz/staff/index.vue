<template>
  <el-button icon="Plus" type="success" @click="open()">添加</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="添加陪护师"
    width="500"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="auto"
      :rules
      label-position="left"
    >
      <el-form-item prop="id" v-if="false"
        ><el-input v-model="form.id"
      /></el-form-item>
      <el-form-item prop="name" label="昵称"
        ><el-input v-model="form.name"
      /></el-form-item>
      <el-form-item prop="avatar" label="头像"
        ><el-button
          v-if="!form.avatar"
          type="primary"
          @click="(dialogImgVisible = true), getPhotoList()"
          >上传</el-button
        >
        <el-image
          v-else
          :src="form.avatar"
          style="width: 100px; height: 100px"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="18" :max="60" />
      </el-form-item>
      <el-form-item prop="mobile" label="电话"
        ><el-input v-model="form.mobile"
      /></el-form-item>
      <el-form-item label="是否生效" prop="active">
        <el-radio-group v-model="form.active">
          <el-radio :value="1" size="large">生效</el-radio>
          <el-radio :value="0" size="large">失效</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="confirmFrom" type="primary">确认</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogImgVisible" title="选择图片" width="680">
    <div class="image-list">
      <div
        v-for="(item, index) in listImg"
        :key="item.name"
        class="img-box"
        @click="selectIndex = index"
      >
        <div v-if="selectIndex === index" class="select">
          <el-icon color="#fff"><Check /></el-icon>
        </div>
        <el-image style="width: 148px; height: 148px" :src="item.url" />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogImgVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmImg"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="sex" label="性别"> </el-table-column>
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="active" label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.active === 1 ? 'primary' : 'danger'">{{
          scope.row.active === 1 ? "正常" : "失效"
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间">
      <template #default="scope">
        <el-icon>
          <Clock />
        </el-icon>
        <span>{{ scope.row.create_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)" size="small"
          >修改</el-button
        >
        <el-button type="danger" @click="delCompanion(scope.row)" size="small"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    layout="prev, pager, next"
    class="fr"
    :total="paginationData.total"
    :v-model:page-size="paginationData.pageSize"
  />
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  companion,
  companionList,
  deleteCompanion,
  photoList,
} from "../../../api";
import dayjs from "dayjs";
const dialogVisible = ref(false);
const dialogImgVisible = ref(false);
const formRef = ref();
const selectIndex = ref();
const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请填写昵称" }],
  mobile: [{ required: true, trigger: "blur", message: "请填写手机号" }],
  avatar: [{ required: true, message: "请选择头像" }],
});
const confirmImg = () => {
  form.avatar = listImg[selectIndex.value].url;
  dialogImgVisible.value = false;
};
const confirmFrom = () => {
  dialogVisible.value = false;
  companion(form).then(({ data }) => {
    if ((data.code = 10000)) {
      getCompanionList();
    }
  });
};
// 添加表格数据
const form = reactive({
  id: "",
  name: "",
  mobile: "",
  age: 18,
  sex: "1",
  avatar: "",
  active: 1,
});
const formSource = reactive({
  id: "",
  name: "",
  mobile: "",
  age: 18,
  sex: "1",
  avatar: "",
  active: 1,
});
const listImg = reactive([]);
const handleClose = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const tableData = reactive([]);
const getCompanionList = () => {
  companionList({
    pageNum: paginationData.pageNum,
    pageSize: paginationData.pageSize,
  }).then(({ data }) => {
    if (data.code === 10000) {
      paginationData.total = data.data.total;
      data.data.list.forEach((element) => {
        element.create_time = dayjs(element.create_time).format("YYYY-MM-DD");
        if (element.sex === "1") {
          element.sex = "男";
        } else {
          element.sex = "女";
        }
      });
      Object.assign(tableData, data.data.list);
    }
  });
};
const getPhotoList = () => {
  photoList().then(({ data }) => {
    if (data.code === 10000) {
      Object.assign(listImg, data.data);
    }
  });
};
const open = (row = formSource) => {
  nextTick(() => {
    if (row) {
      Object.assign(form, {
        id: row.id,
        name: row.name,
        sex: row.sex,
        age: row.age,
        mobile: row.mobile,
        active: row.active,
        avatar: row.avatar,
      });
    }
  });
  dialogVisible.value = true;
};
const delCompanion = (rowData) => {
  const id = JSON.stringify(rowData.id);
  deleteCompanion([id]).then(({ data }) => {
    getCompanionList();
  });
};
onMounted(getCompanionList);
</script>

<style lang="less" scoped>
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    display: inline-block;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
