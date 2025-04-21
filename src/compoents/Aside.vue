<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    default-active="2"
    text-color="#fff"
    :default-active="active"
    :collapse="isCollapse"
  >
    <p class="logo-title" >{{ isCollapse?"DIDI":"DIDI陪诊" }}</p>
    <TreeMenuVue :menuData="menuData"></TreeMenuVue>
  </el-menu>
</template>

<script setup>
import TreeMenuVue from "./TreeMenu.vue";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store=useStore()
const isCollapse=computed(()=>store.state.menu.isCollapse)
const router = useRouter();
const menuData = reactive(router.options.routes[0].children);

const active=computed(store.state.menu.menuActive)

</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;
}
.logo-title {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: white;
}
</style>
