<template>
  <div class="app">
    <div class="loadingding center" v-show="!isLoading">
      <van-loading size="30px" color="#ff6666" vertical>加载中</van-loading>
    </div>
    <div class="content" v-show="isLoading">
      <div class="report-name">
        <p>Hi, {{ babyInfo.nickName }}</p>
        <p>{{ month }}月份的成长记录已生成，快来看看吧！</p>
      </div>
      <div class="report-content">
        <div class="report-img-head">
          <img
            src="../../assets/image/vip_learningreporter_clip@3x.png"
            alt=""
          />
        </div>
        <div class="report-img-1">
          <img src="../../assets/image/ruler@3x.png" alt="" />
        </div>
        <div class="report-day">
          <p>
            坚持打卡
            <span>{{ sumDay }}</span>
            天
          </p>
          <p>
            累计学习
            <span>{{ time[0] }}</span>
            小时
            <span>{{ time[1] }}</span>
            分钟
          </p>
        </div>
        <div class="grow-up">
          <v-title :title="title[0]" :age="age"></v-title>
          <v-radar
            :radarList="radarList1"
            :radarNuber="radarList2"
            v-if="radarList1.length != 0"
          ></v-radar>
        </div>
        <div class="potential">
          <v-title :title="title[1]"></v-title>
          <div class="potential-list">
            <span v-for="item in peportList">{{ item.potential }}</span>
          </div>
        </div>
      </div>
      <div class="report-img-footer">
        <div class="report-img-2">
          <img src="../../assets/image/img_eraser@3x.png" alt="" />
        </div>
        <div class="report-img-3">
          <img src="../../assets/image/img_pencil@3x.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import Radar from '@/components/Radar.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: ['宝宝成长值', '宝宝成长潜力'],
      age: '本月成长值',
      size: ['24', '17', , '15', '12', '10'],
      peportList: [],
      radarList1: [],
      radarList2: [],
      isLoading: false,
      time: [],
      sumDay: 0,
      today: new Date(),
      month: null,
    }
  },
  computed: {
    ...mapState(['system', 'babyInfo', 'memberInfo']),
  },
  created() {
    this.month = this.today.getMonth() + 1
    this.getUserReport()
    this.getSumTime()
  },
  methods: {
    getUserReport() {
      let radar = []
      let radarVal = [{ value: [] }]
      this.$axios
        .getUserReport(this.month)
        .then((res) => {
          this.peportList = res.data.data.list
          let list = res.data.data.list
          let radarObj = {}
          let radarArray = []
          list.forEach(function(item, index) {
            radarObj.name = item.ability
            radarObj.max = 100
            radar.push(radarObj)
            radarArray.push(item.score)
          })
          radarVal[0].value = radarArray
          this.radarList1 = radar
          this.radarList2 = radarVal
          this.isLoading = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getSumTime() {
      this.$axios
        .sumTime(this.month)
        .then((res) => {
          let list = []
          this.sumDay = res.data.data.clockDays
          this.time = res.data.data
          let str = this.time.timeLength
          let array = str.split('小时')
          list.push(array[0])
          let m = array[1].split('分')
          list.push(m[0])
          this.time = list
        })
        .catch((err) => {
          console.error(err)
          this.$toast.fail(err)
        })
    },
  },
  components: {
    'v-title': Title,
    'v-radar': Radar,
  },
}
</script>

<style lang="less" scoped>
.app {
  position: absolute;
  width: 100%;
  background: url(../../assets/image/vip_learningreporter_bg@3x.png) no-repeat;
  background-size: 100% auto;
}
.report-name {
  width: 311px;
  margin: 0 auto;
  margin-top: 27px;
  p {
    color: #64442e;
    &:nth-of-type(1) {
      font-size: 24px;
    }
    &:nth-of-type(2) {
      font-size: 13px;
    }
  }
}
.report-content {
  width: 345px;
  height: 654px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 39px;
  position: relative;
  .report-img-head {
    width: 100%;
    text-align: center;
    position: absolute;
    top: -22px;
    img {
      width: 120px;
      height: 30px;
    }
  }
  .report-img-1 {
    width: 84px;
    height: 77px;
    position: absolute;
    right: -20px;
    top: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .report-day {
    width: 90%;
    margin: 0 auto;
    padding-top: 24px;
    p {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.8);
      span {
        font-size: 24px;
        color: #ff8a66;
      }
    }
  }
  .grow-up,
  .potential {
    width: 90%;
    margin: 0 auto;
  }
  .potential-list {
    width: 100%;
    position: relative;
    span {
      color: #ff8a66;
      background-color: rgba(255, 138, 102, 0.12);
      border-radius: 18px;
      padding: 4px 8px;
      &:nth-of-type(1) {
        position: absolute;
        top: 55px;
        left: 93px;
        font-size: 25px;
      }
      &:nth-of-type(2) {
        position: absolute;
        top: 0px;
        left: 46px;
        font-size: 17px;
      }
      &:nth-of-type(3) {
        position: absolute;
        top: 0px;
        left: 164px;
        font-size: 15px;
      }
      &:nth-of-type(4) {
        position: absolute;
        top: 27px;
        right: 22px;
        font-size: 15px;
      }
      &:nth-of-type(5) {
        position: absolute;
        top: 62px;
        right: 0px;
        font-size: 12px;
      }
      &:nth-of-type(6) {
        position: absolute;
        top: 90px;
        right: 76px;
        font-size: 15px;
      }
      &:nth-of-type(7) {
        position: absolute;
        top: 119px;
        left: 142px;
        font-size: 12px;
      }
      &:nth-of-type(8) {
        position: absolute;
        top: 92px;
        left: 55px;
        font-size: 17px;
      }
      &:nth-of-type(9) {
        position: absolute;
        top: 62px;
        left: 0px;
        font-size: 15px;
      }
      &:nth-of-type(10) {
        position: absolute;
        top: 32px;
        left: 10px;
        font-size: 10px;
      }
    }
  }
}
.report-img-footer {
  width: 100%;
  position: relative;
  .report-img-2 {
    width: 51px;
    height: 44px;
    position: absolute;
    top: 11px;
    left: 62px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .report-img-3 {
    width: 118px;
    height: 65px;
    // position: absolute;
    top: -11px;
    left: 147px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
