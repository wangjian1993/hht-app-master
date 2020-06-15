<template>
  <div class="content">
    <van-popup
      v-model="show"
      round
      closeable
      :style="{ height: '60%' }"
      @close="babyBox"
      class="baby-box"
    >
      <div class="baby-list">
        <p class="baby-titel">请选择要报名的宝宝</p>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in babyList"
              :key="item.id"
              :title="item.nickName"
              clickable
              @click="radio = index"
            >
              <template #right-icon>
                <van-radio :name="index" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="baby-btn" @click="cloneBaby"><p>确定</p></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      radio: 0,
      babyList: [],
    }
  },
  created() {
    this.getBabyList()
  },
  methods: {
    async getBabyList() {
      try {
        const { data } = await this.$axios.getBabyList()
        if (!data.success) throw new Error(data.info)
        this.babyList = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.message)
      }
    },
    cloneBaby() {
      let data = this.babyList[this.radio]
      this.$emit('setBabyId', data)
    },
    babyBox() {
      this.$emit('cloneBox', false)
    },
  },
  components: {},
}
</script>

<style lang="less" scoped>
.baby-box {
  width: 300px;
  height: 600px;
  .baby-list {
    width: 100%;
    .baby-titel {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
      padding: 15px 0;
    }
    li {
      width: 95%;
      margin: 0 auto;
      display: flex;
      padding: 5px 0;
      .list-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list-name {
        padding-left: 10px;
        display: flex;
        align-items: center;
        p {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
.baby-btn {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  p {
    width: 100%;
    font-size: 16px;
    color: #0088cc;
  }
}
</style>
