$(function() {

	// Do our DOM lookups beforehand
	var subnav_container = $(".subnav-container");
	var nav = $("nav");

	subnav_container.waypoint({
		handler: function(event, direction) {
			nav.toggleClass('sticky', direction=='down');
			
			if (direction == 'down') subnav_container.css({ 'height':nav.outerHeight() });
			else subnav_container.css({ 'height':'auto' });
		},
		offset: 15
	});

});