$(document).ready(function(){
	$('.menu nav > ul > li').each(function(){
		if($(this).find('ul').length)
		{
			$(this).children('a').addClass('has-ul');
		}
	});
	var thisClick = 0;
	$('.menu nav > ul > li').click(function(){
		$(this).find('ul').slideToggle(250);
		thisClick++;
		if(thisClick % 2 != 0)
		$(this).children('a').addClass('rPin');
		else
		$(this).children('a').removeClass('rPin');

	});

	$("html").niceScroll();
});
