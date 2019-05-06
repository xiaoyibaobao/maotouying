<template>
    <div>
      <!-- type 0 新增 1编辑 -->
        <v-add-edit :type="0"></v-add-edit>
    </div>
</template>
<script>
// 新增和编辑公共组件
import VAddEdit from "./components/add-edit";
export default {
  name: "CreateBlacklist",
  components: {
    VAddEdit
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {}
};
</script>
<style lang="scss" scoped rel="stylesheet/scss">

</style>


