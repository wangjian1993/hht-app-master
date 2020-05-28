<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div @click="load()">刷新</div>
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
			<div class="course-card mbot" v-if="courseTab == 1">
				<!-- <div class="course-box-top"></div> -->
				<v-card :list="lsit" :eduData="educationData"></v-card>
			</div>
			<div v-if="courseTab == 2">
				<div class="course-user-top" @click="deviseText()" v-if="isDeviseText">
					<p>绑定故事机开机后按课程键，即可播放今日课程哦！</p>
					<span><img src="../../assets/image/course/icon_popup_close@2x.png" alt="" /></span>
				</div>
				<div class="course-user-day">
					<div class="course-day-title">
						<p>今日学习</p>
						<span @click="courseMore" v-if="userList.length != 0">
							查看更多
							<van-icon name="arrow" />
						</span>
					</div>
					<div class="course-list"><v-course-list :isShow="isShow" :courseData="userList" :eduData="educationData"></v-course-list></div>
					<div class="more-img" v-if="userList.length != 0"><img src="../../assets/image/course/icon_device_spreadoutblue@2x.png" alt=""></div>
				</div>
				<div class="course-user-all mbot">
					<div class="course-day-title"><p>我的全部课程</p></div>
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
					<div class="course-user-list" v-if="userList.length != 0"><v-card-list :status="status" :audioData="userList" :isLearning="learning"></v-card-list></div>
					<div class="course-user-null" v-else>
						<p>没有正在学习课程噢，快去添加吧～</p>
						<span @click="addCourse">添加课程</span>
					</div>
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
			isLoading: false,
			courseTab: 1,
			courseUserTab: 1,
			lsit: [],
			userList: [],
			learning: true,
			educationData: false,
			status: 0,
			isShow: true,
			babyid: 0,
			isDeviseText: true
		};
	},
	created() {
		this.babyid = localStorage.getItem('courseBaby');
		this.getUserApply();
	},
	activated() {
		this.getCourseAll();
	},
	mounted() {},
	methods: {
		load() {
			location.reload();
		},
		onClickLeft() {
			// Toast('返回');
		},
		onClickRight() {
			// Toast('按钮');
		},
		addCourse() {
			this.courseTab = 1;
		},
		deviseText() {
			console.log("111")
			this.isDeviseText = !this.isDeviseText;
		},
		getUserApply() {
			this.$axios
				.userApplyTime(localStorage.getItem('cid'))
				.then(res => {
					if (res.data.code == 1) {
						this.educationData = true;
						this.$store.dispatch('setEduFlag', true);
					} else {
						this.educationData = false;
						this.$store.dispatch('setEduFlag', false);
					}
				})
				.catch(err => {});
		},
		getCourseAll() {
			this.$axios
				.getCoursePack(this.babyid)
				.then(res => {
					if (res.data.code == 1) {
						this.lsit = res.data.data;
					}
				})
				.catch(err => {});
			this.$axios
				.getUserCourse(this.babyid)
				.then(res => {
					if (res.data.code == 1) {
						this.$store.dispatch('setUserCourse', res.data.data);
						this.userList = res.data.data;
					}
				})
				.catch(err => {});
			setTimeout(() => {
				this.isLoading = true;
			}, 500);
		},
		courstTab(index) {
			this.isLoading = false;
			this.courseTab = index;
			setTimeout(() => {
				this.isLoading = true;
			}, 200);
		},
		courseTabCLick(index) {
			this.courseUserTab = index;
			if (index == 2) {
				this.status = 30;
			} else {
				this.status = 0;
			}
		},
		courseMore() {
			this.$router.push({ name: 'courseMore' });
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
