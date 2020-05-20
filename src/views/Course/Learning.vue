<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="learning-top">
				<p>{{ courseData.name }}</p>
				<p>
					共
					<span>{{ courseData.classHourCount }}</span>
					课时 | 每节课预计
					<span>{{ courseData.avgDuration }}</span>
					分钟
				</p>
				<p>艾宾浩斯曲线学习计划</p>
			</div>
			<div class="learning-wacth">
				<img src="../../assets/image/rcfl_icon@3x.png" alt="" />
				<p>点击加入微信专业交流群</p>
				<span>加入</span>
			</div>
			<div class="learnig-list">
				<v-title :title="titleNmae"></v-title>
				<div class="list-box">
					<ul v-for="(titleItem, index) in courseData.classHours">
						<div class="list-item-title">
							<span>第{{ titleItem.index }}课时</span>
							<span>新学一首</span>
						</div>
						<li v-for="listItem in titleItem.audios">
							<p class="item-name">{{ listItem.name }}</p>
							<div class="item-time">
								<p>{{ timeCycle(listItem.timeLength) }}</p>
								<p>{{ listItem.browseCount }}w</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import tiem from '../../common/date.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			title: '学习中',
			isLoading: true,
			titleNmae: '今日课程关键词',
			courseData: []
		};
	},
	computed: {},
	created() {
		this.getCourseDeta(this.$route.query.id);
	},
	methods: {
		getCourseDeta(id) {
			console.log('id-----', id);
			this.$axios
				.getCourseDeta(id)
				.then(res => {
					if (res.data.code == 1) {
						this.courseData = res.data.data;
					}
				})
				.catch(err => {});
		},
		timeCycle(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val / 60) % 60) >= 10 ? Math.floor((val / 60) % 60) : '0' + Math.floor((val / 60) % 60);
			var s = Math.floor(val % 60) >= 10 ? Math.floor(val % 60) : '0' + Math.floor(val % 60);
			var format = Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s;
			return format;
		}
	},
	components: {
		'v-header': Header,
		'v-title': Title
	}
};
</script>

<style lang="less" scoped>
.learning-top {
	width: 345px;
	margin: 20px auto;
	p {
		&:nth-of-type(1) {
			font-size: 22px;
			color: rgba(0, 0, 0, 0.8);
		}
		&:nth-of-type(2) {
			font-size: 13px;
			color: rgba(0, 0, 0, 0.6);
			span {
				font-size: 24px;
				color: #ff8a66;
			}
		}
		&:nth-of-type(3) {
			font-size: 13px;
			color: rgba(0, 0, 0, 0.5);
		}
	}
}
.learning-wacth {
	width: 345px;
	margin: 0 auto;
	display: flex;
	height: 63px;
	align-items: center;
	background-color: #ffffff;
	box-shadow: 0px 2px 8px 3px rgba(76, 76, 76, 0.06);
	border-radius: 8px;
	img {
		width: 47px;
		height: 47px;
	}
	p {
		font-size: 16px;
		color: rgba(0, 0, 0, 0.8);
	}
	span {
		margin-left: auto;
		display: inline-block;
		width: 60px;
		height: 25px;
		border-radius: 24px;
		border: solid 1px #ff6666;
		font-size: 12px;
		color: #ff6666;
		text-align: center;
		line-height: 25px;
	}
}
.list-box {
	width: 345px;
	background-color: #ffffff;
	box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
	border-radius: 8px;
	margin: 0 auto;
	ul {
		width: 100%;
		padding: 18px 24px;
		border-bottom: 1px #f3f3f3 solid;
		.list-item-title {
			width: 100%;
			display: flex;
			align-items: center;
			span {
				&:nth-of-type(1) {
					font-size: 15px;
					color: rgba(0, 0, 0, 0.8);
				}
				&:nth-of-type(2) {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.3);
					margin-left: auto;
				}
			}
		}
		li {
			margin-top: 19px;
			.item-name {
				font-size: 16px;
				color: rgba(0, 0, 0, 0.8);
			}
			.item-time {
				display: flex;
				p {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.4);
					&:nth-of-type(2) {
						padding-left: 30px;
					}
				}
			}
		}
	}
}
</style>
