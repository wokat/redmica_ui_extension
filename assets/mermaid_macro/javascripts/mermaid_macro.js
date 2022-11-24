// The conversion process when drawing the page is performed by initAllMermaidMacro().
// After that, initMermaidMacro() is executed separately to support mermaid macro added by ajax, etc.
(function ($) {
  this.initMermaidMacro = initMermaidMacro;

  $(function () {
    mermaid.initialize({
      startOnLoad: true
    });
  });

  function initMermaidMacro(id) {
    // If you run init on an element in the display: none state, the diagram will not be generated properly. In that case, do not run init.
    // Example: This happens when you open the notes tab of the issue page directly.
    const target = $('#' + id);

    if (target.is(':visible')) {
      mermaid.init(undefined, target);
    } else {
      // Keep polling for whether the element becomes visible eventually, as it's relatively cheap.
      setTimeout(function () {
        initMermaidMacro(id);
      }, 500);
    }
  }
})(jQuery);

