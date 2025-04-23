<template>
  <panelHead :title :description />
  <el-button icon="Plus" @click="open(null)" type="primary">新增</el-button>
  <el-table :data="tableData.list" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="name" label="昵称" width="180" />
    <el-table-column prop="permissionName" label="菜单权限" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    class="fr"
    :total="tableData.total"
    :background="false"
    :page-size="paginationData.pageSize"
  />
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
      :rules
    >
      <el-form-item prop="id" v-if="false">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="权限名称" prop="name"
        ><el-input v-model="form.name" placeholder="请输入权限名称"
      /></el-form-item>
      <el-form-item label="权限" prop="zone">
        <el-tree
          ref="treeRef"
          :data="permissionsData"
          show-checkbox
          style="max-width: 600px"
          node-key="id"
          :default-checked-keys="[4, 5]"
          :default-expanded-keys="[2]"
        />
      </el-form-item>
    </el-form>
    <template #footer><el-button @click="confirm">提交</el-button></template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import { menuList, userGetmenu, userSetmenu } from "../../../api";
import { ElMessage } from "element-plus";
const treeRef = ref();
const formRef = ref();
onMounted(() => {
  userGetmenu().then(({ data }) => {
    if (data.code === 10000) {
      permissionsData.value = data.data;
    }
  });
  getPageData();
});
const open = (rowData = {}) => {
  dialogFromVisable.value = true;
  nextTick(() => {
    if (rowData) {
      Object.assign(form, { id: rowData.id, name: rowData.name });
      treeRef.value.setCheckedKeys(rowData.permission);
    }
  });
};
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
});
// 列表数据
const getPageData = () => {
  menuList(paginationData).then(({ data }) => {
    if ((data.code = 10000)) {
      const { list, total } = data.data;
      tableData.list = list;
      tableData.total = total;
    }
  });
};
const tableData = reactive({
  list: [],
  total: 0,
});
const dialogFromVisable = ref(false);
const beforeClose = () => {
  dialogFromVisable.value = false;
  formRef.value.resetFields();
  treeRef.value.setCheckedKeys([4, 5]);
};
const form = reactive({
  name: "",
  permission: "",
  id: "",
});
const permissionsData = ref({});
// 表单提交
const confirm = () => {
  const permissions = JSON.stringify(treeRef.value.getCheckedKeys());
  userSetmenu({ name: form.name, permissions, id: form.id }).then(
    ({ data }) => {
      if (data.code === 10000) {
        ElMessage.success("操作成功");
        dialogFromVisable.value = false;
        getPageData();
      }
    }
  );
};
const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入权限名称" }],
});
const title = "菜单管理";
const description =
  "菜单规则通常对应一个控制器的方法，同时菜单栏数据也从规则中获取";
</script>

<style lang="less" scoped></style>
