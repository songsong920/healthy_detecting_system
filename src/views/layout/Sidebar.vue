<template>
  <div>
    <div class="sidebar-logo-container">
      <transition name="sidebarLogoFade">
        <div v-if="!isCollapse" key="collapse" class="sidebar-logo-link">
          <div>健康状态监测系统</div>
        </div>
        <router-link v-else key="expand" class="sidebar-logo-link" to="#" :title="areaName">
          <img :src="healthy_logo" style="width: 32px" class="sidebar-logo" />
        </router-link>
      </transition>
    </div>
    <div class="menu-wrapper">
      <el-menu
        class="sidebar-el-menu"
        default-active="0"
        mode="vertical"
        unique-opened
        active-text-color="#fff"
        background-color="#293045"
        text-color="#fff"
        menu-trigger="click"
        :collapse="isCollapse"
      >
        <template
          v-for="(item, index) in roleId == 1
            ? adminMenus
            : roleId == 2
            ? doctorMenus
            : patientMenus"
        >
          <template v-if="item.children && item.children.length > 0">
            <el-submenu :index="index + ''" :key="index">
              <template slot="title">
                <icon-svg v-if="item.icon" :icon-class="item.icon"></icon-svg>
                <span slot="title" class="menu-link-title">{{ item.title }}</span>
              </template>
              <template v-for="(subItem, idx) in item.children">
                <el-submenu
                  v-if="subItem.children && subItem.children.length"
                  :index="`${index}-${idx}`"
                  :key="`${index}-${idx}`"
                >
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item
                    v-for="(threeItem, i) in subItem.children"
                    :key="`${index}-${idx}-${i}`"
                    :index="`${index}-${idx}-${i}`"
                    :class="{ checked: checkedName === threeItem.title }"
                  >
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
              :index="index + ''"
              :key="index"
              :class="{ checked: checkedName === item.title }"
            >
              <icon-svg v-if="item.icon" :icon-class="item.icon"></icon-svg>
              <template slot="title">
                <a @click="toRoutePage(item.code)" class="menu-link-title"> {{ item.title }}</a>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import healthy_logo from 'assets/images/healthy_logo.png'
export default {
  data() {
    return {
      healthy_logo,
      patientMenus: [
        {
          children: [],
          code: "home",
          icon: "homepage",
          id: 2,
          title: "系统首页",
          type: "menu"
        },
        {
          children: [],
          code: "patient/personalInfo",
          icon: "student",
          id: 2,
          title: "个人详情",
          type: "menu"
        },
        {
          children: [],
          code: "doctor/myDoctor",
          icon: "password",
          id: 6,
          title: "医生栏目",
          type: "menu"
        },
        {
          children: [],
          code: "patient/prescription",
          icon: "service",
          id: 8,
          title: "处方管理 ",
          type: "menu"
        },
        {
          children: [],
          code: "patient/dailyReport",
          icon: "signup",
          id: 8,
          title: "每日上报",
          type: "menu"
        }
      ],
      doctorMenus: [
        {
          children: [],
          code: "home",
          icon: "homepage",
          id: 2,
          title: "系统首页",
          type: "menu"
        },
        {
          children: [],
          code: "account",
          icon: "student",
          id: 3,
          title: "个人信息",
          type: "menu"
        },
        {
          children: [],
          code: "patient/patientInfo",
          icon: "signup",
          id: 2,
          title: "患者信息",
          type: "menu"
        },
        {
          children: [],
          code: "patient/alarmInfo",
          icon: "password",
          id: 5,
          title: "告警信息",
          type: "menu"
        },
        {
          children: [],
          code: "medicine/medicineManager",
          icon: "service",
          id: 7,
          title: "药物系统",
          type: "menu"
        }
      ],
      adminMenus: [
        {
          children: [],
          code: "home",
          icon: "homepage",
          id: 2,
          title: "系统首页",
          type: "menu"
        },
        {
          children: [],
          code: "patient/statistics",
          icon: "statistics",
          id: 1,
          title: "数据统计",
          type: "menu"
        },
        {
          children: [],
          code: "patient/abnormal",
          icon: "service",
          id: 2,
          title: "异常患者",
          type: "menu"
        },
        {
          children: [],
          code: "patient/patientManager",
          icon: "student",
          id: 3,
          title: "患者管理",
          type: "menu"
        },
        {
          children: [],
          code: "doctor/doctorManager",
          icon: "password",
          id: 5,
          title: "医生管理",
          type: "menu"
        },
        {
          children: [],
          code: "doctor/scheduling",
          icon: "college",
          id: 4,
          title: "医生排班",
          type: "menu"
        }
      ]
    };
  },
  methods: {
    toRoutePage(url) {
      this.$router.push("/" + url);
    }
  },
  mounted() {
    const path = window.location.pathname.split("/");
    console.log(path);
    const urls = [];
    path.forEach((e) => {
      if (e) {
        urls.push(`/${e}`);
      }
    });
    this.activeName = urls;
  },
  computed: {
    ...mapGetters(["sidebar", "permissionMenus", "name", "areaName"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    checkedName() {
      return this.$route.name;
    },
    roleId() {
      return 2;
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .el-menu--collapse {
  width: 60px;
}
.sidebar-container {
  background: #293045;
}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  // background: #4287CB;
  text-align: center;
  & .sidebar-logo-link {
    color: #fff;
    font-size: 20px;
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 188px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 56px;
      font-size: 20px;
      font-family: "oppoR";
      vertical-align: middle;
    }
  }
  &.collapse {
    width: 100%;
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.menu-wrapper {
  /deep/ .el-menu {
    border-right: 0 !important;
    background: transparent;
    .el-menu-item {
      color: #fff;
      background: #fff;
      &.checked {
        position: relative;
        background: #19202f !important;
      }

      a {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }

    li.el-menu-item.is-active {
      border: none;
    }
  }
}
.menu-link-title {
  cursor: pointer;
  margin-left: 5px;
}
</style>

