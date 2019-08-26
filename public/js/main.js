$(document).ready(function () {
	// Инициализация слайдера
	function fullSlider() {
		const $slider = $(".js-fullpage");
		$slider
			.on('init', function () {
				mouseWheel($slider)
			})
			.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				vertical: true,
				infinite: false,
				 responsive: [
					{
						breakpoint: 768,
						settings: "unslick"
					},
				]
			})
		function mouseWheel($slider) {
			$(window).on('wheel', { $slider: $slider }, mouseWheelHandler)
		}
		function mouseWheelHandler(event) {
			// event.preventDefault()
			const $slider = event.data.$slider
			const delta = event.originalEvent.deltaY
			if(delta > 0) {
				$slider.slick('slickNext')
			}
			else {
				
				$slider.slick('slickPrev')
			}
		}
	}

	var $windowWidth = $(window).width();
	var showFyllSlider = true;

	if ($windowWidth > 767) {
		fullSlider();
	}

	$(window).resize(function(){
		$windowWidth = $(window).width();

		if ($windowWidth > 767) {
			if (showFyllSlider == false) {
				fullSlider();
				showFyllSlider = true;
			}
		}else{
			 showFyllSlider = false;
		}
	});

	// Плавный переход к ссылке
	if ($('.js-link-move').length) {
		$('body').on('click','.js-link-move', function (event) {
			event.preventDefault();

			if ($windowWidth>767) {
				var $slider = $(".js-fullpage");
				var slide = $(this).attr('data-slide');
				$slider.slick('slickGoTo', slide);
			} else {
				var id  = $(this).attr('href'),
				top = $(id).offset().top;
				$('body,html').animate({scrollTop: top}, 1000);

				// Проверка наличия анимации
				// productAnim(1);
			}
		});
	}

	// Показать/скрыть футер
	$('.js-fullpage').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if (nextSlide == 3) {
			$('.js-footer').addClass('show');
		} else {
			$('.js-footer').removeClass('show');
		}
	});

	// Маска для телефона
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 9999999");

	// Вывод сообщения об успешной отправке в попапе
	$('.js-valid-form').each(function(){
		$(this).on('submit',function(e){
			$.fancybox.close();
			$.fancybox.open({
				src  : '#msg-success',
				type : 'inline',
				opts : {
					
				}
			});
			$(this)[0].reset();
			e.preventDefault();
		});
	});

	// Добавление анимации
	$('#slide0').addClass('animate');

	$('.js-fullpage').on('beforeChange', function(event, slick, currentSlide, nextSlide){

		$('#slide'+currentSlide).removeClass('animate');
		$('#slide'+nextSlide).addClass('animate');
	});

	// Открыть/Закрыть мобильное меню
	$('.js-open-menu').click(function(){
		$('.js-open-menu').toggleClass('active');
		$('.js-top-menu').slideToggle();
	});

	 $(document).click(function(event) {
		if ($(event.target).closest(".js-open-menu").length) return;
		if ($(event.target).closest(".js-top-menu").length) return;
		$('.js-open-menu').removeClass('active');
		$('.js-top-menu').slideUp();
		event.stopPropagation();
	});
});