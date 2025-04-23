<template>
  <template v-for="item in menuData">
    <el-menu-item
      :index="nanoid()"
      v-if="!item.children"
      @click="handleClick(item.meta)"
    >
      <el-icon size="20"><component :is="item.meta.icon" /></el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="nanoid()">
      <template #title>
        <el-icon size="20"><component :is="item.meta.icon" /></el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <TreeMenu :menuData="item.children"></TreeMenu
    ></el-sub-menu>
  </template>
</template>

<script setup>
import { nanoid } from "nanoid";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const { menuData } = defineProps(["menuData"]);
const store = useStore();
console.log(store.state.menu.menuActive);

const router = useRouter();
const handleClick = (meta) => {
  router.push(meta.path);
  store.commit("addMenu", meta);
};
</script>

<style lang="less" scoped></style>
