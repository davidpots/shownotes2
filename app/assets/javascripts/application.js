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











$(document).ready(function(){

  // If search field is empty, autofocus on it on page load
  if ( $('#query').val().length == 0 ) {
    $('#query').focus();
  }  

  // If user clicks on a search result...
  $('body').on('click', 'a.feed', function(){
    $('a.feed').removeClass('active');
    $('body').addClass('showing-details');
    $(this).addClass('active');
    var url_rss = $(this).data('url-rss');
    var url_itunes = $(this).data('url-itunes');
    $('#feed_select').find('#url_rss').val(url_rss);
    $('#feed_select').find('#url_itunes').val(url_itunes);

    $('#feed_select').submit();
    $('.spinner').show();
    return false;
  });


  // If in mobile view, user clicks BACK TO PODCASTS link...
  $('body').on('click', '.back-to a', function(){

    // remove the URL hash. via hacky tweak of http://stackoverflow.com/questions/2295845/how-can-i-remove-the-location-hash-without-causing-the-page-to-scroll
    window.location.hash = "";

    $('a.feed').removeClass('active');
    $('body').removeClass('showing-details');
    $('#podcast_wrap_inner').empty();
    return false;
  });

});




// If a desktop view, then auto-click the first search result after entire page *finishes* loading

        $(window).bind("load", function() {
          if ($('html').hasClass('desktop')) {
            $('.feeds a.feed').first().click();
          }
        });












// Detects BACK BUTTON push -- and removes hash value. via https://gist.github.com/sstephenson/739659

      // Minor hack. When a user goes from podcast A to B to A, the large code chunk below equates 
      // that with the user going "back". To work around this, I add an incremental, harmless "key"
      // paramater to each URL (on podcast click) that ensures each podcast visited is unique, via
      // this key in the URL. This is added to the URL on show.js.erb.
      var i = 0;

      // Commence the code I found via gist.github.com link above...
      var detectBackOrForward = function(onBack, onForward) {
        hashHistory = [window.location.hash];
        historyLength = window.history.length;
       
        return function() {
          var hash = window.location.hash, length = window.history.length;
          if (hashHistory.length && historyLength == length) {
            if (hashHistory[hashHistory.length - 2] == hash) {
              hashHistory = hashHistory.slice(0, -1);
              onBack();
            } else {
              hashHistory.push(hash);
              onForward();
            }
          } else {
            hashHistory.push(hash);
            historyLength = length;
          }
        }
      };

      window.addEventListener("hashchange", detectBackOrForward(
        function() { /* user went BACK: remove hash */ 
          $('body').removeClass('showing-details');
          $('#podcast_wrap_inner').empty();
        },
        function() { /* user went FORWARD: do nothing */ }
      ));