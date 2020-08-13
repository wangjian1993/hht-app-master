<template>
	<div class="app">
		<div class="loadingding center" v-show="!isLoading"><van-loading size="30px" color="#ff6666" vertical>加载中</van-loading></div>
		<div class="content" v-show="isLoading">
			<div class="site-img"><img src="../../assets/image/111110000.jpg" alt="" /></div>
			<div class="site">
				<van-address-edit
					:area-list="areaList"
					show-search-result
					:search-result="searchResult"
					:tel-maxlength=11
					:area-columns-placeholder="['请选择', '请选择', '请选择']"
					@save="onSave"
					@delete="onDelete"
					@change-detail="onChangeDetail"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import areaList from '../../assets/js/area';
export default {
	data() {
		return {
			isLoading: true,
			areaList,
			searchResult: []
		};
	},
	created() {},
	computed: {},
	methods: {
		onSave() {
			Toast('save');
		},
		onDelete() {
			Toast('delete');
		},
		onChangeDetail(val) {
			if (val) {
				this.searchResult = [
					{
						name: '黄龙万科中心',
						address: '杭州市西湖区'
					}
				];
			} else {
				this.searchResult = [];
			}
		}
	},
	components: {}
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
