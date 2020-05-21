<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="course-data">
				<div class="header"></div>
				<v-data></v-data>
			</div>
			<div class="course-list"><v-course-list :courseData="userCourseList"></v-course-list></div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Data from '@/components/Data.vue';
import CourseList from '@/components/CourseList.vue';
export default {
	data() {
		return {
			isLoading: true
		};
	},
	computed: {
		...mapState(['userCourseList','isEdu'])
	},
	created() {
		console.log("啊哈哈哈")
		console.log('111', this.userCourseList);
	},
	components: {
		'v-data': Data,
		'v-course-list': CourseList
	}
};
</script>

<style lang="less" scoped>
.header {
	width: 100%;
	height: 118px;
	background: url(../../assets/image/vip_smartedu_topimg1@3x.png) no-repeat;
	background-size: 100%;
	position: relative;
}
</style>
