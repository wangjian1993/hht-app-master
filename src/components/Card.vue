<template>
	<div class="app">
		<div class="course-card" @click="goEducation()">
			<div class="course-card-box">
				<div class="course-img"><img src="../assets/image/2.png" alt="" /></div>
				<div class="card-name"><p>智慧早教课程</p></div>
				<div class="card-name-subhead"><p>智慧早教</p></div>
				<!-- <div class="card-time">
					<p><img src="../assets/image/home_conner_iconalbum@2x.png" alt="" /></p>
					<p><img src="../assets/image/home_conner_iconalbum@2x.png" alt="" /></p>
				</div> -->
				<div class="course-state">
					<p class="course-state-btn2" v-if="eduData">已添加</p>
					<p class="course-state-btn1" v-else>会员免费</p>
				</div>
			</div>
		</div>
		<div class="course-card" @click="detailsRouter(item.id)" v-for="(item, index) in list" :key="item.id">
			<div class="course-card-box">
				<div class="course-img"><img :src="item.coverImage" alt="" /></div>
				<div class="card-name">
					<p>{{ item.name }}</p>
				</div>
				<div class="card-name-subhead">
					<p>{{ item.description }}</p>
				</div>
				<!-- <div class="card-lable">
					<span v-for="opt in item.labels">{{ opt.name }}</span>
				</div> -->
				<div class="card-time">
					<p>
						<img src="../assets/image/course/icon_time@2x.png" alt="" />
						{{ item.classHour }}
					</p>
					<p>
						<img src="../assets/image/home_conner_iconalbum@2x.png" alt="" />
						<span>{{ item.particiPants }}</span>
						参与
					</p>
				</div>
				<div class="course-state">
					<p class="course-state-btn2" v-if="item.learningState == 20">已添加</p>
					<p class="course-state-btn1" v-else>会员免费</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: '',
		eduData: false
	},
	data() {
		return {
			userId:null
		};
	},
	created() {
		this.userId =localStorage.getItem("courseBaby");
	},
	methods: {
		detailsRouter(id) {
			// if(this.userId == null){
			// 	this.$toast('请登录火火兔APP');
			// 	return
			// }
			this.$router.push({ name: 'course/details', query: { id: id } });
		},
		goEducation() {
			if(this.userId == null){
				this.$toast('请登录火火兔APP');
				return
			}
			this.$router.push({ name: 'education' });
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.course-card {
	width: 349px;
	background-color: #fff;
	box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
	border-radius: 8px;
	margin: 0 auto;
	margin-bottom: 20px;
}
.course-card-box {
	width: 317px;
	margin: 0 auto;
	padding: 10px 0;
	.course-img {
		width: 321px;
		height: 146px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 6px;
		}
	}
	.card-name {
		font-size: 20px;
		color: rgba(0, 0, 0, 0.8);
		padding-top: 10px;
	}
	.card-name-subhead {
		font-size: 15px;
		color: rgba(0, 0, 0, 0.5);
	}
	.card-lable {
		display: flex;
		margin-top: 10px;
		span {
			display: inline-block;
			background-color: rgba(255, 138, 102, 0.08);
			border-radius: 12px;
			color: #ff8a66;
			font-size: 13px;
			padding: 4px 8px;
			margin-right: 11px;
		}
	}
	.card-time {
		width: 100%;
		display: flex;
		align-items: center;
		padding-top: 10px;
		p {
			font-size: 14px;
			color: rgba(0, 0, 0, 0.3);
			img {
				width: 15px;
				height: 15px;
				margin-top: -2px;
			}
			&:nth-of-type(2) {
				margin-left: auto;
				span {
					color: #ff6666;
				}
			}
		}
	}
	.course-state {
		padding-top: 20px;
		p {
			width: 104px;
			height: 30px;
			border-radius: 15px;
			text-align: center;
			line-height: 30px;
			font-size: 16px;
		}
		.course-state-btn1 {
			background-color: #f9c003;
			color: #fff;
		}
		.course-state-btn2 {
			color: rgba(0, 0, 0, 0.3);
			background: #fff;
			border: solid 1px rgba(0, 0, 0, 0.3);
		}
	}
}
</style>
