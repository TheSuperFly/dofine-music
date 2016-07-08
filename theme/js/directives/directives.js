'use strict';

angular.module('wp')
  .directive('gallery', function () {
    return {
      scope: {
        pictures: '=pictures'
      },
      link: function (scope, element, attrs) {
        scope.$on('ngRepeatFinished', function () {
          element.find('.bxslider').bxSlider({
            pager: false,
            nextText: 'Suivant ⟶',
            prevText: '⟵ Précédent',
            auto: true,
            minSlides: 7,
            maxSlides: 7,
            infiniteLoop: true,
            slideWidth: 170,
            slideMargin: 2,
            moveSlides: 1
          });
        });
      },
      templateUrl: localized.partials + 'directive/gallery.html'
    }
  })

  .directive('onFinishRender', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    }
  }])

  .directive('voteButton', ['$location', 'toolService', function ($location, toolService) {
    return {
      restrict: 'E',
      link: function (scope, element, attr) {
        scope.callVote = function () {
          if (scope.hasVoted === true) {
            FB.ui({
              method: 'share',
              href: $location.absUrl()
            }, function (response) {

            });
          } else {
            toolService.doVoteFor(attr.idvote)
              .then(function successCallback(res) {
                console.log(res);
                if (res === "Timeout")
                  scope.voteText = "Les votes sont clos.";
                else
                  scope.voteText = "Merci d'avoir voté. Partager ?";

                scope.hasVoted = true;
              }, function failureCallback(res) {
                scope.voteText = "Vous avez déjà voté.";
                scope.hasVoted = true;
              });
          }
        };
      },
      templateUrl: localized.partials + 'directive/vote.html'
    }
  }])

  .directive('contactForm', ['wpApiService', '$sce', '$timeout', function (wpApiService, $sce, $timeout) {
    return {
      restrict: 'E',
      template: "<div ng-bind-html='contactForm'></div>",
      link: function (scope, element, attr) {
        wpApiService.getContactForm()
          .then(function (data) {
            scope.contactForm = $sce.trustAsHtml(data.data);
            $timeout(function() {
              autosize(element.find('.wpcf7-textarea'));
              element.find('.wpcf7 > form').wpcf7InitForm();
            }, 1500);
          });
      }
    }
  }])

  .directive('parallaxScrolling', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var elementScrollTop = element.offset().top;
        angular.element($window).bind("scroll", function() {
          element.css(
            'transform',
            'translate3d(0px, ' + Math.round(
              (elementScrollTop - this.pageYOffset) * 0.10
            ) + 'px, 0px)'
          );
        });
      }
    }
  })

  .directive('inViewport', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {

        var scrollTop = element.offset().top;

        var scrollPosition = {
          scrollTopWithoutElementHeight: scrollTop - element.height(),
          scrollTopWithElementHeight: scrollTop + element.height()
        };

        angular.element($window).bind("scroll", function() {
          if (inViewport(scrollPosition, $window)) {
            element.addClass(attr.inViewport || 'isInViewport');
          } else {
            element.removeClass(attr.inViewport || 'isInViewport');
          }
        });
      }
    }
  })

  .directive('collapsingLogo', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var newScrollTopPixel = 0;
        var lastScrollTopPixel = 0;

        angular.element($window).bind("scroll", function() {

          if (this.pageYOffset >= 130) {
            element.addClass('isCollapsed');
          } else {
            element.removeClass('isCollapsed');
          }

          lastScrollTopPixel = this.pageYOffset;
        });
      }
    }
  });

var inViewport = function(data, $window) {
  return $window.pageYOffset >= data.scrollTopWithoutElementHeight
      && $window.pageYOffset <= data.scrollTopWithElementHeight
};