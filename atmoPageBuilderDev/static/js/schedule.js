
(function () {
  var f = function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('id', 'mobifitness_widget_script');
    script.setAttribute('data-domain', 'mobifitness.ru');
    script.setAttribute('data-language', 'ru');
    script.setAttribute('data-id', '540997');
    script.setAttribute('data-club', '978');
    script.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//mobifitness.ru/js/widget/widget.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  if (window.opera == '[object Opera]') {
    document.addEventListener('DOMContentLoaded', f, false);
  } else { f(); }
 })()