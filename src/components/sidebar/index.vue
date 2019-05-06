<template>
    <nav class="sidebar">
        <div class="nav-area" v-for="(menu,index) in menus" :key="index">
            <div v-if="menu.haveChildrens" class="nav-title1" @click="controlState(menu)" :class="{'active':menu.isSubShow}">
                <div class="nav-title-icon">
                    <img v-show="menu.isSubShow" src="../../assets/t1.png" alt="">
                    <img v-show="!menu.isSubShow" src="../../assets/t2.png" alt="">
                </div>
                <div class="title-text">
                    {{menu.title}}
                </div>
            </div>
            <div v-else class="nav-title1">
                <router-link v-bind:to="menu.url" tag="a">
                    <div class="nav-title-icon">
                        <img v-show="menu.isSubShow" src="../../assets/t1.png" alt="">
                        <img v-show="!menu.isSubShow" src="../../assets/t2.png" alt="">
                    </div>

                    <div class="title-text">
                        {{menu.title}}
                    </div>
                </router-link>
            </div>

            <div class="nav-row-wrapper" :class="{'active':menu.isSubShow}">
                <div class="nav-row" v-for="childMenu in menu.childrens" :class="{'active':isShow}" :key="childMenu.name">
                    <router-link v-bind:to="childMenu.link" tag="a">
                        <span class="nav-circle"></span>

                        <div class="nav-title2" :class="{active:childMenu.isActive}">
                            {{childMenu.name}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isShow: true,
      menus: [
        {
          isSubShow: true,
          title: "活动管理",
          haveChildrens: true,
          childrens: [
            {
              name: "创建活动",
              link: "/create_activity",
              isActive: false
            },
            {
              name: "活动列表",
              link: "/activity_list",
              isActive: false
            }
           
          ]
        },

        {
          isSubShow: true,
          title: "奖品管理",
          haveChildrens: true,
          childrens: [
            {
              name: "创建奖品",
              link: "/create_prize",
              isActive: false
            },
            {
              name: "奖品列表",
              link: "/prize_list",
              isActive: false
            }
          ]
        },
        {
          isSubShow: true,
          title: "黑名单管理",
          haveChildrens: true,
           childrens: [
            {
              name: "创建黑名单",
              link: "/create_blacklist",
              isActive: false
            },
            {
              name: "黑名单列表",
              link: "/blacklisting",
              isActive: false
            }
          ]
        }
      ]
    
    };
  },
  methods: {
    showNav: function() {
      this.isShow = "none";
    },
    controlState: function(menu) {
      return (menu.isSubShow = !menu.isSubShow);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
nav {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 170px;
  height: 100%;
  background: #e5e6e8;
}

.nav-row {
  font-size: 14px;
  color: #333333;
  line-height: 38px;
  position: relative;
  cursor: pointer;
  text-align: left;
  padding-left: 30px;
}

.nav-area {
  border-bottom: solid 1px #dcdcdc;
}

.nav-title1 {
  font-size: 14px;
  position: relative;
  height: 46px;
  background: #e5e6e8;
  padding-left: 20px;
  cursor: pointer;
}

.nav-title1.active {
  background: #46bafe;
}



.nav-row-wrapper {
  display: none;
}

.nav-row-wrapper.active {
  display: block;
}

.router-link-active {
  .nav-title2 {
    color: #46bafe;
  }

  .nav-circle {
    background: #46bafe;
  }

  .title-text {
    color: #46bafe;
  }
}

.nav-title2 {
  display: inline-block;
  vertical-align: middle;
}

.nav-title-icon {
  float: left;
  margin-top: 12px;
  margin-right: 12px;
}

.title-text {
  float: left;
  line-height: 46px;
}

.nav-title1:after {
  content: "";
  display: block;
  clear: both;
}

.nav-circle {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #666666;
  margin-right: 5px;
  vertical-align: middle;
}

.nav-title1.active:after {
  margin-top: -7px;
  width: 12px;
  height: 8px;
  background: url("../../assets/arrow.png") no-repeat;
  position: absolute;
  right: 10px;
  top: 24px;
}

.nav-row-wrapper {
  background: #ececec;
}
</style>
