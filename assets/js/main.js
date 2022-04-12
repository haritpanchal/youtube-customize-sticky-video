jQuery(document).ready(function(){
  var videoData = ycsvObj.data;
  var $window = jQuery(window);
  var $videoWrap = jQuery('.video-wrap');
  var $video = jQuery('.video');
  var videoHeight = $video.outerHeight();
  
  $window.on('scroll',  function(e) {
    var windowScrollTop = $window.scrollTop();
    var videoBottom = videoHeight + $videoWrap.offset().top;

    if (videoData.video_possion == 'br'  || videoData.video_possion == 'bl') {
      $(".stuck").css("bottom", videoData.bottom+'px');
    }
    if (videoData.video_possion == 'br'  || videoData.video_possion == 'tr') {
      $(".stuck").css("right", videoData.right+'px');
    }
    if (videoData.video_possion == 'tl'  || videoData.video_possion == 'bl') {
      $(".stuck").css("left", videoData.left+'px');
    }
    if (videoData.video_possion == 'tr'  || videoData.video_possion == 'tl') {
      $(".stuck").css("top", videoData.top+'px');
    }

    if (videoData.video_possion == 'tr'  || videoData.video_possion == 'tl'){
      $(".down").css('display', "block");
      if(videoData.video_possion == 'tr'){
        $(".down").css('float', "right");
      }
      if(videoData.video_possion == 'tl'){
        $(".down").css('float', "left");
      }
    }
    if (videoData.video_possion == 'br'  || videoData.video_possion == 'bl'){
      $(".up").css('display', "block");
      if(videoData.video_possion == 'br'){
        $(".up").css('float', "right");
      }
      if(videoData.video_possion == 'bl'){
        $(".up").css('float', "left");
      }
    }
    
    if (windowScrollTop > videoBottom) {
      $videoWrap.height(videoHeight);
      $video.addClass('stuck');
    } else {
      $videoWrap.height('auto');
      $video.removeClass('stuck');
      $(".btn_close").css('display', "none");
    }
  });
  
  $(".btn_close").on('click', function(){
    $videoWrap.height('auto');
    $video.addClass('no-stuck').removeClass('stuck');
  })
})