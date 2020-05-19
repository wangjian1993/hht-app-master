<template>
	<div class="app">
		<div class="course-card" @click="detailsRouter(item.id)" v-for="(item, index) in list" :key="item.id" :class="index == 0 ? 'course-bottom' : ''">
			<div class="course-ok" v-if="item.learningState == 20"><span>已添加</span></div>
			<div class="course-card-box">
				<div class="card-name">
					<p>{{ item.name }}</p>
				</div>
				<div class="card-name-subhead">
					<p>{{ item.description }}</p>
				</div>
				<div class="card-lable">
					<span v-for="opt in item.labels">{{opt.name}}</span>
				</div>
				<div class="card-time">
					<p>
						<img src="../assets/image/home_conner_iconalbum@2x.png" alt="" />
						{{ item.classHour }}
					</p>
					<p>
						<img src="../assets/image/home_conner_iconalbum@2x.png" alt="" />
						{{ item.particiPants }}参与
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: ''
	},
	data() {
		return {};
	},
	methods: {
		detailsRouter(id) {
			this.$router.push({ name: 'details', query: { id: id } });
		}
	},
	components: {}
};
</script>

<style lang="less" scoped>
.course-card {
	width: 349px;
	height: 153px;
	background-color: #ffffff;
	box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
	border-radius: 8px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	position: relative;
}
.course-bottom {
	margin-top: -58px;
}
.course-ok {
	position: absolute;
	right: 0;
	top: 0;
	span {
		display: inline-block;
		width: 55px;
		height: 20px;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 0 8px 0px 8px;
		text-align: center;
		line-height: 20px;
		font-size: 13px;
		color: rgba(0, 0, 0, 0.8);
	}
}
.course-card-box {
	width: 317px;
	height: 123px;
	margin: 0 auto;
	position: relative;
	.card-name {
		font-size: 20px;
		color: rgba(0, 0, 0, 0.8);
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
		position: absolute;
		bottom: 0;
		align-items: center;
		p {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.3);
			img {
				width: 11px;
				height: 11px;
			}
			&:nth-of-type(2) {
				margin-left: 20px;
			}
		}
	}
}
</style>
