<template>
  <div>
    <div>
      <el-menu class="navbar" mode="horizontal" style="min-width: 920px">
        <hamburger
          class="hamburger-container"
          :toggleClick="toggleSideBar"
          :isActive="sidebar.opened"
        ></hamburger>
        <tags ref="child"></tags>
        <div class="avatar-container" style="height: 56px">
          <span class="name">欢迎您，××角色</span>
        </div>
        <div @click="logout" class="loginOut">
          <img
            :src="loginOut"
            alt="退出登录"
            style="width: 20px; height: 20px; vertical-align: middle"
          />
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Levelbar from "./Levelbar";
import Hamburger from "components/Hamburger";
import loginOut from "assets/images/icon_loginOut.png";
import tags from "./Tags";
import bus from "./bus";
export default {
  components: {
    Levelbar,
    Hamburger,
    tags
  },
  data() {
    return {
      currentRole: -1,
      visible: false,
      roleList: [],
      loginOut,
    };
  },
  computed: { ...mapGetters(["sidebar", "name", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$confirm("确定退出登录嘛?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.removeItem("roleId");
        localStorage.removeItem("roleName");
        window.location.replace(`/login`);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 56px;
  line-height: 56px;
  border-radius: 0 !important;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 64px;
    height: 56px;
    float: left;
    padding: 0 17px;
    -webkit-tap-highlight-color: transparent;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .loginOut {
    display: block;
    position: absolute;
    right: 15px;
    padding-right: 5px;
    padding-left: 5px;
    cursor: pointer;
    top: -1px;
  }
  .avatar-container {
    height: 56px;
    display: inline-block;
    position: absolute;
    right: 60px;
    .name {
      cursor: pointer;
      position: relative;
      font-size: 18px;
      color: #333333;
      text-align: right;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.changeRole {
  list-style: none;
  line-height: 36px;
  padding: 0 20px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;
}
.changeRole:hover {
  background: #377BE9;
  color: #fff;
}
.roleWapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 110px;
  height: 110px;
  overflow-y: auto;
}
.roleName {
  width: 116px;
  height: 36px;
  line-height: 36px;
  color: #666666;
  font-size: 12px;
  background: #ffffff;
  cursor: pointer;
  .roleImg {
    width: 24px;
    vertical-align: middle;
    margin-top: -5px;
  }
  .name {
    text-align: left;
    display: inline-block;
    width: 76px;
  }
}
.roleActive {
  background: #377BE9;
  box-shadow: 0px 0px 20px 0px rgba(211, 221, 255, 0.25);
  color: #fff;
}
</style>
