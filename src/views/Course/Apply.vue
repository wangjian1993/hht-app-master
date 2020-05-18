<template>
	<div class="app">
		<v-header :title="title"></v-header>
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="apply-img">
				<img src="../../assets/image/checkin.png" alt="" />
				<p>报名成功</p>
				<p>请在我的课程中查看上课信息，一起努力哦～</p>
			</div>
			<div class="apply-wacht">
				<div class="wacht-img"><img src="../../assets/image/content1.jpg" alt="" /></div>
				<div class="wacht-text">
					<p>用微信扫码加入专业交流群， 在线宝爸宝妈互吐心声一起 养娃～</p>
					<span>加入微信群</span>
				</div>
			</div>
			<div class="details-btn" @click=""><p>确定</p></div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
	data() {
		return {
			title: '报名成功',
			isLoading: true
		};
	},
	components: {
		'v-header': Header
	}
};
</script>

<style lang="less" scoped>
.apply-img {
	width: 100%;
	margin: 0 auto;
	margin-top: 40px;
	text-align: center;
	p {
		&:nth-of-type(1) {
			font-size: 18px;
			color: #4dc42a;
		}
		&:nth-of-type(2) {
			margin-top: 32px;
			font-size: 15px;
			color: rgba(0, 0, 0, 0.8);
		}
	}
}
.apply-wacht {
	width: 345px;
	margin: 0 auto;
	margin-top: 54px;
	display: flex;
	// align-items: center;
	.wacht-img {
		width: 113px;
		height: 105px;
		border-radius: 2px;
		margin: 22px 16px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.wacht-text {
		width: 182px;
		height: 105px;
		margin-top: 22px;
		position: relative;
		p {
			font-size: 14px;
			color: rgba(0, 0, 0, 0.7);
		}
		span {
			width: 104px;
			height: 32px;
			line-height: 32px;
			text-align: center;
			display: inline-block;
			background-color: #4dc42a;
			border-radius: 19px;
			color: #ffffff;
			font-size: 13px;
			position: absolute;
			right: 0;
			bottom: 0;
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
