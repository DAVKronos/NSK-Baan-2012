$(document).ready(function () {
	$.getJSON("twitter_search/show", function(json){
		$("#twitter-bar").html('<img src =' + json.user.profile_image_url + '>' + json.text);
	});
})