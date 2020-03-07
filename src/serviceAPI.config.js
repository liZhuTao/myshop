const BASEURL = "https://easy-mock.com/mock/5e5fae2b5bf624726e90b059/shop/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: BASEURL + 'index',   //商城首页信息
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register',   //用户注册接口
    login: LOCALURL + 'user/login',           //用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',    //获取商品详情
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
}

module.exports = URL