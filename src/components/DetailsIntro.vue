<template>
	<div class="app">
		<div class="intro-img"><img :src="list.introduce" alt="" /></div>
		<div class="intro-list">
			<v-title :title="title"></v-title>
			<div class="intro-itme">
				<div class="list">
					<ul>
						<li v-for="(item, index) in list.courseList" :key="item.id" @click="goLearning(item.id)">
							<div class="item-img"><img :src="item.coverImage" /></div>
							<div class="item-name">
								<p>{{ item.name }}</p>
								<p>共{{ item.classHourCount }}首</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Title from '@/components/Title.vue';
import CradList from '@/components/CardList.vue';
export default {
	props: {
		list: ''
	},
	data() {
		return {
			title: '课程包内容',
			isstatus: 0
		};
	},
	created() {},
	methods: {
		goLearning(id) {
			this.$router.push({ name: 'course/learning', query: { id: id } });
		}
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
.intro-img {
	width: 375px;
	margin: 0 auto;
	img {
		width: 100%;
		height: 100%;
	}
}
.list {
	width: 345px;
	margin: 0 auto;
	ul {
		display: flex;
		flex-wrap: wrap;
		li {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 10px 0;
			.item-img {
				width: 69px;
				height: 69px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 8px;
				}
			}
			.item-name {
				padding-left: 12px;
				p {
					&:nth-of-type(1) {
						font-size: 16px;
						color: rgba(0, 0, 0, 0.8);
					}
					&:nth-of-type(2) {
						font-size: 13px;
						color: rgba(0, 0, 0, 0.4);
					}
				}
			}
		}
	}
}
</style>
