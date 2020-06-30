<template>
  <div class="app">
	<van-empty image="error" description="请在火火兔APP中登陆使用" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';	
export default {
  data() {
    return {
		
    }
  },
  computed: {
  	...mapState(['userInfo']),
  },
  created() {
  	if(this.userInfo.phone != ''){
		this.$router.push({ name: 'index' });
	}
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
</style>
