<template>
  <div class="panel-heading">
    <div class="panel-lead">
      <div class="title">{{ title }}</div>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['title','description'])
</script>

<style lang="less" scoped>
.panel-heading{
    background-color: whitesmoke;
    padding: 10px 0px;
    .panel-lead{
        .title{
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: 10px;
        }
    }
}
</style>
