<template>
  <div class="app">
    <van-tabs @click="tabClick" class="details-list-tab" color="#ff6666">
      <van-tab v-for="item in dataWith" :key="item.id" :title="item.name">
      </van-tab>
    </van-tabs>

    <div class="list-content">
      <p class="list-content-title">
        <span @click="EbbinghausClick"
          >艾宾浩斯曲线学习计划
          <img src="../assets/image/course/icon_tips@2x.png"
        /></span>
      </p>
      <div class="list-box">
        <ul
          v-for="(titleItem, index) in tabData.classHours"
          :key="`${titleItem.courseId}-${titleItem.index}`"
        >
          <div class="list-item-title">
            <span
              >第{{
                titleItem.index | convertCNNum(titleItem.index, true)
              }}课时</span
            >
            <span
              >新学{{ titleItem.newLearning | convertCNNum }}首
              <i v-if="titleItem.review"
                >| 复习{{ titleItem.review | convertCNNum }}首</i
              ></span
            >
          </div>
          <li v-for="listItem in titleItem.audios" :key="listItem.name">
            <p class="item-name">{{ listItem.name }}</p>
            <div class="item-time">
              <p>
                <img src="../assets/image/course/icon_time@2x.png" alt="" />
                {{ timeCycle(listItem.timeLength) }}
              </p>
              <p>
                <img
                  src="../assets/image/course/icon_listen备份@2x.png"
                  alt=""
                />
                {{ tranNumber(listItem.browseCount, 1) }}
              </p>
            </div>
          </li>
          <div class="list-box-divider"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: '',
  },
  data() {
    return {
      tabData: [],
    }
  },
  computed: {
    dataWith() {
      return this.data.map((item) => {
        const name =
          item.name.length > 5 ? item.name.slice(0, 6) + '...' : item.name
        return {
          ...item,
        }
      })
    },
  },
  created() {
    this.tabData = this.dataWith[0]
  },
  methods: {
    tabClick(index, title) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.tabData = this.dataWith[index]
    },
    timeCycle(val) {
      var h = Math.floor(val / 3600)
      var m =
        Math.floor((val / 60) % 60) >= 10
          ? Math.floor((val / 60) % 60)
          : '0' + Math.floor((val / 60) % 60)
      var s =
        Math.floor(val % 60) >= 10
          ? Math.floor(val % 60)
          : '0' + Math.floor(val % 60)
      var format =
        Math.floor(val / 3600) != 0 ? h + ':' + m + ':' + s : m + ':' + s
      return format
    },
    tranNumber(num, point) {
      let numStr = num.toString()
      if (numStr.length > 8) {
        let decimal = numStr.substring(
          numStr.length - 8,
          numStr.length - 8 + point
        )
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
      //大于6位数是十万 (以10W分割 10W以下全部显示)
      else if (numStr.length > 0) {
        let decimal = numStr.substring(
          numStr.length - 4,
          numStr.length - 4 + point
        )
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      }
    },
    async EbbinghausClick() {
      const dialog = await this.$createDialog(
        () => import('@/views/Course/EbbinghausModal.vue'),
        {
          destroyOnClose: true,
          on: {
            close: (v) => {
              dialog.close()
            },
          },
        }
      )
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.list-content {
  width: 345px;
  margin: 0 auto;
  margin-top: 20px;
  .list-content-title {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;

    // background-color: #ff0000;
    img {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      position: relative;
      top: -1px;
    }
  }
  .list-box {
    width: 345px;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px 3px rgba(76, 76, 76, 0.06);
    border-radius: 8px;
    margin: 0 auto;
    ul {
      width: 100%;
      padding: 18px 12px;
      padding-bottom: 0;
      // background-color: #00ffff;
      .list-item-title {
        width: 100%;
        padding-left: 12px;
        display: flex;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-family: 'SourceHanSansCN-Medium';
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: rgba(0, 0, 0, 0.8);
          }
          &:nth-of-type(2) {
            min-width: 110px;
            max-height: 18px;
            display: inline-block;
            margin-left: auto;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.3);
            text-align: right;
            & > i {
              font-style: normal;
              // background-color: #ff0000;
            }
          }
        }
      }
      li {
        padding-left: 12px;
        padding-right: 12px;
        margin-top: 19px;
        .item-name {
          font-family: 'SourceHanSansCN-Normal';
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.8);
        }
        .item-time {
          display: flex;
          align-items: center;
          p {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.4);
            &:nth-of-type(2) {
              padding-left: 16px;
            }
            img {
              width: 14px;
              height: 14px;
              margin-top: -1px;
            }
          }
        }
      }
    }
  }
  .list-box-divider {
    width: 100%;
    height: 1px;
    margin-top: 18px;
    background-color: #f3f3f3;
  }
}

.details-list-tab {
  overflow-x: scroll;
  // background-color: #ff0000;
  /deep/ .van-tab--active {
    // background-color: #fff000;
  }

  /deep/ .van-tabs__line {
    width: 30px !important;
    // display: none;
  }

  /deep/ .van-tabs__wrap {
    overflow-x: auto;
  }

  /deep/ .van-tab__text {
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
