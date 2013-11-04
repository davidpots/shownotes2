// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .



// Add/remove a class based on size of window. Inspired by https://gist.github.com/RyanBrackett/6107983
// This is used so I can know if a mobile device vs. a desktop device.

          // Change width value on page load
          $(document).ready(function(){
              responsive_resize();
          });

          // Change width value on user resize, after DOM
          $(window).resize(function(){
               responsive_resize();
          });

          function responsive_resize(){
            var current_width = $(window).width();
            if(current_width < 800){
              $('html').addClass("mobile").removeClass("desktop");
            } 
            if(current_width > 800){
              $('html').addClass("desktop").removeClass("mobile");
            }
          }






function clickFeedLink(item)
{
    $('a.feed').removeClass('active');
    $('body').addClass('showing-details');
    item.addClass('active');
    var url_rss = item.data('url-rss');
    var url_itunes = item.data('url-itunes');
    $('#feed_select').find('#url_rss').val(url_rss);
    $('#feed_select').find('#url_itunes').val(url_itunes);

    if ($('html').hasClass('mobile')) {
      $('#podcast_wrap_inner').css('opacity','0.0');
    } else {
      $('#podcast_wrap_inner').css('opacity','0.3');
    }

    $('#feed_select').submit();
    $('.spinner').show();
}





$(document).ready(function(){

  // If search field is empty, autofocus on it on page load
  if ( $('#query').val().length == 0 ) {
    $('#query').focus();
  }  

  // If user clicks on a search result...
  $('body').on('click', 'a.feed', function(event){
    clickFeedLink($(this));
  });


  // If in mobile view, user clicks BACK TO PODCASTS link...
  $('body').on('click', '.back-to a', function(){
    $('a.feed').removeClass('active');
    $('body').removeClass('showing-details');
    $('#podcast_wrap_inner').empty();
    return false;
  });

});

$(window).bind("load", function() {
  // If a desktop view, then auto-click the first search result
  if ($('html').hasClass('desktop')) {
    if ( $('.feeds a.feed').length > 0 ) {
      clickFeedLink($('.feeds a.feed').first().click());      
    }
  }
  $('.feeds-wrap-inner').css('opacity','1');

});