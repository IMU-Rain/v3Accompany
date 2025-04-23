<template>
  <div class="header-container">
    <div class="left flex-box">
      <el-icon size="20" class="icon" @click="store.commit('collapseMenu')"><Fold /></el-icon>
      <ul v-for="item in selectMenu" class="flex-box">
        <NavItem :item></NavItem>
      </ul>
    </div>
    <div class="right">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <div class="userinfo flex-box">
            <el-avatar
              src="http://159.75.169.224:5500/avatar.jpeg"
            />{{ userInfo.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import NavItem from './NavItem.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
const store=useStore()
const selectMenu=computed(()=>store.state.menu.selectMenu)
const logout=()=>{
    router.push('/login')
    localStorage.clear()
}
const userInfo=JSON.parse(localStorage.getItem('userInfo'))

</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
.header-container {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #fff;
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
  .left {
    height: 100%;
    .icon {
      cursor: pointer;
      width: 45px;
      height: 100%;
    }
    .icon:hover {
      background-color: #aaa;
    }
    ul{
        height: 100%;
        li{
            height: 100%;
        }
    };
  }
  
}
</style>
