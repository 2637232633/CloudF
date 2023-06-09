$(function() {

    disLike = function(blogId,blogName) {
        var stateC = $('#stateC' + blogId).val()
        var stateL = $('#stateL' + blogId).val()
        if(stateC === 'false'){
            stateC = false;
        }else {
            stateC = true;
        }
        console.log(stateL)
        if(stateL != '-1'){
            $.ajax({
                async: false,
                type: 'POST',
                dataType: 'json',
                data:{
                    "blogId":blogId,
                    "blogName":blogName
                },
                url: '/blog/unlike',
                success: function(res){
                    console.log(res)
                    $("#disLikeS"+blogId).css("color","#FF0000")
                    $("#spanD"+blogId).css("color","#FF0000")
                    $("#spanD"+blogId).attr("class","fa fa-thumbs-down")
                    $('#stateL' + blogId).val(-1)
                    if(stateC){
                        changeLike(blogId,blogName);
                    }
                }
            });
        }else{
            $("#disLikeS"+blogId).css("color","#7d98be")
            $("#spanD"+blogId).css("color","#7d98be")
            $("#spanD"+blogId).attr("class","fa fa-thumbs-o-down")
            $('#stateL' + blogId).val(0)
        }
    }
    changeLike = function(blogId,blogName){
        var userId = $.cookie("id");
        var voteCount = $("#praiseC" + blogId).val()
        var state = $('#stateC' + blogId).val()
        if(state === 'false'){
            state = false;
        }else {
            state = true;
        }
        if(userId != null){
            if(!state){
                console.log("like port")
                $.ajax({
                    async: false,
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        "blogId":blogId,
                        "voteCount":voteCount,
                        "blogName":blogName
                    },
                    url: '/blog/like',
                    success: function(like){
                        $("#likeS"+blogId).text("cancel("+like+")")
                        $("#likeS"+blogId).css("color","#FF0000")
                        $("#spanL"+blogId).attr("class","fa fa-thumbs-up")
                        $("#spanL"+blogId).css("color","#FF0000")
                        $("#praiseC" + blogId).val(like)
                        $('#stateC' + blogId).val(true)

                        $("#disLikeS"+blogId).css("color","#7d98be")
                        $("#spanD"+blogId).css("color","#7d98be")
                        $("#spanD"+blogId).attr("class","fa fa-thumbs-o-down")
                        console.log("after change:"+$('#stateC' + blogId).val())
                    }
                });
            }else{
                console.log("unlike port")
                $.ajax({
                    async: false,
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        "blogId":blogId,
                        "voteCount":voteCount,
                        "blogName":blogName
                    },
                    url: '/blog/cancel',
                    success: function(like){
                        $("#likeS"+blogId).text("upvote("+like+")")
                        $("#likeS"+blogId).css("color","#7d98be")
                        $("#spanL"+blogId).attr("class","fa fa-thumbs-o-up")
                        $("#spanL"+blogId).css("color","#7d98be")
                        $("#praiseC" + blogId).val(like)
                        $('#stateC' + blogId).val(false)
                        console.log("after change:"+$('#stateC' + blogId).val())
                    }
                });
            }

        }else{
            window.location.href="/login";
        }
    }


    userClick = function(blogId,blogName){
        var userId = $.cookie("id");
        $.ajax({
            async: false,
            type: 'POST',
            dataType: 'json',
            data:{
                "blogId":blogId,
                "userId":userId,
                "blogName":blogName
            },
            url: '/blog/click',
            success: function(like){

            }
        });
    }

})
// $(function(){
// 	$("#changeModel1").click(function(){
// 		$("#show2").show();
// 		$("#model1").hide();
// 		$("#model2").show();
// 	});
//
// 	$("#changeModel2").click(function(){
// 		$("#show2").hide();
// 		$("#model2").hide();
// 		$("#model1").show();
// 	});
//
// 	$("#atshow").click(function(){
// 		if(gfollows.length > 0 && $("#atFriend").is(":hidden")){
// 			$("#atFriend").show();
// 		}else{
// 			$("#atFriend").hide();
// 		}
// 	});
//
// 	$(document).bind('click', function() {
// 	    	$("#atFriend").hide();
// 	});
// 	    $('#atshow').bind('click', function(e) {
// 	    	if(e.stopPropagation){
// 	            e.stopPropagation();
// 	    	}else{
// 	           e.cancelBubble = true;
// 	     	}
// 	    });
//
// 	$("#ccollect").click(function(){
// 		 if($("#ctitle").val()==""){
// 			 $("#errorMsg").text("标题不能为空");
// 			 $("#errorMsg").show();
// 			 return;
// 		 }
// 		  $("#errorMsg").hide();
// 	  	  $.ajax({
// 	  	         type: "POST",
// 	  	         url:"/collect/collect",
// 	  	         data:$("#collect-form").serialize(),
// 	  	         success: function(response) {
// 	  	             getPraiseStatus($("#ccollectId").val());
// 	  	        	 if(response.rspCode == '000000'){
// 	  	        		loadFavorites();
// 	  	        		$('#modal-changeSharing').modal('hide');
// 						 if($("#userCheck").val()=="usercontent"){
// 							 loadUserFavorites();
// 						 }
// 	  	        	 }else{
// 	  	        		$("#errorMsg").text(response.rspMsg);
// 	 			 		$("#errorMsg").show();
// 	  	        	 }
// 	  	         },
// 	  	         error: function (jqXHR, textStatus, errorThrown) {
// 	  	        	 console.log(jqXHR.responseText);
// 	  	        	 console.log(jqXHR.status);
// 	  	        	 console.log(jqXHR.readyState);
// 	  	        	 console.log(jqXHR.statusText);
// 	  	             console.log(textStatus);
// 	  	             console.log(errorThrown);
// 	  	         }
// 	  	  });
// 	});
// 	// smartFavoritesFun($("#ctitle").val(),$("#cdescription").val(),'favoritesSelect');
// });
//
//
// function showAt(name){
// 	var text = $("#cremark").val();
// 	$("#cremark").focus().val(text + "@" +name + " ");
// 	$(".dropdown-menu").hide();
// }
//
// function onCollect(id,user){
// 	 $('#modal-remove').modal('show');
// 	 $("#collectId").val(id);
// 	 $("#userCheck").val(user);
// }
//
// function delCollect(){
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:"",
// 			url: '/collect/delete/'+$("#collectId").val(),
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(response){
// 				loadFavorites();
// 				if("usercontent" == $("#userCheck").val()){
// 					userLocationUrl($("#forward").val(),"userAll");
// 					loadUserFavorites();
// 				}else{
// 					locationUrl($("#forward").val(),"home");
// 				}
// 				$('#modal-remove').modal('hide');
// 			}
// 		});
// }
// //删除浏览记录
// function delLookRecord(collectId,kind){
//      $("#collectId").val(collectId);
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:"",
// 			url: '/lookRecord/delete/'+$("#collectId").val(),
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(response){
// 				loadFavorites();
// 				if(kind == "standard"){
// 				    locationUrl('/lookRecord/standard/my/0','');
// 				}else{
// 				    locationUrl('/lookRecord/simple/my/0','');
// 				}
//
// 			}
// 	 });
// }
//
// //根据用户删除浏览记录
// function delLookRecordAll(){
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:"",
// 			url: '/lookRecord/deleteAll',
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(response){
// 				loadFavorites();
// 				locationUrl('/lookRecord/standard/my/0','');
// 			}
// 	 });
// }
//
//
// function getCollect(id,user){
//     var userId = document.getElementById("userId").value;
//     if(userId != "0"){
//         $.ajax({
//             async: false,
//             type: 'POST',
//             dataType: 'json',
//             data:"",
//             url: '/collect/detail/'+id,
//             error : function(XMLHttpRequest, textStatus, errorThrown) {
//                 console.log(XMLHttpRequest);
//                 console.log(textStatus);
//                 console.log(errorThrown);
//             },
//             success: function(collect){
//                 $("#ctitle").val(collect.title);
//                 $("#clogoUrl").val(collect.logoUrl);
//                 $("#cremark").val(collect.remark);
//                 $("#cdescription").val(collect.description);
//                 $("#ccollectId").val(collect.id);
//                 $("#curl").val(collect.url);
//                 $('#modal-changeSharing').modal('show');
//                 if("private" == gconfig.defaultCollectType){
//                     $("#type").prop('checked',true);
//                 }else{
//                     $("#type").prop('checked',false);
//                 }
//                 if("simple"==gconfig.defaultModel){
//                     $("#show2").hide();
//                     $("#show1").show();
//                     $("#model2").hide();
//                     $("#model1").show();
//                 }else{
//                     $("#show1").hide();
//                     $("#show2").show();
//                     $("#model1").hide();
//                     $("#model2").show();
//                 }
//                 if("usercontent" == user){
//                     if($("#userId").val() == $("#loginUser").val()){
//                         $("#favoritesSelect").val(collect.favoritesId);
//                     }else{
//                         $("#favoritesSelect").val(gconfig.defaultFavorties);
//                     }
//                 }else{
//                     if($("#userId").val() == collect.userId){
//                         $("#favoritesSelect").val(collect.favoritesId);
//                     }else{
//                         $("#favoritesSelect").val(gconfig.defaultFavorties);
//                     }
//                 }
//                 $("#newFavorites").val("");
//                 $("#userCheck").val(user);
//                 loadFollows();
//             }
//         });
//     }else{
//     	window.location.href="/login";
//     }
// }
//
//
// function changePrivacy(id,type){
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:"",
// 			url: '/collect/changePrivacy/'+id+'/'+type,
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(collect){
// 				if(type=='PUBLIC'){
// 					$("#public"+id).hide();
// 					$("#private"+id).show();
// 				}else{
// 					$("#public"+id).show();
// 					$("#private"+id).hide();
// 				}
// 			}
// 		});
// }
//
//
//
// //查询点赞状态并刷新页面
// function getPraiseStatus(id){
//     $.ajax({
//         async: false,
//         type: 'POST',
//         dataType: 'json',
//         data:'',
//         url: '/collect/getPaiseStatus/'+id,
//         error : function(XMLHttpRequest, textStatus, errorThrown) {
//             console.log(XMLHttpRequest);
//             console.log(textStatus);
//             console.log(errorThrown);
//         },
//         success: function(maps){
//             if(maps.status == "praise"){
//                 $("#like"+id).hide();
//                 $("#likel"+id).hide();
//                 $("#unlike"+id).show();
//                 $("#unlikel"+id).show();
//                 $("#praiseC"+id).val(parseInt(maps.praiseCount));
//                 $("#unlikeS"+id).html("取消点赞("+parseInt(maps.praiseCount)+")");
//             }else{
//                 $("#like"+id).show();
//                 $("#praiseC"+id).val(parseInt(maps.praiseCount));
//                 $("#likeS"+id).html("点赞("+parseInt(maps.praiseCount)+")");
//                 $("#likel"+id).show();
//                 $("#unlike"+id).hide();
//                 $("#unlikel"+id).hide();
//             }
//         }
//     });
// }
//
//
// function search(){
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:"",
// 			url: '/collect/delete/'+$("#collectId").val(),
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(response){
// 				locationUrl($("#forward").val(),"home");
// 				$('#modal-remove').modal('hide');
// 			}
// 		});
// }
//
//
// function switchComment(collectId){
//      var userId = document.getElementById("userId").value;
//      if(userId != "0"){
//          if($("#collapse"+collectId).hasClass('in')){
//              $("#collapse"+collectId).removeClass('in');
//          }else{
//               showComment(collectId);
//          }
//      }else{
//          window.location.href="/login";
//      }
// }
//
// function showComment(collectId){
// 	  $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'',
// 			url: '/comment/list/'+collectId,
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(comments){
// 				initComment(comments,collectId);
// 	    	    $("#collapse"+collectId).addClass('in');
// 			}
// 		});
// }
//
// function initComment(comments,collectId){
// 	var comment='';
// 	 $("#commentList"+collectId).html("");
// 	for(var i=0;i<comments.length;i++){
// 		var item ='<div class=\"media bb p\"><small class=\"pull-right text-muted\">'+comments[i].commentTime+'</small>';
// 		item=item+'<div class=\"pull-left\"><img class=\"media-object img-circle thumb32\" src=\"/'+comments[i].profilePicture+ '\" /></div> ';
// 		item=item+'<div class=\"media-body\">  <span class=\"media-heading\">  <p class=\"m0\"> '
// 		item=item+"<a href=\"javascript:void(0);\" onclick=\"locationUrl('/user/" + comments[i].userId + "/0')\">"+comments[i].userName+"</a>";
// 		item=item+'</p> <p class=\"m0 text-muted\">';
// 		if(!isEmpty(comments[i].replyUserName)){
// 			item=item+'回复@'+comments[i].replyUserName+':'+comments[i].content+'<small>';
// 		}else{
// 			item=item+comments[i].content+'<small>';
// 		}
//
// 		if($("#loginUser").length > 0){
// 			if(comments[i].userId==$("#loginUser").val()){
// 				item=item+"<a href=\"javascript:void(0);\" onclick=\"deleteComment('"+comments[i].id+"','"+collectId+"')\" >    删除</a>";
// 			}else{
// 				item=item+"<a href=\"javascript:void(0);\" onclick=\"replyComment('"+comments[i].userName+"','"+collectId+"')\" class=\"replyComment\" >    回复</a>";
// 			}
// 		}else{
// 			if(comments[i].userId==$("#userId").val()){
// 				item=item+"<a href=\"javascript:void(0);\" onclick=\"deleteComment('"+comments[i].id+"','"+collectId+"')\" >    删除</a>";
// 			}else{
// 				item=item+"<a href=\"javascript:void(0);\" onclick=\"replyComment('"+comments[i].userName+"','"+collectId+"')\" class=\"replyComment\" >    回复</a>";
// 			}
// 		}
// 		item=item+'</small></p></span></div></div>';
// 		comment=comment+item;
// 	}
// 	$("#commentList"+collectId).append(comment);
//
//     if($("#loginUserInfo").val()==null||$("#loginUserInfo").val()==''){
//         $(".replyComment").hide();
//     }
//
// }
//
//
// function comment(collectId){
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'collectId='+collectId+'&content='+$("#commentContent"+collectId).val(),
// 			url: '/comment/add',
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(response){
// 				var commentCount=parseInt($("#commentC"+collectId).val())+1;
// 				$("#commentC"+collectId).val(commentCount);
// 				$("#commentS"+collectId).html("评论("+commentCount+")");
// 				$("#commentContent"+collectId).val('');
// 				showComment(collectId);
// 			}
// 		});
// }
//
// //添加浏览记录
// function saveLookRecord(collectId){
//     $.ajax({
//         async: false,
//         type: 'POST',
//         dataType: 'json',
//         data:'',
//         url: '/lookRecord/save/'+collectId,
//         error : function(XMLHttpRequest, textStatus, errorThrown) {
//             console.log(XMLHttpRequest);
//             console.log(textStatus);
//             console.log(errorThrown);
//         },
//         success: function(response){
//
//         }
//     });
// }
//
//
// function deleteComment(id,collectId){
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'',
// 			url: '/comment/delete/'+id,
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(response){
// 				var commentCount=parseInt($("#commentC"+collectId).val())-1;
// 				$("#commentC"+collectId).val(commentCount);
// 				$("#commentS"+collectId).html("评论("+commentCount+")");
// 				showComment(collectId);
// 			}
// 		});
// }
//
// function replyComment(name,collectId){
// 	var text = $("#commentContent"+collectId).val();
// 	$("#commentContent"+collectId).focus().val(text + "@" +name + " ");
// }
//
//
// function loadStandardMore(){
// 	var url='';
// 	if($("#userFavoritesId").length > 0){
// 		url = '/collect/standard/'+$("#pageType").val()+"/" + $("#userFavoritesId").val() ;
// 	}else{
// 		url = '/collect/standard/'+$("#pageType").val()+"/0";
// 	}
// 	if($("#userId").length > 0){
// 		url = url + "/" + $("#userId").val();
// 	}else{
// 		url = url + "/0";
// 	}
// 	if($("#pageType").val() == "lookAround"){
// 	    url = url + "/" + $("#category").val();
// 	}else{
// 	    url = url + "/NO";
// 	}
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'page='+page,
// 			url: url,
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(collects){
// 				if(collects.length==0){
// 					$("#loadStandardMore").text('没有更多了');
// 				}
// 				if($("#userContent").val()== 'usercontent'){
// 					listStandardCollect(collects,'collectStandardList','usercontent');
// 				}else{
// 					listStandardCollect(collects,'collectStandardList','');
// 				}
// 				page++;
// 			}
// 		});
// }
//
//
// function lookAroundMore(){
//     $.ajax({
//         async: false,
//         type: 'POST',
//         dataType: 'json',
//         data:'page='+page,
//         url:'/collect/lookAround',
//         error : function(XMLHttpRequest, textStatus, errorThrown) {
//             console.log(XMLHttpRequest);
//             console.log(textStatus);
//             console.log(errorThrown);
//         },
//         success: function(collects){
//             if(collects.length==0){
//                 $("#loadStandardMore").text('没有更多了');
//                 $("#loadStandardMore").show();
//             }
//             listStandardCollect(collects,'collectStandardList','');
//             page++;
//         }
//     });
// }
//
// function loadMyMore(){
// 	$('#loadMyMore').hide();
// 	$('#loadingMy').show();
// 	var moreMy = true;
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'page='+page,
// 			url: '/collect/searchMy/'+$("#search-key").val(),
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(collects){
// 				if(collects.length==0){
// 					/*$("#loadMyNoMore").show();
// 					$("#loadMyMore").hide();*/
// 					moreMy = false;
// 				}
// 				if($("#userContent").val()== 'usercontent'){
// 					listStandardCollect(collects,'myCollectList','usercontent');
// 				}else{
// 					listStandardCollect(collects,'myCollectList','');
// 				}
// 				page++;
// 			}
// 		});
// 	$('#loadingMy').hide();
// 	if(moreMy){
// 		$('#loadMyMore').show();
// 	}else{
// 		$("#loadMyMore").hide();
// 		$("#loadMyNoMore").show();
// 	}
// }
//
//
// function loadOtherMore(){
// 	$('#loadOtherMore').hide();
// 	$('#loadingOther').show();
// 	var moreOther = true;
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'page='+page,
// 			url: '/collect/searchOther/'+$("#search-key").val(),
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(collects){
// 				if(collects.length==0){
// 					/*$("#loadOtherNoMore").show();
// 					$("#loadOtherMore").hide();*/
// 					moreOther = false;
// 				}
// 				if($("#userContent").val()== 'usercontent'){
// 					listStandardCollect(collects,'otherCollectList','usercontent');
// 				}else{
// 					listStandardCollect(collects,'otherCollectList','');
// 				}
// 				page++;
// 			}
// 		});
// 	$('#loadingOther').hide();
// 	if(moreOther){
// 		$('#loadOtherMore').show();
// 	}else{
// 		$("#loadOtherMore").hide();
// 		$("#loadOtherNoMore").show();
// 	}
// }
//
// function listStandardCollect(collects,listId,user){
// 	var collectStandardList='';
// 	var collect = '';
//     var collectorUserId='';
// 	for(var i=0;i<collects.length;i++){
//         collectorUserId=collects[i].userId;
// 		if($("#userId").val() != collects[i].userId){
// 			collect = "				  <if> "+
// 			"				     | "+
// 			"				  </if> "+
// 			"                  <a class=\"sharing-action-button\" onclick=\"getCollect("+collects[i].id+")\">"+
// 			"                     <span class=\"fa fa-spoon\"></span>"+
// 			"                   	    收藏"+
// 			"                  </a>";
// 		}
// 		var item =
// 		"<li>"+
// 		"<a style=\"background-image:url("+(collects[i].profilePicture=='' ? 'img/favicon.png' : '/'+collects[i].profilePicture )+")\" class=\"hidden-xs timeline-badge sharing-user-avatar\" href=\"javascript:void(0);\" onclick=\"locationUrl(\'/user/"+collects[i].userId+"/0\',\'\');\" ></a>"+
// 		"<div class=\"timeline-panel\">"+
// 		"   <div class=\"popover right\">"+
// 		"      <div class=\"arrow\"></div>"+
// 		"      <div class=\"popover-content\">"+
// 		"         <div class=\"table-grid\">"+
// 		"            <div class=\"col\">"+
// 		"               <div class=\"pull-right dropdown dropdown-list\">"+
// 		"                  ";
// 		if($("#userId").val() == collects[i].userId){
// 			item=item+		"   <a href=\"#\" data-toggle=\"dropdown\" class=\"sharing-more-button\"  >"+
// 			"                                             <span class=\"fa fa-angle-down\"></span>"+
// 			"                                          </a>";
// 		}
// 		item=item+
// 		"                  "+
// 		"                  <ul class=\"dropdown-menu animated bounceIn\">"+
// 		"                     <li>"+
// 		"                        <div class=\"list-group\">"+
// 		"                           <a onclick=\"getCollect("+collects[i].id+",'"+user+"');\" class=\"list-group-item\" href=\"javascript:void(0);\">"+
// 		"                              <div class=\"media-box\">"+
// 		"                                 <div class=\"pull-left\">"+
// 		"                                    <em class=\"fa fa-pencil-square-o fa-2x fa-fw text-info\"></em>"+
// 		"                                 </div>"+
// 		"                                 <div class=\"media-box-body clearfix\">"+
// 		"                                    <p class=\"m0\">修改收藏</p>"+
// 		"                                    <p class=\"m0 text-muted\">"+
// 		"                                       <small>修改收藏的各种属性</small>"+
// 		"                                    </p>"+
// 		"                                 </div>"+
// 		"                              </div>"+
// 		"                           </a>"+
// 		"                           <a onclick=\"onCollect("+collects[i].id+",'"+user+"');\" class=\"list-group-item\" href=\"javascript:void(0);\">"+
// 		"                              <div class=\"media-box\">"+
// 		"                                 <div class=\"pull-left\">"+
// 		"                                    <em class=\"fa fa-trash fa-2x fa-fw text-danger\"></em>"+
// 		"                                 </div>"+
// 		"                                 <div class=\"media-box-body clearfix\">"+
// 		"                                    <p class=\"m0\">删除</p>"+
// 		"                                    <p class=\"m0 text-muted\">"+
// 		"                                       <small>该分享会永久删除</small>"+
// 		"                                    </p>"+
// 		"                                 </div>"+
// 		"                              </div>"+
// 		"                           </a>"+
// 		"                        </div>"+
// 		"                     </li>"+
// 		"                  </ul>"+
// 		"               </div>"+
// 		"               <div class=\"m0\">"+
// 		"                  <a onclick=\"locationUrl(\'/user/"+collects[i].userId+"/0\',\'\');\" class=\"text-muted\" href=\"javascript:void(0);\">"+collects[i].userName+"</a>"+
// 		"                  ";
// 		if($("#userId").val() == collects[i].userId){
// 			item=item+" <a onclick=\"changePrivacy("+collects[i].id+",\'PRIVATE\');\" style=\"display:"+(collects[i].type=='PRIVATE' ? 'none' : 'inline-block')+"\" id=\"private"+collects[i].id+"\" href=\"javascript:void(0);\" title=\"设为私密\" class=\"deco-none\">"+
// 			"                <span style=\"color: #eee;\" class=\"fa fa-lock\"></span>"+
// 			"              </a>";
// 			item=item+" <a onclick=\"changePrivacy("+collects[i].id+",\'PUBLIC\');\" style=\"display:"+(collects[i].type=='PUBLIC' ? 'none' : 'inline-block')+"\" id=\"public"+collects[i].id+"\" href=\"javascript:void(0);\" title=\"设为公开\" class=\"deco-none\">"+
// 			"                <span class=\"fa fa-lock text-warning\"></span>"+
// 			"              </a>";
// 		}
// 		if($("#pageType").val() != 'explore'){
// 			item=item+
// 			"                  "+
// 			"                  <small class=\"ml-sm text-muted\">"+collects[i].collectTime+"</small>"
// 		}
// 		item=item+
// 		/*"                  "+
// 		"                  <small class=\"ml-sm text-muted\">"+collects[i].collectTime+"</small>"+*/
// 		"               </div>"+
// 		"            </div>"+
// 		"         </div>"+
// 		"          <div class=\"m0\">"+replaceEmpty(collects[i].remark)+"</div>"+
// 		"         <div class=\"media resource-card-thumbnail\">"+
// 		"            <a href=\""+collects[i].url+"\" onclick=\"saveLookRecord("+collects[i].id+");\" target=\"_blank\" class=\"pull-left\">"+
// 		"               <div style=\"background-image:url("+(collects[i].logoUrl=='' ? 'img/favicon.png' : collects[i].logoUrl )+")\" class=\"media-object resource-card-image\"></div>"+
// 		"            </a>"+
// 		"            <div class=\"media-body\">"+
// 		"               <h4 class=\"visible-xs media-heading resource-card-title-xs\">"+
// 		"                  <a onclick=\"saveLookRecord("+collects[i].id+");\" href=\""+collects[i].url+"\" target=\"_blank\">"+collects[i].title+"</a>"+
// 		"               </h4>"+
// 		"               <h3 class=\"hidden-xs media-heading resource-card-title\">"+
// 		"                  <a onclick=\"saveLookRecord("+collects[i].id+");\" href=\""+collects[i].url+"\" target=\"_blank\">"+collects[i].title+"</a>"+
// 		"               </h3>"+
// 		"               <div class=\"hidden-xs resource-card-content\">"+
// 		"                  <p>"+collects[i].description+"</p>"+
// 		"               </div>"+
// 		"            </div>"+
// 		"         </div>"+
// 		"         <div class=\"m0\">"
//
//         if($('#lookAround').length >= 1){
//             item=item+" <span class=\" mr-sm\"></span>"
//         }else{
//             item=item+"            <span class=\"icon-folder mr-sm\"></span>"+
//                 "  <a onclick=\"locationUrl(\'/standard/"+collects[i].favoritesId+"/"+collects[i].userId+"\',\'"+collects[i].favoritesId+"\');\" class=\"normal-color-a ng-binding\" href=\"javascript:void(0);\">"+collects[i].favoriteName+"</a>"
//         }
//         item=item+
// 		"            <div class=\"pull-right hidden-xxs\">"+
// 		"                  <a onclick=\"changeLike("+collects[i].id+");\" style=\"display:"+(collects[i].praise? 'none' : 'inline-block')+"\" id=\"like"+collects[i].id+"\" class=\"sharing-action-button btn-praise\">"+
// 		"                     <span class=\"fa fa-thumbs-o-up\"></span>"+
// 		"                     <show id=\"likeS"+collects[i].id+"\">点赞("+collects[i].praiseCount+")</show>"+
// 		"                  </a>"+
// 		"                   <if  style=\"display:none\"> "+
// 		"				     | "+
// 		"				  </if> "+
// 		"                  <a onclick=\"changeLike("+collects[i].id+");\" style=\"display:"+(collects[i].praise? 'inline-block' : 'none')+"\" id=\"unlike"+collects[i].id+"\" class=\"sharing-action-button\">"+
// 		"                     <span class=\"fa fa-thumbs-up\"></span>"+
// 		"                  	 <show id=\"unlikeS"+collects[i].id+"\">取消点赞("+collects[i].praiseCount+")</show>"+
// 		"                  </a>"+
// 		"                  <input type=\"hidden\" value=\""+collects[i].praiseCount+"\" id=\"praiseC"+collects[i].id+"\" name=\"praiseC\">"+
// 		"                  <input type=\"hidden\" value=\""+collects[i].commentCount+"\" id=\"commentC"+collects[i].id+"\" name=\"commentC\">"+
// 		"                  | "+
// 		"                  <a onclick=\"switchComment("+collects[i].id+");\" href=\"javascript:void(0);\" class=\"sharing-action-button btn-comment\">"+
// 		"                     <span class=\"fa fa-comment-o\"></span>"+
// 		"                     <show id=\"commentS"+collects[i].id+"\">评论("+collects[i].commentCount+")</show>"+
// 		"                  </a>";
// 		if($("#userId").val() != collects[i].userId){
// 			item=item+"	 <if> "+
// 			"				     | "+
// 			"				  </if> "+
// 			"                  <a class=\"sharing-action-button\" onclick=\"getCollect("+collects[i].id+")\">"+
// 			"                     <span class=\"fa fa-spoon\"></span>"+
// 			"                   	    收藏"+
// 			"                  </a>";
// 		}
//         if($("#loginUserInfo").val()){
//             item=item+"	 <if> "+
//                 "				     | "+
//                 "				  </if> "+
//                 "                  <a class=\"sharing-action-button\" onclick=\"getCollect("+collects[i].id+")\">"+
//                 "                     <span class=\"fa fa-spoon\"></span>"+
//                 "                   	    收藏"+
//                 "                  </a>";
//         }
// 			item=item+		"               </small>"+
// 		"            </div>"+
// 		"         </div>"+
// 		"         <div id=\"collapse"+collects[i].id+"\" class=\"collapse\">"+
// 		"            <comments id=\"commentList"+collects[i].id+"\"></comments>"+
// 		"            <div id=\"comment"+collects[i].id+"\" class=\"media p0\">"+
// 		"               <div class=\"media-body\">"+
// 		"                  <form>"+
// 		"                     <div class=\"input-group\">"+
// 		"                        <input type=\"text\" id=\"commentContent"+collects[i].id+"\" class=\"form-control\" placeholder=\"输入评论...\">"+
// 		"                        <span class=\"input-group-btn\">"+
// 		"                           <button onclick=\"comment("+collects[i].id+");\" type=\"button\" class=\"btn btn-default\">发送</button>"+
// 		"                        </span>"+
// 		"                     </div>"+
// 		"                  </form>"+
// 		"               </div>"+
// 		"            </div>"+
// 		"         </div>"+
// 		"      </div>"+
// 		"   </div>"+
// 		"</div>"+
// 		"</li>";
// 		collectStandardList=collectStandardList+item;
// 	}
// 	$("#"+listId).append(collectStandardList);
// 	if($("#loginUserInfo").val()==""){
//         $(".sharing-action-button.btn-praise").removeAttr("onclick");
//         $(".input-group").hide();
//     }
//     if($("#collector").val()){
//         if($("#loginUserInfo").val() != collectorUserId){
//             $(".pull-right.dropdown.dropdown-list").hide();
//             $(".deco-none").hide();
//         }
//     }
// }
//
//
// function loadSimpleMore(){
// 	var url='';
// 	if($("#userFavoritesId").length > 0){
// 		url = '/collect/simple/'+$("#pageType").val()+"/" + $("#userFavoritesId").val();
// 	}else{
// 		url = '/collect/simple/'+$("#pageType").val()+"/0";
// 	}
// 	if($("#userId").length > 0){
// 		url = url + "/" + $("#userId").val();
// 	}else{
// 		url = url + "/0";
// 	}
// 	if($("#pageType").val() == "lookAround"){
//     	url = url + "/" + $("#category").val();
//     }else{
//         url = url + "/NO";
//     }
// 	 $.ajax({
// 			async: false,
// 			type: 'POST',
// 			dataType: 'json',
// 			data:'page='+page,
// 			url: url,
// 			error : function(XMLHttpRequest, textStatus, errorThrown) {
// 				console.log(XMLHttpRequest);
// 				console.log(textStatus);
// 				console.log(errorThrown);
// 			},
// 			success: function(collects){
// 				if($("#userContent").val()== 'usercontent'){
// 					listSimpleCollect(collects,'usercontent');
// 				}else{
// 					listSimpleCollect(collects,'');
// 				}
// 				page++;
// 			}
// 		});
// }
//
//
// function listSimpleCollect(collects,user){
// 	var collectSimpleList='';
// 	if(collects.length==0){
// 		/*$("#loadSimpleNoMore").show();*/
// 		/*$("#loadSimpleMore").hide();*/
// 		$("#loadSimpleMore").text('没有更多了');
// 	}
// 	for(var i=0;i<collects.length;i++){
// 		var item =
// 			"<tr>"+
// 			"    <td>"+
// 			"      <a onclick=\"saveLookRecord("+collects[i].id+");\" href=\""+collects[i].url+"\" style=\"font-size:16px;color:#656565;\" target=\"_blank\">"+collects[i].title+"</a>"+
// 			"    </td>"+
// 			"   <td width=\"10%\" class=\"text-center\">"+
// 			"     <img height=\"25px\" width=\"35px\" src=\""+(collects[i].logoUrl=='' ? 'img/favicon.png' : collects[i].logoUrl )+"\" alt=\"\"></td>"+
// 			"   <td width=\"15%\" class=\"text-center\">"+
// 			"    <div class=\"simplemodify\">";			if($("#userId").val() == collects[i].userId){
// 				item=item+
//                 "    <a onclick=\"getCollect("+collects[i].id+",'"+user+"');\" class=\"mr\" href=\"javascript:void(0);\"> <i class=\"fa fa-pencil\"></i>"+
// 				"    </a>"+
// 				"    <a onclick=\"onCollect("+collects[i].id+",'"+user+"');\" class=\"ml\" href=\"javascript:void(0);\"> <i class=\"fa fa-trash text-danger\"></i>"+
// 				"    </a>";
// 			}
// 				item=item+			"    </div>"+
// 			"   </td>"+
// 			" </tr>";
// 		collectSimpleList=collectSimpleList+item;
// 	}
// 	 $("#collectSimpleList").append(collectSimpleList);
//     if($("#loginUserInfo").val()!=$("#userId").val()){
//         $(".simplemodify").hide();
//     }
// }
//
// $(function() {
// 	var loadingFlag = true;
//
// 	$(window).scroll(function() {
//         //当前页面剩40px加载完时，预加载下一页，使翻页更平滑
//         if ( $(document).height() - $(window).height() -$(window).scrollTop() < 40 ) {
//             if ($('#lookAround').length >= 1) {
//                 if ($('#standard').is(':visible')) {
//                     if ($('#loadStandardMore').text() == '加载更多') {
//                         if (loadingFlag) {
//                             loadingFlag = false;
//                             $('#loadingStandard').show();
//                             lookAroundMore();
//                             $('#loadingStandard').hide();
//                             loadingFlag = true;
//                         }
//                     }
//                 }
//              } else if ($('#standard').length >= 1 && $('#simple').length >= 1) {
// 					if ($('#standard').is(':visible')) {
// 						if ($('#loadStandardMore').text() == '加载更多') {
// 							if (loadingFlag) {
// 								loadingFlag = false;
// 								$('#loadingStandard').show();
// 								loadStandardMore();
// 								$('#loadingStandard').hide();
// 								loadingFlag = true;
// 							}
// 						}
// 			} else if ($('#simple').is(':visible')) {
// 					if ($('#loadSimpleMore').text() == '加载更多') {
// 						if (loadingFlag) {
// 							loadingFlag = false;
// 							$('#loadingSimple').show();
// 							loadSimpleMore();
// 							$('#loadingSimple').hide();
// 							loadingFlag = true;
// 						}
// 					}
// 				}
// 			} else if ($('#standard').length >= 1 && $('#simple').length == 0) {
// 				if ($('#loadStandardMore').text() == '加载更多') {
// 					if (loadingFlag) {
// 						loadingFlag = false;
// 						$('#loadingStandard').show();
// 						loadStandardMore();
// 						$('#loadingStandard').hide();
// 						loadingFlag = true;
// 					}
// 				}
// 			} else if ($('#standard').length == 0 && $('#simple').length >= 1) {
// 				if ($('#loadSimpleMore').text() == '加载更多') {
// 					if (loadingFlag) {
// 						loadingFlag = false;
// 						$('#loadingSimple').show();
// 						loadSimpleMore();
// 						$('#loadingSimple').hide();
// 						loadingFlag = true;
// 					}
// 				}
// 			}
// 		}
// 	});
// });
//
//
