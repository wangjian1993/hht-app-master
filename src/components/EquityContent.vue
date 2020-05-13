<template>
	<div class="app">
		<div class="content"><div v-for="(item, index) in equityList" v-if="item.id == id" class="equity-content" v-html="item.content"></div></div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		id: {
			type: Number
		}
	},
	data() {
		return {};
	},
	computed: {
		...mapState(['equityList'])
	},
	methods: {
		ToText(HTML) {
			var input = HTML;
			return input
				.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
				.replace(/<[^>]+?>/g, '')
				.replace(/\s+/g, ' ')
				.replace(/ /g, ' ')
				.replace(/>/g, ' ');
		}
	},
	components: {}
};
</script>

<style lang="less">
.content {
	width: 95%;
	margin: 20px auto;
}
.equity-content {
  overflow-y:auto;
  overflow-x:hidden;
  width: 100%;
  font-size: 16px;
  img{
	  width: 100%;
  }
}

.equity-content img{
  width: 100%;
}
</style>
