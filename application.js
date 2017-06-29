$(document).ready(function() {
  hideShowNavigation(false);
  $('section#resultsSection').hide();
  $('section#photoPage').hide();
  $('section#formSection').hide();
  $('footer#footer').hide();
  $(".button-collapse").sideNav();
  $(".dropdown-button").dropdown();
  $('.modal').modal({
    dismissible: true,
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '4%',
    endingTop: '10%',
  });
});

function hideShowNavigation(pageLanded) {
  if (pageLanded) {
    $("#main-logo").hide();
    $("#top-navigation").show().fadeIn(1000);
  } else {
    $("#top-navigation").hide();
  }
}

$('#getStarted').on('click', function(event) {
  event.preventDefault();
  hideShowNavigation(true);
  $('section#aboutPage').hide();
  $('section#photoPage').hide();
  $('section#resultsSection').hide();
  $('footer#footer').hide();
  $('section#formSection').fadeIn(1000);
});

function showForm(event) {
  event.preventDefault();
  hideShowNavigation(true);
  $('section#aboutPage').hide();
  $('section#photoPage').hide();
  $('section#resultsSection').hide();
  $('footer#footer').hide();
  $('section#formSection').fadeIn(1000);
};

$('#navHome').click(function() {
  event.preventDefault()
  hideShowNavigation(false);
  $('section#aboutPage').fadeIn(1000);
  $('section#resultsSection').hide();
  $('section#photoPage').hide();
  $('section#formSection').hide();
  $('footer#footer').hide();
  $('body').addClass('hero-image')
  $('body').removeClass('hero-image2')
})

$('#getPreferences').click(showForm)
$('#navPreferences').click(showForm)
$('#navPreferences').click(function() {
  $('body').removeClass('hero-image2')
  $('body').addClass('hero-image')
})

$('#submitPreferences').click(getFeesting)
$('#navFeest').click(getFeesting)
$('#navFeest').click(function() {
  $('body').removeClass('hero-image')
  $('body').removeClass('hero-image2')
})

function getFeesting(event) {
  event.preventDefault();
  $('section#aboutPage').hide();
  $('section#formSection').hide();
  $('section#resultsSection').hide();
  $('body').removeClass('hero-image');
  $('section#photoPage').fadeIn(2000);
  $('footer#footer').fadeIn(2000);
};

$('button#seeResults').on('click', function(event) {
  $('.parallax').parallax();
  $('section#aboutPage').hide();
  $('section#formSection').hide();
  $('section#resultsSection').hide();
  $('body').removeClass('hero-image')
  $('body').addClass('hero-image2')
  $('section#photoPage').hide();
  $('section#resultsSection').fadeIn(1000);
  $('footer#footer').fadeIn(2000);
})

var baseUnsplashUrl = "https://api.unsplash.com/search/photos?client_id=62e3d91fc8fcb724fb9edfd9521f294e316ff7bce473d2dec7c6439506d05b77&per_page=50&query="

var baseYummlyUrlSearch = "http://api.yummly.com/v1/api/recipes?_app_id=9fb6f741&_app_key=37e23e3f543cdcbfe5cb3a808364475a&q="

var baseZomatoUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=305&entity_type=city&q="

$('#submitPreferences').click(function(event) {
  event.preventDefault();
  if ($('.returns input[name="lookingFor"]:checked').val() === 'restaurants') {
    getPhoto()
  } else if ($('.returns input[name="lookingFor"]:checked').val() === 'browse') {
    justBrowse()
  }
})

$('#like').click(function(event) {
  event.preventDefault();
  if ($('.returns input[name="lookingFor"]:checked').val() === 'restaurants') {
    getPhoto()
    getResults()
  } else if ($('.returns input[name="lookingFor"]:checked').val() === 'browse') {
    justBrowse()
  }
})

$('#pass').click(function(event) {
  event.preventDefault();
  if ($('.returns input[name="lookingFor"]:checked').val() === 'restaurants') {
    getPhoto()
  } else if ($('.returns input[name="lookingFor"]:checked').val() === 'browse') {
    justBrowse()
  }
})

$('#seeResults').click(function(event){
  event.preventDefault();
  if ($('.returns input[name="lookingFor"]:checked').val() === 'restaurants') {
    $('.emptyMessage').hide()
  } else if ($('.returns input[name="lookingFor"]:checked').val() === 'browse') {
    $('.emptyMessage').fadeIn(1000)
  }
})

function getPhoto() {
  // event.preventDefault();
  var $preferences = [];
  $('.queryCategories input[type="checkbox"]:checked').each(function() {
    $preferences.push($(this).val());
  })
  var randomQuery = $preferences[Math.floor(Math.random() * $preferences.length)];

  $.ajax({
    url: baseZomatoUrl + randomQuery,
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function(data) {
      var $photoUrls = [];
      var $restaurantName = [];
      var $restaurantUrl = [];
      for (var i = 0; i < data.restaurants.length; i++) {
        $photoUrls.push(data.restaurants[i].restaurant.featured_image);
        $restaurantName.push(data.restaurants[i].restaurant.name);
        $restaurantUrl.push(data.restaurants[i].restaurant.url);
      }
      for (var j = 0; j < $photoUrls.length; j++) {
        if ($photoUrls[j] === '') {
          $photoUrls.splice([j], 1)
          $restaurantName.splice([j], 1)
          $restaurantUrl.splice([j], 1)
        }
      }
      var num = Math.floor(Math.random() * $photoUrls.length);
      var randomPhoto = $photoUrls[num];
      localStorage.setItem('randomPhoto', $photoUrls[num])
      localStorage.setItem('randomRestaurantName', $restaurantName[num]);
      localStorage.setItem('randomRestaurantUrl', $restaurantUrl[num]);
      $("#food-image").attr("src", randomPhoto).fadeIn(1000);
    },
    error: function(err) {},
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Zomato-API-Key", "f3effe238b6248953e1ab5ef7ea12c7f");
    }
  })
}
// local storage browser can store info
// localStorage.setItem('variable', 'value')
// localStorage.getItem('variable')
function getResults() {
  $('.resultsList').append(
    '<div class="col s12 m6 l4">' +
    '<div class="card">' +
    '<div class="card-image">' +
    '<img src="' + localStorage.getItem('randomPhoto') + '" >' +
    '</div>' +
    '<div class="card-content">' +
    '<h6>' + localStorage.getItem('randomRestaurantName') + '</h6>' +
    '<div class="card-action" style="padding: 0;">' +
    '<a href="' + localStorage.getItem('randomRestaurantUrl') + '" > ' + 'Visit' + ' ' + localStorage.getItem('randomRestaurantName') + ' ' + 'Website' + ' ' + '<i class="fa fa-chevron-right" aria-hidden="true"></i>' + '</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  )
}

function justBrowse() {
  var $preferences = [];
  $('.queryCategories input[type="checkbox"]:checked').each(function() {
    $preferences.push($(this).val());
  })
  var newRandomQuery = $preferences[Math.floor(Math.random() * $preferences.length)];
  $.get(baseUnsplashUrl + newRandomQuery)
    .then(function(data) {
      var $photoUrls = [];
      for (var i = 0; i < data.results.length; i++) {
        $photoUrls.push((data.results[i].urls.regular));
      }
      var newRandomPhoto = $photoUrls[Math.floor(Math.random() * $photoUrls.length)];
      $("#food-image").attr("src", newRandomPhoto).fadeIn(1000);
    })
}




//  $('#food-image').animate({left:800}, {duration: 'slow', easing: 'easeOutQuad'});
