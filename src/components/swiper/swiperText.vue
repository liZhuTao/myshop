<template>
  <div>
      <swiper class="swiper" :options="swiperOption">
          <swiper-slide class="text">

          </swiper-slide>
      </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    data() {
        return {
            swiperOption: {
                direction:'vertical',
                slidesPerView:'auto',
                freeMode:true,
                mousewheel:true
            }
        }
    },
    components:{swiper,swiperSlide}
};
</script>

<style lang="scss" scoped>
</style>