<template>
  <el-container class="wrapper">
    <el-header>header</el-header>
    <el-container>
      <el-aside :width="`${asideWidth}px`">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :default-active="$route.path"
          unique-opened
          collapse-transition
        >
          <el-menu-item index="/">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/about">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">其他</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/comp1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">comp1首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/comp1/about">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">comp1其他</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/comp2/">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">comp2首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/comp2/about">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">comp2其他</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/comp2/component-test">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">组件</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <div id="sub-container"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      asideWidth: 200,
    };
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  /deep/ .el-menu {
    height: 100%;
  }
}
</style>

