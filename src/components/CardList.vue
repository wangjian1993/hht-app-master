<template>
	<div class="app">
		<div class="list">
			<ul>
				<li @click="goEducation()" v-if="isEdu">
					<div class="item-img"><img src="" /></div>
					<div class="item-name">
						<p>智慧早教</p>
						<p>共1首</p>
					</div>
				</li>
				<li v-for="(item, index) in courseData" :key="item.id" @click="goLearning(item.id)">
					<div class="item-img"><img :src="item.coverImage" v-on:error.once="moveErrorImg($event)" /></div>
					<div class="item-name">
						<p>{{ item.name }}</p>
						<p>共{{ item.classHourCount }}首</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		audioData: '',
		isLearning: '',
		status: 0
	},
	computed: {
		...mapState(['isEdu']),
		courseData: function() {
			return this.audioData.filter((item, index) => {
				if (this.status == 0) {
					return item.status != 30;
				} else if (this.status == 30) {
					return item.status == 30;
				}
			});
		}
	},
	data() {
		return {};
	},
	methods: {
		moveErrorImg: function(event) {
			console.log('1111111');
			event.currentTarget.src = '../assets/image/course/qsy@2x.png';
		},
		goLearning(id) {
			if (this.isLearning) {
				this.$router.push({ name: 'learning', query: { id: id } });
			}
		},
		goEducation() {
			window.location.href = 'http://twifi.alilo.com.cn/xiaohai/hht/app/index.html#/education';
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
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
