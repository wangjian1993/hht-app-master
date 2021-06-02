<template>
	<div class="content">
		<van-field v-model="text" label="测试地址" />
		<van-button type="primary" @click="urlClick()">确定</van-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: ''
		};
	},
	methods: {
		urlClick() {
			window.location.href = this.text;
		}
	},
	components: {}
};
</script>

<style lang="less" scoped></style>
