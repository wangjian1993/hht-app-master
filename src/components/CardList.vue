<template>
	<div class="app">
		<div class="list">
			<ul>
				<li>
					<div class="item-img"><img src="../assets/image/content1.jpg" /></div>
					<div class="item-name">
						<p>火火兔</p>
						<p>火火兔</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
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
		li {
			width: 100%;
			display: flex;
			align-items: center;
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
