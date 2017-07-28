(function () {
  'use strict';
  try {
    var header = document.getElementById('header');
    var toc = document.getElementById('article-toc');
    var tocTop = document.getElementById('article-toc-top');
    var headerHeight = header.clientHeight;

    if (!toc) return;

    function updateSidebarPosition() {
      var scrollTop = document.scrollingElement.scrollTop;

      if (scrollTop > headerHeight) {
        //toc.classList.add('fixed');
      } else {
        toc.classList.remove('fixed');
      }
    }

    window.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateSidebarPosition);
    });

    updateSidebarPosition();

    if (tocTop) {
      tocTop.addEventListener('click', function (e) {
        e.preventDefault();
        document.scrollingElement.scrollTop = 0;
      });
    }

  } catch (e) {
    console.error(e)
  }


})();