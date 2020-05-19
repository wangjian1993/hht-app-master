<template>
	<div class="app">
		<div class="intro-img"><img :src="list.introduce" alt=""></div>
		<div class="intro-list">
			<v-title :title="title"></v-title>
			<div class="intro-itme"><v-card-list :data="list.courseList"></v-card-list></div>
		</div>
	</div>
</template>

<script>
import Title from '@/components/Title.vue';
import CradList from '@/components/CardList.vue';
export default {
	props: {
		list:""
	},
	data() {
		return {
			title: '课程包内容'
		};
	},
	components: {
		'v-title': Title,
		'v-card-list': CradList
	}
};
</script>

<style lang="less" scoped>
.intro-itme {
	width: 345px;
	margin: 0 auto;
}
</style>
