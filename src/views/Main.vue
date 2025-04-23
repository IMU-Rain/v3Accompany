<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="w"><AsideVue /></el-aside>
      <el-container>
        <el-header style="padding: 0; width: 100%"><NavHeaderVue /></el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import AsideVue from "../compoents/Aside.vue";
import NavHeaderVue from "../compoents/navHeader.vue";
import { computed, ref } from "vue";
const store = useStore();
const isCollapse = computed(()=>store.state.menu.isCollapse);
const w=computed(()=>isCollapse.value?"63px":"250px")

</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
}
.el-container {
  height: 100%;
}
</style>
