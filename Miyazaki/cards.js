var moviesDictionary = {};

function getData() {
  var movieTemp = $("#movieTemp").html();

  $.get("https://miyazakicards.firebaseio.com/movies.json", function(movies) {
    for(var i = 0; i < movies.length; i++){
    	var currMovie = movies[i];
    	var formalTemp = Mustache.render(movieTemp, currMovie);
    	$("#cardsContainer").append(formalTemp);
   	};
    buildDict(movies);
    bindEventListeners();
  });
}

function bindEventListeners(){
	$(".card").click(function(e){
		var targetID = e.target.id;
		var info = moviesDictionary[targetID];

		var lightboxTemp = $("#lightboxTemp").html();
		var formalTemp = Mustache.render(lightboxTemp, info);

    var galleryTemp = $("#galleryTemp").html();
    var galTemp = Mustache.render(galleryTemp, info);

		$("#lightboxContainer").html(formalTemp);
		$("#lightboxContainer").fadeIn();
		$("#mask").fadeIn();
	});

	$("#mask").click(function(e){
		$("#lightboxContainer").fadeOut();
		$("#mask").fadeOut();
	});
}

function buildDict(movies) {
  for (var i = 0; i < movies.length; i++) {
    var currMovie = movies[i];
    moviesDictionary[currMovie.id] = currMovie;
  }
}

getData();