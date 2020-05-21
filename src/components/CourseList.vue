<template>
	<div class="app">
		<div class="list">
			<ul>
				<li v-if="isEdu">
					<div class="list-name">
						<p>智慧早教课程</p>
						<p>
							共
							<span>30</span>
							课时 |
							<span>30</span>
							分钟
						</p>
					</div>
					<div class="list-btn" @click=""><span>上课</span></div>
				</li>
				<li v-for="(item, index) in courseData" :key="item.id">
					<div class="list-name">
						<p>
							{{ item.name }}
							<span v-if="item.status == 20">已完成</span>
						</p>
						<p>
							共
							<span>{{ item.classHourCount }}</span>
							课时 |
							<span>{{ item.avgDuration }}</span>
							分钟
						</p>
					</div>
					<div class="list-btn" @click="schooltime(item)"><span>上课</span></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		courseData: ''
	},
	data() {
		return {};
	},
	computed: {
		...mapState(['isEdu','system'])
	},
	methods: {
		schooltime(item) {
			console.log("上课")
			this.$axios
				.getCourseData(item.courseGroupId,item.id)
				.then(res => {
					if (res.data.code == 1) {
						let array = {
							title: '智慧早教第0天',
							coursePackId: item.courseGroupId,
							courseId: localStorage.getItem('cid'),
							babyId: localStorage.getItem('babyId'),
							course: []
						};
						let item =res.data.data.audios;
						item.forEach(function(data, index) {
							let obj = {
								url: data.url,
								id: data.id,
								name: data.name
							};
							array.course.push(obj);
						});
						console.log('array', array);
						try {
							this.$toast('获取早教课程成功');
							if (this.system == 'ios') {
								window.webkit.messageHandlers.course_play.postMessage(array);
							} else if (this.system == 'android') {
								window.android.playCourse('course_play', JSON.stringify(array));
							}
						} catch (e) {
							this.$toast('获取早教课程失败');
							//TODO handle the exception
						}
					}
				})
				.catch(err => {});
		},
	},
	components: {}
};
</script>

<style lang="less" scoped>
.list {
	width: 100%;
	box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
	border-radius: 8px;
	padding: 10px 0;
	ul {
		width: 325px;
		margin: 0 auto;
		li {
			padding: 10px 0;
			display: flex;
			align-items: center;
			.list-name {
				p {
					&:nth-of-type(1) {
						font-size: 16px;
						color: rgba(0, 0, 0, 0.8);
						span {
							font-size: 12px;
							color: #26b8ef;
							padding-left: 10px;
						}
					}
					&:nth-of-type(2) {
						font-size: 13px;
						color: rgba(0, 0, 0, 0.5);
					}
				}
			}
			.list-btn {
				margin-left: auto;
				width: 67px;
				height: 26px;
				border-radius: 13px;
				border: solid 1px #ff985b;
				font-size: 15px;
				color: #ff985b;
				text-align: center;
			}
		}
	}
}
</style>
