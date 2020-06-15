<template>
  <div class="page-loadmore">
    <div
      class="loadmore-wrapper-top"
      ref="wrapper"
      :style="{ height: wrapperHeight + 'px' }"
    >
      <loadmore-comp
        :top-method="loadTop"
        @translate-change="translateChange"
        @top-status-change="handleTopChange"
        ref="loadmore"
      >
        <div slot="top" class="loadmore-top">
          <span
            v-show="topStatus !== 'loading'"
            :class="{ 'loadmore-top-rotate': topStatus === 'drop' }"
            >↓</span
          >
          <span v-show="topStatus === 'loading'">
            <snake-spinner></snake-spinner>
          </span>
        </div>

        <slot></slot>
      </loadmore-comp>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadmoreComp from './Index'
import SnakeSpinner from '@/components/Spinner/Snake'
export default {
  props: {
    // loadData: {
    //   type: Function,
    // },
  },
  components: {
    LoadmoreComp,
    SnakeSpinner,
  },

  created() {
    // for (let i = 1; i <= 20; i++) {
    //   this.list.push(i);
    // }
  },

  mounted() {
    let courseIndexWrapper = document.querySelector('.course-index-wrapper')

    this.wrapperHeight =
      courseIndexWrapper.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top
  },
  data() {
    return {
      // list: [],
      topStatus: '',
      wrapperHeight: 0,
      translate: 0,
      moveTranslate: 0,
    }
  },
  computed: {
    // ...mapGetters(["isShowTabbar", "isShowPlayer"]),
    tabbarHeight() {
      return 0
    },
  },

  methods: {
    handleTopChange(status) {
      // this.moveTranslate = 1;
      this.topStatus = status
    },
    translateChange(translate) {
      // const translateNum = +translate;
      // this.translate = translateNum.toFixed(2);
      // this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
      setTimeout(() => {
        // this.loadData();
        this.$emit('loadData')
        // let firstValue = this.list[0];
        // for (let i = 1; i <= 10; i++) {
        //   this.list.unshift(firstValue - i);
        // }
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
  },
}
</script>

<style lang="less" scoped>
.page-loadmore {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.loadmore-wrapper-top {
  height: 100%;
  margin-top: -1px;
  overflow: scroll;
  // background-color: #00ffff;
}

.loading-background {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  transition: 0.2s linear;
}

.loadmore-listitem {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #eee;
  text-align: center;
  &:first-child {
    border-top: solid 1px #eee;
  }
}

.loadmore-top {
  display: flex;
  justify-content: center;
  span {
    width: 100%;
    height: 100px;
    display: block;
    transition: 0.2s linear;
    vertical-align: middle;
    text-align: center;
  }
  & > span:first-child {
    // height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #ff0000;
  }
  & > span:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #00ffff;
  }
}

.loadmore-top-rotate {
  transform: rotate(180deg);
}
</style>
