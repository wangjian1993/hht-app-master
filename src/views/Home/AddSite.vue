<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<page-video :videoURL="videoURL" :videoPic="videoPic" :aspectRatio="aspectRatio"></page-video>
			<div class="site" id="site">
				<van-address-edit
					:area-list="areaList"
					:tel-maxlength="11"
					:area-columns-placeholder="['省', '市', '区']"
					@save="onSave"
					@click-area="siteAdd"
					@change-area="siteHide"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import areaList from '../../assets/js/area';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { getDayTime } from '../../common/util.js';
import PageVideo from '../../components/PageVideo.vue';
import Axios from "axios";
export default {
	data() {
		return {
			isLoading: true,
			areaList,
			videoURL: 'https://resource.alilo.com.cn/static/video/g9s.mp4',
			videoPic: 'https://resource.alilo.com.cn/static/img/vip_gift.jpg',
			aspectRatio: '16:9'
		};
	},
	created() {
		this.$store.dispatch('setUserInfoAction');
		// if (this.type == 'ios') {
		// 	this.$store.dispatch('setBabyInfoAction');
		// } else {
		// 	console.log("调用用户信息=====")
		// 	this.$store.dispatch('setBabyInfoADAction');
		// }
		try {
			window.android.controlRefresh(false);
		} catch (e) {
			//TODO handle the exception
		}
	},
	computed: {
		...mapState(['system'])
	},
	methods: {
		getUrlKey(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},
		onSave(content) {
			console.log(content);
			this.$toast.loading({
				message: '添加中...',
				forbidClick: true
			});
			let data = {
				userId: localStorage.getItem('user'),
				name: content.name,
				phone: content.tel,
				address: content.province + content.city + content.county + content.addressDetail
			};
			let log = {
				event: 'register_vip',
				user_id: localStorage.getItem('user'),
				uuid: localStorage.getItem('user'),
				content_name: '保存',
				name: content.name,
				phone: content.tel,
				area: content.province + content.city + content.county,
				address: content.addressDetail,
				channel_id: 65,
				os: this.system,
				create_time: getDayTime()
			};
			this.$axios
				.addSite(data)
				.then(res => {
					if (res.data.code == 1) {
						this.$toast.success('添加成功');
						Axios.post('http://big.data.alilo.com.cn/track/app', log)
							.then(function(response) {
								console.log(response);
							})
							.catch(function(error) {
								console.log(error);
							});
						try {
							if (this.system == 'ios') {
								var item = {
									url: localStorage.getItem('yzLink') || this.$route.query.buyLink
									// hwUrl: 'vip_' + this.$route.query.hwUrl,
									// productType: 0,
									// addressId: res.data.data,
									// isHW: true
								};
								console.log("item",item)
								window.webkit.messageHandlers.redirectToYZ.postMessage(item);
							} else {
								var data = {
									url: localStorage.getItem('yzLink'),
									hwUrl: 'vip_' + this.$route.query.hwUrl,
									productType: 0,
									addressId: res.data.data,
									isHW: true
								};
								console.log('data', data);
								window.android.playCourse('redirectToYZ', JSON.stringify(data));
							}
						} catch (e) {
							console.log(e);
							this.$toast('请更新新版火火兔APP');
							//TODO handle the exception
						}
					}
				})
				.catch(err => {
					console.error(err);
					this.$toast.fail(err);
				});
		}
	},
	components: {
		PageVideo
	}
};
</script>

<style lang="less" scoped>
.content {
	width: 100%;
	margin: 0 auto;
}
.site-img {
	width: 375px;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
