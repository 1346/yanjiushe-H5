/**
 * Created by guang on 2018/10/18.
 */
var vm = new Vue({
  el: "#main",
  data: {
      bannerList: ["xxx.jpg", "xxx.jpg", "xxx.jpg"],
      freeList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'},{img:'567.jpg',name:'123456789',dec:'123123'}],
      newList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'}],
      startList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'}],
      flowerList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'},{img:'567.jpg',name:'123456789',dec:'123123'}],
      designList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'},{img:'567.jpg',name:'123456789',dec:'123123'}],
      shopList: [],
      shopMore: false,
      flowerMore: false,
      designMore: false,
  },
    created:function() {
        const list = [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'},{img:'567.jpg',name:'123456789',dec:'123123'},{img: 'xxx.jpg',name:'jsdjfasj',dec:'adfsaff'},{img:'123.jpg',name:'222222',dec:'swwx'},{img: 'xxx.jpg',name:'jsdjfasj',dec:'adfsaff'},{img:'123.jpg',name:'222222',dec:'swwx'}];
        const length = list.length;
        if (length <= 3) {
            this.shopList = list;
        }
        if(length > 3 && length < 6) {
            this.shopList = list.slice(0,3);
            this.shopMore = true;
        }
        if (length > 6) {
            this.shopList = list.slice(0,6);
            this.shopMore = true;
        }
    },
    methods:{
    }
});
