<template>
  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="name" label="昵称" width="180" />
    <el-table-column prop="permissions_id" label="所属组别">
      <template #default="scope">
        {{ permissionName(scope.row.permissions_id) }}
      </template>
    </el-table-column>
    <el-table-column prop="mobile" label="手机号" />
    <el-table-column prop="active" label="状态">
      <template #default="scope">
        <div class="flex-box">
          <el-tag :type="scope.row.active ? 'success' : 'danger'">{{
            scope.row.active ? "正常" : "失效"
          }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="创建时间">
      <template #default="scope">
        <el-icon><Clock /></el-icon>
        <span>{{ scope.row.create_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="open(scope.row)" type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogFromVisable"
    title="添加权限"
    width="500"
    :before-close="beforeClose"
  >
    <el-form
      label-width="100"
      ref="formRef"
      label-position="left"
      :model="form"
    >
      <el-form-item label="手机号" prop="mobile"
        ><el-input v-model="form.mobile" disabled
      /></el-form-item>
      <el-form-item label="昵称" prop="name"
        ><el-input v-model="form.name"
      /></el-form-item>
      <el-form-item label="菜单权限" prop="permissions_id">
        <el-select
          v-model="form.permissions_id"
          placeholder="请选择菜单权限"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer
      ><el-button @click="confirm(formRef)">提交</el-button></template
    >
  </el-dialog>
  
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { authAdmin, menuSelectlist, updateUser } from "../../../api";
import dayjs from "dayjs";
const dialogFromVisable = ref(false);
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
});
// 列表数据
const tableData = reactive({
  list: [],
  total: 0,
});
onMounted(() => {
  menuSelectlist().then(({ data }) => {
    if ((data.code = 10000)) {
      options.value = data.data;
      getListData();
    }
  });
});
const getListData = () => {
  authAdmin(paginationData).then(({ data }) => {
    if ((data.code = 10000)) {
      data.data.list.forEach((element) => {
        element.create_time = dayjs(element.create_time).format("YYYY-MM-DD");
      });
      tableData.list = data.data.list;
      tableData.total = data.total;
    }
  });
};
const options = ref();
// 根据权限id匹配权限名称
const permissionName = (id) => {
  const data = options.value.find((item) => item.id === id);
  return data ? data.name : "超级管理员";
};
// 编辑页面
const formRef = ref();
const form = reactive({
  mobile: "",
  name: "",
  permissions_id: "",
});
const open = (rowData) => {
  dialogFromVisable.value = true;
  Object.assign(form, {
    name: rowData.name,
    permissions_id: rowData.permissions_id,
    mobile: rowData.mobile,
  });
};
const beforeClose = () => {
  dialogFromVisable.value = false;
};
const confirm = (formRef) => {
  const { name, permissions_id } = form;
  updateUser({ name, permissions_id }).then(({ data }) => {
    if ((data.code = 10000)) {
      dialogFromVisable.value = false;
      getListData();
    }
  });
};
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
</style>
