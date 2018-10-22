/**
 * Created by guang on 2018/10/18.
 */
var vm = new Vue({
    el: "#main",
    data: {
        bannerList: ["xxx.jpg", "xxx.jpg", "xxx.jpg"],
        freeList: [],
        newList: [],
        startList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'}],
        flowerList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'},{img:'567.jpg',name:'123456789',dec:'123123'}],
        designList: [{img: 'xxx.jpg',name:'爱疯熬时间的非金属',dec:'666'},{img:'123.jpg',name:'222222',dec:'852'},{img:'567.jpg',name:'123456789',dec:'123123'}],
        shopList: [{img:'123.jpg',name:'爱疯熬时间的非金属',dec:'852'},{img:'567.jpg',name:'123456789',dec:'发静安寺'}],
        shopMore: false,
        flowerMore: false,
        designMore: false,
    },
    created: function() {
        this.getList();
    },
    updated: function() {
        this.mb('free');
        this.mb('new');
    },
    methods:{
        listLength: function(list) {
            const length = list.length;
            if (length <= 3) {
                return list
            }
            if(length > 3 && length < 6) {
                return list.slice(0,3);
            }
            if (length > 6) {
                return list.slice(0,6);
            }
        },
        getList:function() {
            $.ajax({
                url: 'http://test.api.htxq.net/cactus/researchCommunity/v2/portal',
                type: "GET",
                dataType: 'json',
                success: function(data) {
                    if (data.code == '000000') {
                        const value = data.data
                        vm.listLength(value.limitedTimeFreeList.model);
                        vm.freeList = value.limitedTimeFreeList;
                        vm.listLength(value.latestRecommendList.model);
                        vm.newList = value.latestRecommendList;
                    }
                }
            })
        },
        mb:function(dom) {
            const mb = $('.' + dom);
            if(mb.length == 6) {
                mb[0].style.marginBottom = '0.29rem';
                mb[1].style.marginBottom = '0.29rem';
                mb[2].style.marginBottom = '0.29rem';
            }
        }
    }
});
