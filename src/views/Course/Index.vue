<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="course-header">
				<div class="course-box-tab">
					<div class="course-tab-item">
						<div @click="courstTab(1)">
							<p>智慧早教</p>
							<span v-if="courseTab == 1"></span>
						</div>
						<div @click="courstTab(2)">
							<p>我的课程</p>
							<span v-if="courseTab == 2"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="course-card" v-if="courseTab == 1">
				<div class="course-box-top"></div>
				<v-card :list="lsit"></v-card>
			</div>
			<div v-if="courseTab == 2">
				<div class="course-user-top"><p>绑定故事机开机后按课程键，即可播放今日课程哦！</p></div>
				<div class="course-user-day">
					<div class="course-day-title">
						<p>今日学习</p>
						<span>
							查看更多
							<van-icon name="arrow" />
						</span>
					</div>
					<div class="course-list"><v-course-list></v-course-list></div>
				</div>
				<div class="course-user-all">
					<div class="course-day-title">
						<p>我的全部课程</p>
						<!-- <span>查看更多<van-icon name="arrow" /></span> -->
					</div>
					<div class="course-user-tab">
						<p :class="courseUserTab == 1 ? 'tabActive' : ''" @click="courseTabCLick(1)">
							学习中
							<span v-if="courseUserTab == 1"></span>
						</p>
						<p :class="courseUserTab == 2 ? 'tabActive' : ''" @click="courseTabCLick(2)">
							已完成
							<span v-if="courseUserTab == 2"></span>
						</p>
					</div>
					<div class="course-user-list"><v-card-list></v-card-list></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import CourseList from '@/components/CourseList.vue';
import CradList from '@/components/CardList.vue';
import Card from '@/components/Card.vue';

export default {
	data() {
		return {
			isLoading: true,
			courseTab: 1,
			courseUserTab: 1,
			lsit: []
		};
	},
	created() {
		this.getCourseAll();
	},
	methods: {
		onClickLeft() {
			// Toast('返回');
		},
		onClickRight() {
			// Toast('按钮');
		},
		getCourseAll() {
			this.$axios
				.getCoursePack()
				.then(res => {
					if (res.data.code == 1) {
						this.lsit = res.data.data;
					}
				})
				.catch(err => {});
		},
		courstTab(index) {
			this.courseTab = index;
		},
		courseTabCLick(index) {
			this.courseUserTab = index;
		}
	},
	components: {
		'v-header': Header,
		'v-card': Card,
		'v-course-list': CourseList,
		'v-card-list': CradList
	}
};
</script>

<style lang="less" scoped>
@import '../../assets/css/courseIndex.less';
</style>
