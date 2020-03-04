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
        <div v-for="(cate,index) in category" :key="index" >
            <img v-lazy="cate.image" width="90%">
            <span>{{cate.mallCategoryName}}</span>
        </div>
    </div>
    <!--广告-->
    <div>
        <img v-lazy="adBanner" width="100%">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      searchIcon: require("../../assets/images/search.png"),
      bannerPicArray: [
        { imageUrl: "http://hbimg.b0.upaiyun.com/2c60ab6d1508f04ff48c8e3ae2431fdba3e405c1109ca-4oPCmF_fw658" },
        { imageUrl: "http://img5.imgtn.bdimg.com/it/u=2852928175,4143309050&fm=26&gp=0.jpg" },
        { imageUrl: "http://img1.imgtn.bdimg.com/it/u=1231732526,1031486867&fm=15&gp=0.jpg" },
        { imageUrl: "http://img5.imgtn.bdimg.com/it/u=3005135712,2657691519&fm=26&gp=0.jpg" },
        { imageUrl: "http://img4.imgtn.bdimg.com/it/u=3897809512,3141483766&fm=26&gp=0.jpg" }
      ],
      category:[],
      adBanner:'',
    };
  },
  created(){
      axios({
          url:'https://easy-mock.com/mock/5e5fae2b5bf624726e90b059/shop/index',
          method:'get',
      })
      .then(response=>{
          console.log(response);
          if(response.status==200){
              this.category = response.data.data.category;
              this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          }
      })
      .catch(error=>{
          console.log(error);
      })
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
.swiper-area{
    max-height:13rem;
    clear:both;
    overflow: hidden;
  }
  .type-bar{
      background-color: #fff;
      margin: 0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
  }
  .type-bar div{
      padding:.3rem;
      font-size: 12px;
      text-align: center;
  }
  .type-bar div img{
      width: 3rem;
  }
</style>