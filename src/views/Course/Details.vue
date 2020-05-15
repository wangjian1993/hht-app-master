<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="course-box-top"></div>
			<div class="course-card-details">
				<div class="course-card">
					<div class="course-card-box">
						<div class="card-name"><p>智慧早教课程</p></div>
						<div class="card-name-subhead"><p>课程包副标题占位符号最长最长二字符个字符…</p></div>
						<div class="card-lable">
							<span>启蒙英语</span>
							<span>启蒙英语</span>
						</div>
						<div class="card-time">
							<p>
								<img src="../../assets/image/home_conner_iconalbum@2x.png" alt="" />
								每天
							</p>
							<p>
								<img src="../../assets/image/home_conner_iconalbum@2x.png" alt="" />
								11参与
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
					<v-details-intro v-if="tabAction == 1"></v-details-intro>
					<v-details-list v-if="tabAction == 2"></v-details-list>
				</div>
			</div>
			<div class="details-btn" @click="addCourse">
				<p>会员免费加入</p>
			</div>
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
			isLoading: true,
			title: '课程详情',
			tabAction: 1
		};
	},
	methods: {
		detalsTab(index) {
			this.tabAction = index;
		},
		addCourse(){
			this.$router.push({ name: 'addCourse', query: { id: 1 } });
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
