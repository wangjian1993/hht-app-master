<template>
	<div class="app">
		<div class="empty" v-if="courseData.length == 0 && !isEdu"><van-empty class="custom-image" :image="emptyImg" description="你今天没有课程安排哦～" /></div>
		<div class="list" v-else>
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
					<div class="list-btn" @click="schooltime('', 1)"><span>上课</span></div>
				</li>
				<li v-for="(item, index) in dataFilter" :key="item.id">
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
					<div class="list-btn" @click="schooltime(item, 0)"><span>上课</span></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		courseData: '',
		isShow: false
	},
	data() {
		return {
			emptyImg: require('../assets/image/course/qsy@2x.png'),
			babyid: 0
		};
	},
	computed: {
		...mapState(['isEdu', 'system']),
		dataFilter: function() {
			return this.courseData.filter((item, index) => {
				if (this.isShow) {
					return index < 3;
				} else {
					return item;
				}
			});
		}
	},
	created() {
		this.babyid = localStorage.getItem('courseBaby');
	},
	methods: {
		schooltime(item, type) {
			if (type == 0) {
				this.$axios
					.getCourseData(item.courseGroupId, item.id, this.babyid)
					.then(res => {
						if (res.data.code == 1) {
							let array = {
								title: '智慧早教第0天',
								coursePackId: item.courseGroupId,
								courseId: item.id,
								babyId: this.babyid,
								course: []
							};
							let audioData = res.data.data.audios;
							audioData.forEach(function(data, index) {
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
			} else if (type == 1) {
				var dd = new Date();
				var y = dd.getFullYear();
				var m = dd.getMonth() + 1; //获取当前月份的日期
				var d = dd.getDate();
				let currentTime = y + '-' + m + '-' + d;
				this.$axios
					.getDayCourse(currentTime)
					.then(res => {
						console.log('点击====');
						let array = {
							title: '智慧早教第' + this.applyTime + '天',
							coursePackId: 0,
							courseId: localStorage.getItem('cid'),
							babyId: localStorage.getItem('babyId'),
							course: []
						};
						// let array = [];
						if (res.data.code == 1) {
							let item = res.data.data;
							item.forEach(function(data, index) {
								let obj = {
									url: data.url,
									id: data.id,
									name: data.name
								};
								array.course.push(obj);
								// array.push(obj);
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
						} else {
							this.$toast('暂无今日早教课程');
						}
					})
					.catch(err => {});
			}
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.list {
	width: 100%;
	padding: 10px 0;
	ul {
		width: 345px;
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
				line-height: 26px;
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
