$(document).ready(function () {
	logoGreyscale();
	$('a').pjax('#main')
	$('#main')
	  .bind('pjax:start', function() { $('#loading').show() })
	  .bind('pjax:end',   function() { $('#loading').hide(); logoGreyscale();})
	$.getJSON("/twitter_search/show", function(json){
		var twitterindex = 0;
		function changetwitter(){
			$('#twitter-text').fadeOut('slow', function() {
		    $("#twitter-text").html('@'+json[twitterindex].user.name+ ' ' + replaceURLWithHTMLLinks(json[twitterindex].text));
			$('#twitter-text').fadeIn('slow');
			if (twitterindex == json.length -1){
				twitterindex = 0;
				}
			else
				{
				twitterindex++;
				}
		  });
		};
		changetwitter();
		setTwinterval();
		var tinterval;
		function setTwinterval(){
			if(json.length > 1){
				tinterval =	setInterval(changetwitter, 10000);
				setTwitHover();
			}
		}
		
		function setTwitHover(){
			$("#twitter-bar").hover(
			  function () {
			    clearInterval(tinterval);
				tinterval = 0;
			  },
			  function () {
			    setTwinterval();
			  }
			);
		}
	

	});
	
	function replaceURLWithHTMLLinks(text) {
	    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    return text.replace(exp,"<a href='$1'>$1</a>"); 
	}
})

function logoGreyscale(){
	
	// Fade in images so there isn't a color "pop" document load and then on window load
	$("img.banner").fadeIn(3000);
	
	// clone image
	$('img.banner').each(function(){
		var el = $(this);
		el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.parent().css({"width":this.width,"height":this.height});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	});
	
	// Fade image 
	$('img.banner').mouseover(function(){
		$(this).parent().find('img:first').stop().animate({opacity:1}, 500);
	})
	$('.img_grayscale').mouseout(function(){
		$(this).stop().animate({opacity:0}, 500);
	});		
};

// Grayscale w canvas method
function grayscale(src){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = new Image();
	imgObj.src = src;
	canvas.width = imgObj.width;
	canvas.height = imgObj.height; 
	ctx.drawImage(imgObj, 0, 0); 
	var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
};