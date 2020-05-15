<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="course-header">
				<div class="course-box-tab">
					<div class="course-tab-item">
						<div><p>智慧早教</p><span></span></div>
						<div><p>我的课程</p><span></span></div>
					</div>
				</div>
			</div>
			<div class="course-box-top"></div>
			<div class="course-card"><v-card></v-card></div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Card from '@/components/Card.vue';
export default {
	data() {
		return {
			isLoading: true
		};
	},
	created() {},
	methods: {
		onClickLeft() {
			// Toast('返回');
		},
		onClickRight() {
			// Toast('按钮');
		}
	},
	components: {
		'v-header': Header,
		'v-card': Card
	}
};
</script>

<style lang="less" scoped>
@import '../../assets/css/courseIndex.less';
</style>
