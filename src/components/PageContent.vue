<template>
	<div class="content"><component :is="setComponent()" :data="componentData"></component></div>
</template>

<script>
import PageHeadline from './PageHeadline.vue';
import PageAlbum from './PageAlbum.vue';
export default {
	props: {
		componentData: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {};
	},
	created() {
		console.log('2222', this.componentData.columnStyle.length);
	},
	methods: {
		setComponent() {
			if (this.componentData.columnStyle.length == 1) {
				return 'PageHeadline';
			} else if (this.componentData.columnStyle.length == 2) {
				return 'PageAlbum';
			}
		}
	},
	components: {
		PageHeadline,
		PageAlbum
	}
};
</script>

<style lang="less" scoped></style>
