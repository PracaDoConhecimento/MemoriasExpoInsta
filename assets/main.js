// main.js
var numElements = 0;
var SETUP_CID = "SEU_ID_VAI_AQUI"
var SETUP_HASHTAG = "doglovers"; //"circulandomemorias";

function createPhotoElement(photo) {
  var randomNumber = Math.floor(Math.random() * 10) + 1;
  var hRand = Math.random();
  var heightClass = hRand > 0.85 ? 'grid-item--height3' : hRand > 0.5 ? 'grid-item--height2' : '';
  var innerHtml = $('<img>')
    .addClass('instagram-image')
    .attr('src', photo.images.low_resolution.url);

  innerHtml = $('<a>')
    .attr('target', '_blank')
    .attr('href', photo.link)
    .append(innerHtml);

  return $('<div>')
    .addClass('instagram-placeholder')
    .attr('id', photo.id)
    .addClass('grid-item')
    //.addClass(heightClass)
    .append(innerHtml);
}

function didLoadInstagram(event, response) {
  var that = $('.instagram');

  $.each(response.data, function(i, photo) {
    $(that).append(createPhotoElement(photo));
    numElements++;
  });
}

function getInstagramPhotos() {
	var CLIENT_ID = SETUP_CID,
    	hashtag = SETUP_HASHTAG;

	$('.instagram.tag').on('didLoadInstagram', didLoadInstagram);
	$('.instagram.tag').instagram({
		hash: hashtag,
		count: 60,
		clientId: CLIENT_ID
	});
}


$(document).ready(function() {

	var $grid = $('.grid'),
      $removeElement,
      refreshTime = 160000;

    //incializa o Instagram API
    getInstagramPhotos();

    //delay para executar o Isotope
    //setTimeout(function(){

      // init Masonry after all images have loaded
      var $grid = $('.grid').imagesLoaded( function() {
        $grid.masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-sizer'
        });
      });

    //}, 3000);

    //depois de 15s faz refresh na página
    setInterval(function(){
      $('.instagram').animate({
          opacity: 0
      }, 1000, function() {
        location.reload();
      });
    }, 100000);

});
