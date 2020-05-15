<template>
	<div class="app">
		<div class="course-card" @click="detailsRouter()">
			<div class="course-ok"><span>已添加</span></div>
			<div class="course-card-box">
				<div class="card-name"><p>智慧早教课程</p></div>
				<div class="card-name-subhead"><p>课程包副标题占位符号最长最长二字符个字符…</p></div>
				<div class="card-lable">
					<span>启蒙英语</span>
					<span>启蒙英语</span>
				</div>
				<div class="card-time">
					<p>
						<img src="../assets/image/home_conner_iconalbum@2x.png" alt="" />
						每天
					</p>
					<p>
						<img src="../assets/image/home_conner_iconalbum@2x.png" alt="" />
						11参与
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		detailsRouter(){
			this.$router.push({ name: 'details', query: { id: 1 } });
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
	margin-top: -58px;
	display: flex;
	align-items: center;
	position: relative;
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
