<template>
  <div>
    <!--顶部搜索栏-->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" class="location-icon" />
        </van-col>
        <van-col span="17">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="4">
          <img :src="searchIcon" class="search-icon" />
        </van-col>
      </van-row>
    </div>
    <!--轮播图-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.imageUrl" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--分类-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--广告-->
    <div>
      <img v-lazy="adBanner" width="100%" />
    </div>
    <!--商品推荐-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor one area-->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import goodsInfo from "../component/goodsInfoComponent";
import url from "@/serviceAPI.config.js"
export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      searchIcon: require("../../assets/images/search.png"),
      bannerPicArray: [
        {
          imageUrl:
            "http://hbimg.b0.upaiyun.com/2c60ab6d1508f04ff48c8e3ae2431fdba3e405c1109ca-4oPCmF_fw658"
        },
        {
          imageUrl:
            "http://img5.imgtn.bdimg.com/it/u=2852928175,4143309050&fm=26&gp=0.jpg"
        },
        {
          imageUrl:
            "http://img1.imgtn.bdimg.com/it/u=1231732526,1031486867&fm=15&gp=0.jpg"
        },
        {
          imageUrl:
            "http://img5.imgtn.bdimg.com/it/u=3005135712,2657691519&fm=26&gp=0.jpg"
        },
        {
          imageUrl:
            "http://img4.imgtn.bdimg.com/it/u=3897809512,3141483766&fm=26&gp=0.jpg"
        }
      ],
      category: [],
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods:[]    //热卖商品
    };
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },

  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1; //楼层1数据
          this.floor2 = response.data.data.floor2; //楼层2数据
          this.floor3 = response.data.data.floor3; //楼层3数据
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.location-icon {
  width: 80%;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.search-bar {
  height: 2.2rem;
  background-color: #e7e7e7;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e7e7e7;
  color: #000;
}
.search-icon {
  width: 50%;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  max-height: 13rem;
  clear: both;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.type-bar div img {
  width: 3rem;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #5e5c5c;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 14px;
  text-align: center;
}
.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>