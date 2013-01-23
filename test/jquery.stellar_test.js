/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

		// Ensure tests aren't executed faster than framerate
		QUnit.testStart(function() {
			stop();
			setTimeout(start, (1000 / 30));
		});
	
		var helpers = {
			vendorPrefix: (function() {
				var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
					style = document.getElementsByTagName('script')[0].style,
					prefix = '',
					prop;

				for (prop in style) {
					if (prefixes.test(prop)) {
						prefix = prop.match(prefixes)[0];
						break;
					}
				}

				if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
				if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

				return function(property) {
					return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
				};
			}())
		};

		module('$.fn.stellar');

		test('is chainable', 1, function() {
			var $window = $(window).stellar('destroy').stellar({
				hideDistantElements: false
			});
			strictEqual($window[0], window, 'should be chaninable');
			$window.stellar('destroy');
		});
		
		module('$.stellar');
		
		test('refers to window', 1, function() {
			strictEqual($.stellar().stellar('destroy')[0], window, 'should refer to winow');
		});
		
		module('Absolute parallax elements');
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio--1').css('top'), '40px', 'should support negative ratios');
				strictEqual($('#position-absolute .ratio-0-5').css('top'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#position-absolute .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#position-absolute .ratio-2').css('top'), '-20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support vertical ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				verticalOffset: -20
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio--1').css('top'), '0px', 'should support negative ratios');
				strictEqual($('#position-absolute .ratio-0-5').css('top'), '0px', 'should support ratios between 0 and 1');
				strictEqual($('#position-absolute .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#position-absolute .ratio-2').css('top'), '0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio--1').css('left'), '40px', 'should support negative ratios');
				strictEqual($('#position-absolute .ratio-0-5').css('left'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#position-absolute .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#position-absolute .ratio-2').css('left'), '-20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				horizontalOffset: -20
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio--1').css('left'), '0px', 'should support negative ratios');
				strictEqual($('#position-absolute .ratio-0-5').css('left'), '0px', 'should support ratios between 0 and 1');
				strictEqual($('#position-absolute .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#position-absolute .ratio-2').css('left'), '0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module('Fixed parallax elements');
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-fixed .ratio--1').css('top'), '20px', 'should support negative ratios');
				strictEqual($('#position-fixed .ratio-0-5').css('top'), '-10px', 'should support ratios between 0 and 1');
				strictEqual($('#position-fixed .ratio-1').css('top'), '-20px', 'should support ratios of 1');
				strictEqual($('#position-fixed .ratio-2').css('top'), '-40px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support vertical ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				verticalOffset: -20
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-fixed .ratio--1').css('top'), '0px', 'should support negative ratios');
				strictEqual($('#position-fixed .ratio-0-5').css('top'), '0px', 'should support ratios between 0 and 1');
				strictEqual($('#position-fixed .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#position-fixed .ratio-2').css('top'), '0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#position-fixed .ratio--1').css('left'), '20px', 'should support negative ratios');
				strictEqual($('#position-fixed .ratio-0-5').css('left'), '-10px', 'should support ratios between 0 and 1');
				strictEqual($('#position-fixed .ratio-1').css('left'), '-20px', 'should support ratios of 1');
				strictEqual($('#position-fixed .ratio-2').css('left'), '-40px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				horizontalOffset: -20
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#position-fixed .ratio--1').css('left'), '0px', 'should support negative ratios');
				strictEqual($('#position-fixed .ratio-0-5').css('left'), '0px', 'should support ratios between 0 and 1');
				strictEqual($('#position-fixed .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#position-fixed .ratio-2').css('left'), '0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module('Scrolling backgrounds');
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-scroll .ratio--1').css('background-position'), '0px 40px', 'should support negative ratios');
				strictEqual($('#background-attachment-scroll .ratio-0-5').css('background-position'), '0px 10px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-scroll .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-scroll .ratio-2').css('background-position'), '0px -20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support vertical ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				verticalOffset: -20
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-scroll .ratio--1').css('background-position'), '0px 0px', 'should support negative ratios');
				strictEqual($('#background-attachment-scroll .ratio-0-5').css('background-position'), '0px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-scroll .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-scroll .ratio-2').css('background-position'), '0px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-scroll .ratio--1').css('background-position'), '40px 0px', 'should support negative ratios');
				strictEqual($('#background-attachment-scroll .ratio-0-5').css('background-position'), '10px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-scroll .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-scroll .ratio-2').css('background-position'), '-20px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				horizontalOffset: -20
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-scroll .ratio--1').css('background-position'), '0px 0px', 'should support negative ratios');
				strictEqual($('#background-attachment-scroll .ratio-0-5').css('background-position'), '0px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-scroll .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-scroll .ratio-2').css('background-position'), '0px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('passes background-position-y value through when scrolling is horizontal only', 4, function() {
			$(window).stellar({
				verticalScrolling: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#background-horizontal-only .ratio--1').css('background-position'), '40px 100%', 'should support negative ratios');
				strictEqual($('#background-horizontal-only .ratio-0-5').css('background-position'), '10px 100%', 'should support ratios between 0 and 1');
				strictEqual($('#background-horizontal-only .ratio-1').css('background-position'), '0px 100%', 'should support ratios of 1');
				strictEqual($('#background-horizontal-only .ratio-2').css('background-position'), '-20px 100%', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('passes background-position-x value through when scrolling is vertical only', 4, function() {
			$(window).stellar({
				horizontalScrolling: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#background-vertical-only .ratio--1').css('background-position'), '100% 40px', 'should support negative ratios');
				strictEqual($('#background-vertical-only .ratio-0-5').css('background-position'), '100% 10px', 'should support ratios between 0 and 1');
				strictEqual($('#background-vertical-only .ratio-1').css('background-position'), '100% 0px', 'should support ratios of 1');
				strictEqual($('#background-vertical-only .ratio-2').css('background-position'), '100% -20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});

		module("Fixed backgrounds");
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-fixed .ratio--1').css('background-position'), '0px 20px', 'should support negative ratios');
				strictEqual($('#background-attachment-fixed .ratio-0-5').css('background-position'), '0px -10px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-fixed .ratio-1').css('background-position'), '0px -20px', 'should support ratios of 1');
				strictEqual($('#background-attachment-fixed .ratio-2').css('background-position'), '0px -40px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support vertical ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				verticalOffset: -20
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-fixed .ratio--1').css('background-position'), '0px 0px', 'should support negative ratios');
				strictEqual($('#background-attachment-fixed .ratio-0-5').css('background-position'), '0px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-fixed .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-fixed .ratio-2').css('background-position'), '0px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-fixed .ratio--1').css('background-position'), '20px 0px', 'should support negative ratios');
				strictEqual($('#background-attachment-fixed .ratio-0-5').css('background-position'), '-10px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-fixed .ratio-1').css('background-position'), '-20px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-fixed .ratio-2').css('background-position'), '-40px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios with offsets correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				horizontalOffset: -20
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#background-attachment-fixed .ratio--1').css('background-position'), '0px 0px', 'should support negative ratios');
				strictEqual($('#background-attachment-fixed .ratio-0-5').css('background-position'), '0px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#background-attachment-fixed .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#background-attachment-fixed .ratio-2').css('background-position'), '0px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module("Parallax elements with offset parents");
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#offset-parent-elements .ratio--1').css('top'), '40px', 'should support negative ratios');
				strictEqual($('#offset-parent-elements .ratio-0-5').css('top'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#offset-parent-elements .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#offset-parent-elements .ratio-2').css('top'), '-20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#offset-parent-elements .ratio--1').css('left'), '40px', 'should support negative ratios');
				strictEqual($('#offset-parent-elements .ratio-0-5').css('left'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#offset-parent-elements .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#offset-parent-elements .ratio-2').css('left'), '-20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module("Parallax elements with offset parents and custom offsets");
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio--1').css('top'), '40px', 'should support negative ratios');
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio-0-5').css('top'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio-2').css('top'), '-20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio--1').css('left'), '40px', 'should support negative ratios');
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio-0-5').css('left'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#offset-parent-elements-with-custom-offsets .ratio-2').css('left'), '-20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module("Parallax backgrounds with offset parents");
		
		asyncTest('support vertical ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#offset-parent-backgrounds .ratio--1').css('background-position'), '0px 40px', 'should support negative ratios');
				strictEqual($('#offset-parent-backgrounds .ratio-0-5').css('background-position'), '0px 10px', 'should support ratios between 0 and 1');
				strictEqual($('#offset-parent-backgrounds .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#offset-parent-backgrounds .ratio-2').css('background-position'), '0px -20px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('support horizontal ratios correctly', 4, function() {
			$(window).stellar({
				hideDistantElements: false
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#offset-parent-backgrounds .ratio--1').css('background-position'), '40px 0px', 'should support negative ratios');
				strictEqual($('#offset-parent-backgrounds .ratio-0-5').css('background-position'), '10px 0px', 'should support ratios between 0 and 1');
				strictEqual($('#offset-parent-backgrounds .ratio-1').css('background-position'), '0px 0px', 'should support ratios of 1');
				strictEqual($('#offset-parent-backgrounds .ratio-2').css('background-position'), '-20px 0px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module("'scrollProperty' option");
		
		asyncTest('supports "transform" correctly vertically (required for iOS support)', 4, function() {
			var $elem = $('#scroll-property-transform-scroller').stellar('destroy').stellar({
				hideDistantElements: false,
				scrollProperty: 'transform'
			});

			$elem[0].style[helpers.vendorPrefix('transform')] = 'translateY(-20px)';
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('top'), '40px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('top'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('top'), '-20px', 'should support ratios greater than 1');
				
				$elem.stellar('destroy')[0].style[helpers.vendorPrefix('transform')] = 'none';
				start();
			}, 20);
		});
		
		asyncTest('supports "transform" correctly horizontally (required for iOS support)', 4, function() {
			var $elem = $('#scroll-property-transform-scroller').stellar('destroy').stellar({
				hideDistantElements: false,
				scrollProperty: 'transform'
			});

			$elem[0].style[helpers.vendorPrefix('transform')] = 'translateX(-20px)';
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('left'), '40px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('left'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('left'), '-20px', 'should support ratios greater than 1');
				
				$elem.stellar('destroy')[0].style[helpers.vendorPrefix('transform')] = 'none';
				start();
			}, 20);
		});
		
		module("'positionProperty' option");
		
		asyncTest('supports "transform" correctly vertically', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'transform'
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual(getComputedStyle($('#position-absolute .ratio--1')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[5], '40', 'should support negative ratios');
				strictEqual(getComputedStyle($('#position-absolute .ratio-0-5')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[5], '10', 'should support ratios between 0 and 1');
				strictEqual(getComputedStyle($('#position-absolute .ratio-1')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[5], '0', 'should support ratios of 1');
				strictEqual(getComputedStyle($('#position-absolute .ratio-2')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[5], '-20', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('supports "transform" correctly horizontally', 4, function() {
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'transform'
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual(getComputedStyle($('#position-absolute .ratio--1')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[4], '40', 'should support negative ratios');
				strictEqual(getComputedStyle($('#position-absolute .ratio-0-5')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[4], '10', 'should support ratios between 0 and 1');
				strictEqual(getComputedStyle($('#position-absolute .ratio-1')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[4], '0', 'should support ratios of 1');
				strictEqual(getComputedStyle($('#position-absolute .ratio-2')[0])[helpers.vendorPrefix('transform')].match(/(-?[0-9]+)/g)[4], '-20', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('supports custom functions correctly vertically', 4, function() {
			$.stellar.positionProperty.testVertical = {
				setTop: function($element, newTop, originalTop) {
					$element.css('top', newTop * 10);
				},
				setLeft: function($element, newLeft, originalLeft) {
					$element.css('left', newLeft * 10);
				}
			};
			
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'testVertical'
			}).scrollTop(20).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('top'), '400px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('top'), '100px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('top'), '-200px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('supports custom functions correctly horizontally', 4, function() {
			$.stellar.positionProperty.testHorizontal = {
				setTop: function($element, newTop, originalTop) {
					$element.css('top', newTop * 100);
				},
				setLeft: function($element, newLeft, originalLeft) {
					$element.css('left', newLeft * 100);
				}
			};
			
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'testHorizontal'
			}).scrollTop(0).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('left'), '4000px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('left'), '1000px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('left'), '-2000px', 'should support ratios greater than 1');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('supports positionProperty with a single function', 8, function() {
			$.stellar.positionProperty.singleFunction = {
				setPosition: function($element, newLeft, originalLeft, newTop, originalTop) {
					$element.css('top', newTop * 100);
					$element.css('left', newLeft * 100);
				}
			};
			
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'singleFunction'
			}).scrollTop(20).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('top'), '4000px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('top'), '1000px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('top'), '-2000px', 'should support ratios greater than 1');
				
				strictEqual($('#scroll-property-transform .ratio--1').css('left'), '4000px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('left'), '1000px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('left'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('left'), '-2000px', 'should support ratios greater than 1');

				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});

		asyncTest('supports positionProperty with a single function vertically', 8, function() {
			$.stellar.positionProperty.singleFunctionVertically = {
				setPosition: function($element, newLeft, originalLeft, newTop, originalTop) {
					$element.css('top', newTop);
					$element.css('left', newLeft);
				}
			};
			
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'singleFunctionVertically',
				horizontalScrolling: false
			}).scrollTop(20).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('top'), '40px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('top'), '10px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('top'), '-20px', 'should support ratios greater than 1');
				
				strictEqual($('#scroll-property-transform .ratio--1').css('left'), '0px', "shouldn't alter 'left' value");
				strictEqual($('#scroll-property-transform .ratio-0-5').css('left'), '0px', "shouldn't alter 'left' value");
				strictEqual($('#scroll-property-transform .ratio-1').css('left'), '0px', "shouldn't alter 'left' value");
				strictEqual($('#scroll-property-transform .ratio-2').css('left'), '0px', "shouldn't alter 'left' value");

				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});

		asyncTest('supports positionProperty with a single function horizontally', 8, function() {
			$.stellar.positionProperty.singleFunctionVertically = {
				setPosition: function($element, newLeft, originalLeft, newTop, originalTop) {
					$element.css('top', newTop);
					$element.css('left', newLeft);
				}
			};
			
			$(window).stellar({
				hideDistantElements: false,
				positionProperty: 'singleFunctionVertically',
				verticalScrolling: false
			}).scrollTop(20).scrollLeft(20);
			
			setTimeout(function() {
				strictEqual($('#scroll-property-transform .ratio--1').css('top'), '0px', 'should support negative ratios');
				strictEqual($('#scroll-property-transform .ratio-0-5').css('top'), '0px', 'should support ratios between 0 and 1');
				strictEqual($('#scroll-property-transform .ratio-1').css('top'), '0px', 'should support ratios of 1');
				strictEqual($('#scroll-property-transform .ratio-2').css('top'), '0px', 'should support ratios greater than 1');
				
				strictEqual($('#scroll-property-transform .ratio--1').css('left'), '40px', "shouldn't alter 'left' value");
				strictEqual($('#scroll-property-transform .ratio-0-5').css('left'), '10px', "shouldn't alter 'left' value");
				strictEqual($('#scroll-property-transform .ratio-1').css('left'), '0px', "shouldn't alter 'left' value");
				strictEqual($('#scroll-property-transform .ratio-2').css('left'), '-20px', "shouldn't alter 'left' value");

				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module("'hideDistantElements' option");
		
		asyncTest('hides elements correctly vertically', 1, function() {
			$(window).stellar({
				hideDistantElements: true
			}).scrollTop(100).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').css('display'), 'none', 'should hide elements when outside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('hides elements correctly horizontally', 1, function() {
			$(window).stellar({
				hideDistantElements: true
			}).scrollTop(0).scrollLeft(100);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').css('display'), 'none', 'should hide elements when outside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('shows elements correctly vertically', 1, function() {
			$(window).stellar({
				hideDistantElements: true
			}).scrollTop(99).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').css('display'), 'block', 'should show elements when inside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('shows elements correctly horizontally', 1, function() {
			$(window).stellar({
				hideDistantElements: true
			}).scrollTop(0).scrollLeft(99);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').css('display'), 'block', 'should show elements when inside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('shows elements using custom function correctly vertically', 1, function() {
			$(window).stellar({
				hideDistantElements: true,
				showElement: function($elem){
					$elem.data('test-visible-vertical', true);
				},
				hideElement: function($elem){
					$elem.data('test-visible-vertical', false);
				}
			}).scrollTop(99).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').data('test-visible-vertical'), true, 'should call the "showElement" function when inside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('hides elements using custom function correctly vertically', 1, function() {
			$(window).stellar({
				hideDistantElements: true,
				showElement: function($elem){
					$elem.data('test-visible-vertical', true);
				},
				hideElement: function($elem){
					$elem.data('test-visible-vertical', false);
				}
			}).scrollTop(100).scrollLeft(0);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').data('test-visible-vertical'), false, 'should call the "showElement" function when inside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('shows elements using custom function correctly horizontally', 1, function() {
			$(window).stellar({
				hideDistantElements: true,
				showElement: function($elem){
					$elem.data('test-visible-horizontal', true);
				},
				hideElement: function($elem){
					$elem.data('test-visible-horizontal', false);
				}
			}).scrollTop(0).scrollLeft(99);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').data('test-visible-horizontal'), true, 'should call the "showElement" function when inside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		asyncTest('hides elements using custom function correctly horizontally', 1, function() {
			$(window).stellar({
				hideDistantElements: true,
				showElement: function($elem){
					$elem.data('test-visible-horizontal', true);
				},
				hideElement: function($elem){
					$elem.data('test-visible-horizontal', false);
				}
			}).scrollTop(0).scrollLeft(100);
			
			setTimeout(function() {
				strictEqual($('#position-absolute .ratio-1').data('test-visible-horizontal'), false, 'should call the "showElement" function when inside viewport');
				
				$(window).stellar('destroy').scrollTop(0).scrollLeft(0);
				start();
			}, 20);
		});
		
		module("'responsive' option");

		test('refreshes instance on window resize', 1, function() {
			$(window).stellar({
				responsive: true
			});

			var itRefreshed = false,
				oldRefresh = window.Stellar.prototype.refresh;

			window.Stellar.prototype.refresh = function() {
				itRefreshed = true;
			};

			$(window).resize();
			
			strictEqual(itRefreshed, true);

			window.Stellar.prototype.refresh = oldRefresh;
			$(window).stellar('destroy');
		});

		test('doesnt refresh instance on window resize if responsive is disabled', 1, function() {
			$(window).stellar({
				responsive: false
			});

			var itRefreshed = false,
				oldRefresh = window.Stellar.prototype.refresh;

			window.Stellar.prototype.refresh = function() {
				itRefreshed = true;
			};

			$(window).resize();
			
			strictEqual(itRefreshed, false);

			window.Stellar.prototype.refresh = oldRefresh;
			$(window).stellar('destroy');
		});

}(jQuery));
