// FastClick.attach(document.body); //fastclick
// dow上滑消失，下滑出现
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
 var userId = getCookie("user");
 var token = "";
var vm = new Vue({
	el:"#main_works",
	data:{
		host:window.location.protocol + "//" + window.location.host,
		assignmentId:getLocationHrefPara("assignmentId"),
		id:getLocationHrefPara("id"),
		
	},
	methods:{
		getJobsList:function(){
			$.ajax({
				url: this.host + "/cactus/learning/getAssignmentList?&customerId="+userId+"&subjectId="+this.id+"&index=0",
				type: 'GET',
				dataType: 'json',
				success: function (result) {
	                if ( result.code ==  "000000" ) {

						if(result.data.length=="0"){
							$("#main_work").hide()
						}
						for(var i=0;i<3;i++){
							$("#main_works").append(
							"<section class='work_list'>"+
								"<section class='author'>"+
									"<span class='author_pic'><img alt='' src='"+result.data[i].headImgUrl+"' class='headImgUrl'></span>"+
									"<span class='author_name'>"+result.data[i].customerName+"</span>"+
								"</section>"+
								"<article class='job_content'>"+
									"<p class='job_work'>"+result.data[i].content+"</p>"+
								"</article>"+
								"<aside class='job_pics'style='display:none'>"+
									"<div class='job_pics_one' id='item-"+i+"' style='display:none'>"+

									"</div>"+	
								"</aside>"+
								"<aside class='job_tip clear'>"+
									"<span class='job_date'>"+result.data[i].pubTimestamp+"</span>"+
									"<span class='job_like'>"+result.data[i].like+"</span>"+
								"</aside>"+
							"</section>"	
							)
							
						}
					    if(result.data[0].imageUrl.length!=0){
							$(".job_pics").show()
							$(".job_pics_one").show()
							for(var w=0;w<result.data[0].imageUrl.length;w++){
								$("#main_works").find("#item-0").append("<img alt='' src='"+result.data[0].imageUrl[w]+"' class='work_img'>")	
							}
						}
					    if(result.data[1].imageUrl.length!=0){
							$(".job_pics").show()
							$(".job_pics_one").show()
							for(var w=0;w<result.data[1].imageUrl.length;w++){
								$("#main_works").find("#item-1").append("<img alt='' src='"+result.data[1].imageUrl[w]+"' class='work_img'>")	
							}
						}
					    if(result.data[2].imageUrl.length!=0){
							$(".job_pics").show()
							$(".job_pics_one").show()
							for(var w=0;w<result.data[2].imageUrl.length;w++){
								$("#main_works").find("#item-2").append("<img alt='' src='"+result.data[2].imageUrl[w]+"' class='work_img'>")	
							}
						}
						
						
					
					}else{

					}
				}				
			})	
    	},

	},
	mounted:function(){
		this.getJobsList();
	}

});




