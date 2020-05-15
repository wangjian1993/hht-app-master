<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="course-top">
				<div class="course-top-img"><img src="../../assets/image/content1.jpg" alt="" /></div>
				<div class="course-top-name">
					<p>唱唱跳跳，运动我的小身体</p>
					<p>培养孩子的创造力和情绪表达能力</p>
					<p>2999人已学习</p>
				</div>
			</div>
			<div class="caurse-list">
				<v-title :title="title"></v-title>
				<v-card-list></v-card-list>
			</div>
			<div class="details-btn" @click="addCourse">
				<p>确定</p>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';	
import CradList from '@/components/CardList.vue';
import Title from '@/components/Title.vue';
export default {
	data() {
		return {
			isLoading: true,
			title:"课程包内容"
		};
	},
	methods: {},
	components: {
		'v-title': Title,
		'v-header': Header,
		'v-card-list': CradList,
	}
};
</script>

<style lang="less" scoped>
.course-top {
	width: 345px;
	margin: 16px auto;
	display: flex;
	align-items: center;
	.course-top-img {
		width: 115px;
		height: 115px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
	.course-top-name {
		padding-left: 12px;
		p{
			&:nth-of-type(1) {
				font-size: 17px;
				color: rgba(0, 0, 0, 0.8);
			}
			&:nth-of-type(2) {
				font-size: 13px;
				color: rgba(0, 0, 0, 0.5);
				padding-top: 10px;
			}
			&:nth-of-type(3) {
				font-size: 12px;
				color: rgba(0, 0, 0, 0.5);
				padding-top: 38px;
			}
		}
	}
}
.details-btn {
	position: fixed;
	bottom: 34px;
	width: 100%;
	text-align: center;
	margin: 34px 0;
	p {
		width: 345px;
		height: 48px;
		line-height: 48px;
		background-image: linear-gradient(90deg, #ff6666 0%, #ff9043 100%);
		border-radius: 24px;
		font-size: 17px;
		color: #ffffff;
		margin: 0 auto;
	}
}
</style>
