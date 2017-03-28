/*!
 * jQuery fitToParent; version: 1.2.1
 * https://github.com/drewbaker/fitToParent
 */
jQuery.fn.fitToParent = function (options) {

  this.each(function () {
    // Vars
    var $el = jQuery(this);
    var $box;

    // Get size parent (box to fit element in)
    if ($el.closest('.size-parent').length) {
      $box = $el.closest('.size-parent');
    } else {
      $box = $el.parent();
    }

    // These are the defaults.
    var settings = jQuery.extend({
      heightOffset: 0,
      widthOffset: 0,
      boxHeight: $box.height(),
      boxWidth: $box.width(),
      callback: null
    }, options);

    // Setup box and element widths
    var width = $el.attr('width');
    var height = $el.attr('height');

    if (!width || !height) {
      var width = $el.width();
      var height = $el.height();
    }

    var parentWidth = settings.boxWidth - settings.widthOffset;
    var parentHeight = settings.boxHeight - settings.heightOffset;

    // console.log(`settings.boxWidth, parentWidth ${settings.boxWidth} ${parentWidth}`);

    // Maintain aspect ratio
    var aspect = $el.data('aspect');
    if (!aspect) {
      aspect = width / height;
      $el.data('aspect', aspect);
    }

    // removed for flexbox parent with dynamic height
    //  var parentAspect = parentWidth / parentHeight;
    // // Resize to fit box
    // if (aspect > parentAspect) {
    //   newWidth = parentWidth;
    //   console.log(`aspect > width ${newWidth}`)
    //   newHeight = (newWidth / aspect);
    //
    // } else {
    //   newHeight = parentHeight;
    //   newWidth = newHeight * aspect;
    //   console.log(`aspect < width ${newWidth}`)
    // }

    newWidth = parentWidth;
    newHeight = (newWidth / aspect);

    // console.log(`width before setting ${newWidth}`)

    // Set new size of element
    $el.width(newWidth);
    $el.height(newHeight);

    // Fire callback
    if (typeof (settings.callback) == "function") {
      settings.callback(newWidth, newHeight);
    }

  });
};
