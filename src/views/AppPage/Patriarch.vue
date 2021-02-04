<template>
	<div class="patriarch-content" :class="system == 'ios' ? 'pb' : ''">
		<div class="patriarch-list" v-for="(item, index) in list" :key="index">
			<div class="list-title">
				<p>{{ item.question }}</p>
			</div>
			<div class="list-info">
				<div class="info-img">
					<img src="../../assets/image/avatar0.jpg" alt="" />
					<span>{{ item.name }}</span>
				</div>
				<div class="info-wechat" @click="showDialog(index)">
					<span>
						<img src="../../assets/image/icon_wx@3x.png" alt="" />
						向ta咨询
					</span>
				</div>
			</div>
			<div class="list-content">{{ item.answer }}</div>
		</div>
		<van-dialog v-model="show" close-on-click-overlay width="270" confirm-button-text="咨询" confirm-button-color="#007aff" show-cancel-button @confirm="goWechatMini">
			<div class="dialog-content">
				<div class="dialog-img">
					<img src="../../assets/image/avatar0.jpg" alt="" />
					<span>{{ dialogList.realname + '(' + dialogList.name + ')' }}</span>
				</div>
				<div class="dialog-text" v-html="dialogList.about"></div>
			</div>
		</van-dialog>
	</div>
</template>

<script>
import content from '@/common/question.json';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			list: content,
			show: false,
			dialogList: []
		};
	},
	computed: {
		...mapState(['system'])
	},
	created() {
		console.log(this.list);
	},
	methods: {
		showDialog(index) {
			this.show = !this.show;
			this.dialogList = this.list[index];
		},
		confirm(){
			console.log("咨询");
			// this.goWechatMini();
		},
		goWechatMini(){
			window._czc.push(['_trackEvent', '火火兔APP家长锦囊', '点击', '微信咨询']);
			let data = {
				mini_program_id: 'gh_1f54dd7d30fe',
				path: '/pages/wechat/wechat'
			};
			if (this.system == 'ios') {
				window.webkit.messageHandlers.redirectMiniProgram.postMessage(data);
			} else {
				window.android.playCourse('redirectMiniProgram', JSON.stringify(data));
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.patriarch-content {
	position: relative;
	width: 375px;
	margin: 0 auto;
	height: 100%;
	background: #faf6f5;
	padding-top: 12px;
}
.pb{
	padding-bottom: 144px;
}
.patriarch-list {
	width: 343px;
	background-color: #ffffff;
	border-radius: 8px;
	margin: 0 auto;
	padding-bottom: 16px;
	margin-bottom: 16px;
	.list-title {
		width: 320px;
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.7);
		padding: 13px 0;
		margin: 0 auto;
		border-bottom: solid 1px rgba(233,233,233,.5);
		p {
			line-height: 1.2;
		}
	}
}
.list-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 15px;
	margin: 0 auto;
	.info-img {
		display: flex;
		align-items: center;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
		span {
			font-family: PingFangSC-Medium;
			font-size: 12px;
			color: rgba(0, 0, 0, 0.8);
			padding-left: 8px;
		}
	}
	.info-wechat {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 86px;
		height: 32px;
		background-color: #40c958;
		border-radius: 16px;
		img {
			width: 20px;
			height: 20px;
		}
		span {
			font-family: PingFangSC-Medium;
			font-size: 12px;
			color: #ffffff;
		}
	}
}
.list-content {
	font-family: PingFangSC-Regular;
	font-size: 14px;
	padding: 0 15px;
	color: rgba(0, 0, 0, 0.6);
	line-height: 1.2;
}
.dialog-img {
	display: flex;
	align-items: center;
	padding: 20px 18px;
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	span {
		font-family: PingFangSC-Medium;
		font-size: 12px;
		color: rgba(0, 0, 0, 0.8);
		padding-left: 8px;
	}
}
.dialog-text {
	padding: 0 15px;
	padding-bottom: 25px;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	line-height: 1.5;
	border-bottom: solid 1px rgba(216,216,216,.5);
}
</style>
