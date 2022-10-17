import webModule from '@/app-module/web'

const BOTTOM_LOADER_DIRECTIVE_NAME = 'bottomLoader'

webModule
  .directive(BOTTOM_LOADER_DIRECTIVE_NAME, [
    "$timeout",
    function ($timeout) {
      return {
        link: linkFn,
        restrict: "EA",
        transclude: false,
        scope: {
          bottomLoader: "&"
        }
      };

      function linkFn(scope, ele, attr) {
        ele.css({
          overflow: "auto",
          position: "relative"
        });

        var scrollTid;

        function onScroll() {
          $timeout.cancel(scrollTid);

          scrollTid = $timeout(function () {
            if ($(ele)[0].scrollHeight > 0 &&
              $(ele).parent().height() + $(ele).scrollTop() + 10 >= $(ele)[0].scrollHeight
            ) {
              scope.bottomLoader();
            }
          }, 500);
        }

        onScroll();

        $(window).resize(onScroll);
        $(ele).scroll(onScroll);
      }
    }
  ]);

export default BOTTOM_LOADER_DIRECTIVE_NAME
