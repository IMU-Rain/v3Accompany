<template>
  <div class="container" :class="{ selected: route.path === item.path }">
    <RouterLink :to="item.path"
      ><el-icon size="20px"> <component :is="item.icon"></component> </el-icon>
      <span>{{ item.name }}</span>
    </RouterLink>

    <el-icon :size="20" class="icon" @click="closeMenu(item)"
      ><Close
    /></el-icon>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps(["item"]);
const route = useRoute();
const router = useRouter();
const store = useStore();
const closeMenu = (item) => {
  const currentPath = route.path;
  const promise = store.dispatch("closeMenuAction", { item, currentPath });
  promise.then((path) => {
    router.push(path);
  });
};  </script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 0 5px;
  height: 100%;
  span {
    margin: 0 5px;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
  }
  .icon {
    opacity: 0;
  }
}
.container:hover {
  background-color: #f5f5f5;
  .icon {
    opacity: 1;
    cursor: pointer;
  }
}
.selected {
  color: #409eff;
}
</style>
