$(function() {

	var Page = (function() {

		var $nav = $( '#nav-dots > span' ),
			slitslider = $( '#slider' ).slitslider( {
				onBeforeChange : function( slide, pos ) {

					$nav.removeClass( 'nav-dot-current' );
					$nav.eq( pos ).addClass( 'nav-dot-current' );

				}
			} ),

			init = function() {

				initEvents();
				
			},
			initEvents = function() {

				$nav.each( function( i ) {
				
					$( this ).on( 'click', function( event ) {
						
						var $dot = $( this );
						
						if( !slitslider.isActive() ) {

							$nav.removeClass( 'nav-dot-current' );
							$dot.addClass( 'nav-dot-current' );
						
						}
						
						slitslider.jump( i + 1 );
						return false;
					
					} );
					
				} );

			};

			return { init : init };

	})();

	Page.init();

	/**
	 * Notes: 
	 * 
	 * example how to add items:
	 */

	/*
	
	var $items  = $('<div class="sl-slide sl-slide-color-2" data-orientation="horizontal" data-slice1-rotation="-5" data-slice2-rotation="10" data-slice1-scale="2" data-slice2-scale="1"><div class="sl-slide-inner bg-1"><div class="sl-deco" data-icon="t"></div><h2>some text</h2><blockquote><p>bla bla</p><cite>Margi Clarke</cite></blockquote></div></div>');
	
	// call the plugin's add method
	ss.add($items);

	*/

});


(function($){
	$.fn.visaSlider = function(options) {
		if (!options) {
			options = {};
		};
		options = $.extend({
			'slidesOnPage': 3
		}, options);
		this.each(function () {
			var DOM = {},
				state = {},
				self = this;
			var plg = {
				cacheDOM: function () {
					DOM.$slider = $(self);
					DOM.$preloader = DOM.$slider.find('.slider-preloader');
					DOM.$filters = DOM.$slider.find('.filter-bar > .filter');
					DOM.$viewport = DOM.$slider.find('.slider-viewport');
					DOM.$sliderHolder = DOM.$viewport.find('.slider-holder');
					DOM.$slides = DOM.$sliderHolder.find('.slide');
				},
				init: function () {
					state.cur = state.cur || 0;
					state.activeSlides = DOM.$slides.length;
					DOM.$preloader.fadeOut(150);
				},
				resize: function () {
					state.sliderWidth = DOM.$viewport.width();
					state.slideWidth = DOM.$slides.eq(0).outerWidth();
					state.slideMargin = (state.sliderWidth - (state.slideWidth * options.slidesOnPage)) / (options.slidesOnPage * 2);
					if ((Math.abs(state.slideMargin * 2) + state.slideWidth) * options.slidesOnPage > state.sliderWidth && options.slidesOnPage > 1) {
						options.slidesOnPage--;
						this.resize();
						this.createPagination();
						return;
					}
					DOM.$sliderHolder.width((state.slideMargin * 2 + state.slideWidth) * state.activeSlides);
					DOM.$slides.css({
						'margin-left': state.slideMargin,
						'margin-right': state.slideMargin
					});
				},
				prevSlide: function () {
					var id = state.cur - 1;
					if (id < 0) {
						this.toSlide(state.activeSlides - 1);
						return;
					}
					this.toSlide(id);
				},
				nextSlide: function () {
					var id = state.cur + 1;
					if (id >= state.activeSlides) {
						this.toSlide(0);
						return;
					}
					this.toSlide(id);
				},
				toSlide: function (id) {
					DOM.$sliderHolder.css({
						'transform': 'translateX( -' + (state.sliderWidth * id) + 'px)'
					});
					DOM.$pagination.find('.page').eq(id).addClass('active').siblings().removeClass('active');
				},
				filter: function (param) {
					var visibleSlides = 0;
					DOM.$slides.each(function () {
						if ($(this).hasClass(param)) {
							$(this).stop(false, false).fadeIn(400);
							visibleSlides++;
						} else {
							$(this).stop(false, false).fadeOut(400);
						};
					});
					state.activeSlides = visibleSlides;
					this.toSlide(0);
					this.createPagination();
				},
				createPagination: function () {
					if (DOM.$pagination) {
						DOM.$pagination.empty();
					} else {
						DOM.$pagination = $('<div>').addClass('paginator-holder');
						DOM.$pagination.appendTo(DOM.$slider);
					};
					for (var i = 0; i < state.activeSlides / options.slidesOnPage; i++) {
						var page = $('<div>').data('page', i).addClass('page');
						if (!i) {
							page.addClass('active');
						};
						DOM.$pagination.append(page);
					};
					// DOM.$slider
					//
				}
			};

			plg.cacheDOM();
			plg.init();
			plg.createPagination();
			plg.resize();
			// console.log(DOM);

			// resize
			$(window).on('resize', function () {
				plg.resize();
			})

			// click events
			DOM.$slider.on('click', function (e) {
				var $target = $(e.target);
				if ($target.hasClass('page')) {
					plg.toSlide($(e.target).data('page'));
				} else if ($target.hasClass('filter')) {
					$target.addClass('active').siblings().removeClass('active');
					plg.filter($target.data('filter'));
				};
			})

			return plg;
		});
	};
})(jQuery);

$(document).on('ready', function () {
	$('.callback-link').on('click', function () {
		$('.backcall-holder').addClass('open');
	})
	$('.close-cross').on('click', function () {
		$('.backcall-holder').removeClass('open');
	})

	///////////infocards Opens/////////////
	$('.info-card').find('a').on('click', function () {
		$(this).closest('.info-card').toggleClass('open');
	});
})