<template>
  <div class="app">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="content" v-show="isLoading">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div>
          <ul>
            <li
              v-for="item in audioList"
              class="more-item"
              @click="musicDaile(item.id, item.name)"
            >
              <div class="more-item-left">
                <img :src="item.coverImage" alt="" />
              </div>
              <div class="more-item-right">
                <p class="van-ellipsis">{{ item.name }}</p>
                <span>共{{ item.childResCount }}首</span>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      audioList: [],
      loading: false,
      finished: false,
      page: 1,
      total: 0,
    }
  },
  components: {},
  created() {
    let self = this
    // setTimeout(res => {
    this.isLoading = true
    // }, 1000);
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.$axios
          .getVipContent(this.page)
          .then((res) => {
            this.page += 1
            this.audioList = this.audioList.concat(res.data.data.list)
            this.total = res.data.data.totalPage
          })
          .catch((err) => {
            console.error(err)
            this.$toast.fail(err)
          })
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        console.log(this.total)
        console.log(this.page)
        if (this.page >= this.total) {
          this.finished = true
        }
      }, 1000)
    },
    musicDaile(id, name) {
      try {
        let data = {
          type: 1,
          id: id,
          name: name,
        }
        if (this.system == 'ios') {
          window.webkit.messageHandlers.share.postMessage(data)
        } else if (this.system == 'android') {
          console.log('专辑详情')
          window.android.postMessage('share', JSON.stringify(data))
        }
      } catch (e) {
        this.$toast('请在APP中打开')
        //TODO handle the exception
      }
    },
  },
}
</script>

<style lang="less" scoped>
.more-item {
  width: 95%;
  margin: 20px auto;
  display: flex;
  .more-item-left {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
  .more-item-right {
    padding-left: 10px;
    p {
      width: 100%;
      padding-top: 5px;
      font-size: 14px;
      color: #000000;
      opacity: 0.8;
    }
  }
}
</style>
