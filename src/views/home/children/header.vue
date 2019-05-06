<template>
    <div class="header">
        <div class="logo-wrapper">
            <span class="logo">
                LOGO
                <!-- <img src="../../../assets/logo.png" alt=""/> -->
            </span>
            <span class="space-line"></span>
            <span class="logo-text">
                猫头鹰
            </span>
        </div>
        <div class="menu-item">
            管理中心
        </div>

    </div>
</template>
<script>
   

    export default {
        name: 'Header',
        data (){
            return {
              
              
            }
        },
        
        computed: {
           
        },
        methods:{
        },
        watch:{
           
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
   
    .header {
        background: #292c31;
        line-height: 58px;
        color: #ffffff;
        font-size: 16px;
        padding: 0 20px;

    }

    .space-line {
        display: inline-block;
        width: 1px;
        height: 16px;
        margin: 0 5px;
        background-color: #838487;
    }

    .logo {
        display: inline-block;
        height: 60px;
        color: #fff;
        img{
            width: 68px;
        }
    }

    .logo-text {
        display: inline-block;
        height: 60px;
        font-weight: bold;
        color: white;
    }
    .logo-wrapper {
        float: left;
    }

    .menu-item {
        float: left;
        margin-left: 50px;
        position: relative;
        color: white;
    }

    .menu-item:after {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #46bafe;
    }

    .header:after {
        content: '';
        display: block;
        clear: both;
    }
</style>
