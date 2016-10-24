$(function () {
  
  /* ===========================================================================
   * Navbar links scroll animation
   * ======================================================================== */

  // Add click listener to links starting with '#'
  $('a[href^="#"]').on('click', function (e) {

    // Cancel default action
    e.preventDefault();

    // Animate scroll
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 200);

  });

});