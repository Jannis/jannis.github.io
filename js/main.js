// extend Array class with an any() method
if (!Array.prototype.any) {
  Array.prototype.any = function(fun) {
    if (typeof fun != 'function') {
      throw new TypeError();
    }

    for (i = 0; i < this.length; ++i) {
      if (i in this) {
        var value = this[i];
        if (fun.call(value, i, this)) {
          return true;
        }
      }
    }
  }
}

$(document).ready(function() {

  var url = window.location.href;
  var baseUrl = url.indexOf('#') >= 0 ? url.substring(0, url.indexOf('#')) : url;
  var anchor = url.indexOf('#') >= 0 ? url.substring(url.indexOf('#') + 1) : '';

  // color animation for hovering section titles

  $('article.about h2').hover(
    function () {
      $(this).addClass('hovered', 500);
    },
    function () {
      $(this).removeClass('hovered', 150);
    }
  );

  // focus animation when activating particular sections

  $('article.about h2').click(function() {
    if (!$(this).hasClass('active')) {
      $('article.about h2').not(this).parent().fadeOut(150);
      $(this).parent().data('position', $(this).parent().offset());
      $(this).parent().delay(250).animate({'top': '6em', 'left': '5%'}, 500);
      $(this).parent().children('h3, ul, p').delay(650).fadeIn();
      window.location.hash = '' + $(this).parent().attr('id');
    } else {
      window.location.hash = '';
      $(this).parent().children('h3, ul, p').fadeOut(150);
      $(this).parent().delay(500).animate($(this).parent().data('position'), 500);
      $('article.about h2').not(this).each(function () {
        $(this).parent().delay(650).fadeIn();
      });
    }
    $(this).toggleClass('active');
  });

  // generate semi-random positions for articles on the page
  var articlePositions = [];
  var values = 
  $('article.about').each(function(i) {
    var pos = new Array();
    pos.x = Math.round(Math.random() * 15);
    pos.y = (i == 0) ? 0 : articlePositions[i-1].y + 1;

    while (articlePositions.any(function (position) {
      if (position.x >= pos.x - 2 && position.x <= pos.x + 2) {
        return true;
      }
    })) {
      pos.x = Math.round(Math.random() * 15);
    }
    articlePositions.push(pos);
  });

  function convertPositionToCSS(pos) {
    return {'x': (5 + pos.x * 2) + '%', 'y': (6 + pos.y * 4) + 'em'};
  }

  // initial animation to show the selected section or all sections
  // if nothing has been selected
  if (anchor.length == 0) {
    $('article.about').each(function (i) {
      $(this).css({'opacity': 0.0});
      $(this).delay(1000 + i * 500).animate({
        'opacity': 1.0,
        'left': convertPositionToCSS(articlePositions[i]).x,
        'top': convertPositionToCSS(articlePositions[i]).y,
      }, 250, function() {
        $(this).data('position', $(this).offset())
      });
    });
  } else {
    $('article.about').each(function(i) {
      $(this).hide();
      $(this).css({
        'left': convertPositionToCSS(articlePositions[i]).x,
        'top': convertPositionToCSS(articlePositions[i]).y,
      });
    });
    $('#' + anchor).show().animate({'opacity': 1.0}, 250, function() {
      $(this).children('h2').click();
    });
  }
});
