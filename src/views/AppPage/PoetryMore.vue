<template>
	<div class="content" v-wechat-title="($route.meta.title = titleName)">
		<div class="list" v-for="(item, index) in list.resList" :key="item.id" @click="details(index, item)">
			<div class="list-img"><img :src="item.coverImage" alt="" /></div>
			<div class="list-name">
				<p>{{ item.name }}</p>
				<p>
					<van-icon name="clock-o" color="#000000" size="8" />
					<span>{{ setTime(item.timeLength) }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { timeCycle } from '@/common/util.js';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			list: [],
			type: 0,
			titleName: ''
		};
	},
	computed: {
		...mapState(['poetryMore', 'system'])
	},
	mounted() {
		this.titleName = this.list.name;
	},
	created() {
		this.type = this.$route.query.type;
		this.list = this.poetryMore.length == 0 ? JSON.parse(localStorage.getItem('albumMore')) : this.poetryMore;
	},
	methods: {
		details(index, item) {
			if (this.type == 10) {
				try {
					let data = {
						audioList: this.list.resList,
						playIndex: index
					};
					window._czc.push(['_trackEvent', '火火兔学古诗', '点击', item.name]);
					if (this.system == 'ios') {
						console.log('ios');
						window.webkit.messageHandlers.audioPlayerPlay.postMessage(data);
					} else {
						window.android.playCourse('audioPlayerPlay', JSON.stringify(data));
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
			if (this.type == 40) {
				try {
					let data = {
						type: 1,
						id: item.id,
						name: item.name
					};
					if (this.system == 'ios') {
						console.log('ios');
						window.webkit.messageHandlers.share.postMessage(data);
					} else {
						window.android.playCourse('share', JSON.stringify(data));
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		},
		setTime(val) {
			return timeCycle(val);
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.content {
	padding-top: 20px;
}
.list {
	width: 345px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	padding-bottom: 13px;
	margin-bottom: 13px;
	border-bottom: 1px rgba(0, 0, 0, 0.04) solid;
	.list-img {
		width: 54px;
		height: 54px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
	.list-name {
		padding-left: 8px;
		p {
			font-family: SourceHanSansCN-Regular;
			font-size: 15px;
			color: rgba(0, 0, 0, 0.74);
			padding: 5px 0;
			&:nth-of-type(2) {
				font-family: SourceHanSansCN-Regular;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.36);
				span {
					padding-left: 5px;
				}
			}
		}
	}
}
</style>
