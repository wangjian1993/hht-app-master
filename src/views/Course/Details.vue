<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="course-box-top"></div>
			<div class="course-card-details">
				<div class="course-card">
					<div class="course-card-box">
						<div class="card-name">
							<p>{{ detailsList.name }}</p>
						</div>
						<div class="card-name-subhead">
							<p>{{ detailsList.description }}</p>
						</div>
						<div class="card-lable">
							<span v-for="opt in detailsList.labels">{{ opt.name }}</span>
						</div>
						<div class="card-time">
							<p>
								<img src="../../assets/image/home_conner_iconalbum@2x.png" alt="" />
								{{ detailsList.classHour }}
							</p>
							<p>
								<img src="../../assets/image/home_conner_iconalbum@2x.png" alt="" />
								{{ detailsList.particiPants }}参与
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="details-tab">
				<div class="details-tab-itme">
					<p @click="detalsTab(1)" :class="tabAction == 1 ? 'tabAction' : ''">简介</p>
					<p @click="detalsTab(2)" :class="tabAction == 2 ? 'tabAction' : ''">计划</p>
				</div>
				<div class="tab-content">
					<v-details-intro v-if="tabAction == 1" :list="detailsList"></v-details-intro>
					<v-details-list v-if="tabAction == 2" :data="detailsList.courseList"></v-details-list>
				</div>
			</div>
			<div class="details-btn" @click="addCourse" v-if="detailsList.learningState == 10"><p>会员免费加入</p></div>
			<div class="details-btn1" @click="delCoures" v-if="detailsList.learningState == 20"><p>从我的课程中删除</p></div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import DetailsIntro from '@/components/DetailsIntro.vue';
import DetailsList from '@/components/DetailsList.vue';
export default {
	data() {
		return {
			isLoading: false,
			title: '课程详情',
			tabAction: 1,
			detailsList: []
		};
	},
	created() {
		this.getDetails();
	},
	methods: {
		detalsTab(index) {
			this.tabAction = index;
		},
		addCourse() {
			this.$router.push({ name: 'addCourse', query: { id: this.$route.query.id } });
		},
		getDetails() {
			this.$axios
				.getCourseDetails(this.$route.query.id)
				.then(res => {
					if (res.data.code == 1) {
						this.detailsList = res.data.data;
						this.isLoading = true;
						this.$store.dispatch('setCourseDetails', res.data.data);
					}
				})
				.catch(err => {});
		},
		delCoures() {
			this.$toast.loading({
				message: '删除中...',
				forbidClick: true
			});
			this.$axios
				.getCourseDel(this.$route.query.id)
				.then(res => {
					if (res.data.code == 1) {
						this.$toast.success('删除成功');
						this.$router.push({ name: 'index' });
					}
				})
				.catch(err => {});
		}
	},
	components: {
		'v-header': Header,
		'v-details-intro': DetailsIntro,
		'v-details-list': DetailsList
	}
};
</script>

<style lang="less" scoped>
@import '../../assets/css/courseDetails.less';
</style>
