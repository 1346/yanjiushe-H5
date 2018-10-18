var urlPrefix = window.location.origin;
var vm = new Vue({
	el:"#main",
	data:{
		equipment:judegEquipment(),		//weixin,ios,或android
		jumpType:6,						//跳转类型
		id:getLocationHrefPara("id"),
		host:window.location.host,
		mainInfo: {
			"id":13,
			"imgUrl":"",
			"videoUrl":"",
			"title":"",
			"content":"",
			"date":"",
			"typeName":""
		},
		moreList: [
			{
				"id":14,
				"imgUrl":"",
				"title":"",
				"price":0,
				"content":"",
				"typeName":"",
				"readCount":666,
				"someTimesFree":false
			}
		],
		playVideoUrl:"",
		imgShow:false,		//图片是否显示 （为android准备的）
		videoShow:true,		//视频是否显示	（ios一直显示）
		boxShowBool:false,	//遮罩层是否显示
	},
	methods:{
		getMainInfor:function(){
			$.ajax({
//				url:"http://test.api.htxq.net/cactus/researchCommunity/getResearchCommunityInfoForH5?researchCommunityId=23",
				url: urlPrefix + '/cactus/researchCommunity/getResearchCommunityInfoForH5?researchCommunityId=' + this.id,
				type: 'GET',
				dataType: 'json',
//				data: {},
				success: function (result) {
	                if ( result.code ==  "000000" ) {
						vm.mainInfo = result.data;
//						console.log(result.data)
	                     $("#introduce_imgs").attr("src",result.data.teacherIcon)
		                 $(".introduce_name").text(result.data.teacherTitle)
		                 $(".introduce_title").text(result.data.teacherHornor)
		                 $(".introduce_look").text(result.data.readCount+"人看过")
		                 $(".introduce_content").text(result.data.teacherIntro)					
					}else{
						console.log( result.text);
					}					
				}
			})
			
		},
		getVideoSrc:function(){
			$.ajax({
				url: urlPrefix + '/cactus/media/video/' + this.id + '?type=1&userId=&token=',
				type: 'GET',
				dataType: 'json',
				data: {},
			})
			.done(function(json) {
				if ( json.code == "000000" ) {
					vm.playVideoUrl = json.data.tryPlayVideoUrl; 
				}else{
					console.log(json.text)
				}
			})
		},
		getMoreList:function () {
			$.ajax({
				url: urlPrefix + '/cactus/researchCommunity/getTeacherMoreResearchCommunityList?researchCommunityId=' + this.id,
				type: 'GET',
				dataType: 'json',
				data: {},
			})
			.done(function(json) {
				if (json.code == "000000" ) {
					vm.moreList = json.data;
					 console.log(json)
				}
			})
		},
		boxHide:function(){
			// document.getElementById('shade').style.display = "none";
			this.boxShowBool= false; 
			setTimeout(function(){
				if (browser.versions.android) {
					vm.imgShow 	= false;
					vm.videoShow= true;
				};
			},100)
		},
		boxShow:function(){
			if (this.equipment == "weixin" ) {
				// document.getElementById('shade').style.display = "block";
				this.boxShowBool	= true; 
			};
			if (browser.versions.android) {
				this.imgShow 	= true;
				this.videoShow	= false;
			}
		},
		awakeApp:function (){															//判断安装
			if ( this.equipment != "weixin" ){
				var the_href = "apphtxq://htxq.app?" + this.jumpType + "?" + this.id;
				console.log(the_href);
				window.location.href = the_href;
				setTimeout(function(){
					window.location.href = "http://api.htxq.net/h5/download/download.html";
				},5000);
				console.log(the_href);

				// window.location.href = "http://api.htxq.net/h5/download/download.html";
			}
		},
//		

		reportServer:function(){
			$.get(urlPrefix + "/cactus/researchCommunity/noteVideoPlayLog?researchCommunityId=" + this.id + "&userId=&type=0",function(data) {});
		},
		replaceBr:function(value){	// 把\r\n转换成<br> 
			// console.log(value);
			if (!value) return '';
			value = value.toString();
			return value.replace(/\r\n/g,"<br>");
		},
		kk:function(){				//用于处理<br>识别问题———— #p
			var p_text = this.replaceBr(this.mainInfo.content); //视频信息描述
			// console.log( p_text );
			this.mainInfo.content = p_text;
			$("#p").html( p_text );
		},
		kk2:function(){				//用于处理<br>识别问题————列表里item_text
			var $item_text = $(".item_text");
			for (var i = 0; i < $item_text.length; i++) {
				this.moreList[i].content = this.replaceBr(this.moreList[i].content);
				$item_text.eq(i).html( this.moreList[i].content );
			}
		},
	},
	filters:{
		wan:function(num){
			var c = 0;
	        if ( num<10000 ) {
	            c = num;
	        }else if ( num >= 10000 && num < 100000000 ){
	            var n = (num/10000).toFixed(1);
	            n = n.substr(-1,1) == '0' ? parseInt(n) : n;
	            c = n + "万";
	        }else if ( num >= 100000000 ) {
	            var n = (num/100000000).toFixed(1);
	            n = n.substr(-1,1) == '0' ? parseInt(n) : n;
	            c = n + "亿";
	        }
			return c;
		},
	},
	mounted:function(){
		this.getMainInfor();
		this.getVideoSrc();
		this.getMoreList();
		this.awakeApp();
	},
   	updated:function(){                  //组件更新后
		this.kk();
        this.kk2();
    },
});
function scroll_w( fn ) {
    var beforeScrollTop = document.body.scrollTop,
        fn = fn || function() {};
    window.addEventListener("scroll", function() {
        var afterScrollTop = document.body.scrollTop,
            delta = afterScrollTop - beforeScrollTop;
        if( delta === 0 ) return false;
        fn( delta > 0 ? "down" : "up" );
        beforeScrollTop = afterScrollTop;
    }, false);
};
scroll_w(function(direction) {
	var dowHeight =  $(".swipeAnimation").height() + "px";
	if ( direction == "down" ) {
		$(".swipeAnimation").css( 'transform', 'translate(0,' + dowHeight + ')' );
	}else{
		$(".swipeAnimation").css( 'transform', 'translate(0,0)' );
	}
});
// end

wx.ready(function(){
	// title,link,imgUrl,desc
	weixinShare( vm.$data.mainInfo.title , window.location.href , vm.$data.mainInfo.imgUrl , vm.$data.mainInfo.content );
});
