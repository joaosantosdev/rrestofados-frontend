(() => {
  let selectData;
  let selectInput;

  $(document).on('focus', '.select-input', function () {
    const element = $(this).parent().find('.select-data');
    const input = $(this);
    if (input.length > 0) {
      selectInput = selectInput = $(input[0]);
    }
    if (element.length > 0) {
      $(element[0]).addClass('d-block');
      selectData = element
    }
    console.log($(this).find('.select-data').length)

  });

  let inputVal;
  let inputId;
  $(document).on('focusout', '.select-input', function () {
    setTimeout(() => {
      if (selectData) {
        selectData.removeClass('d-block');
      }
      if (selectInput && !inputVal) {
        selectInput.val('');
      } else {
        selectInput.val(inputVal);
        selectInput.data('id', inputId);
      }
    }, 100)
  });

  $(document).on('click', '.select-item', function (event ) {
    console.log($(this).data('id'))
    inputId = $(this).data('id');
    inputVal = $(this).text();
  });
  document.addEventListener('scroll', function (event) {
    let scrollY = document.getElementById('container-dashboard').scrollTop
    if (window.innerWidth > 996)
      return;
    if (scrollY < 50) {
      $('#floating-dashboard-sidebar').removeClass('floating-dashboard-sidebar-open')
      return
    }
    $('#floating-dashboard-sidebar').addClass('floating-dashboard-sidebar-open')
  }, true)


  $(window).resize(function () {

    if (window.innerWidth <= 996) {
      $('#floating-dashboard-sidebar').removeClass('floating-dashboard-sidebar-open')
      $('#content-dashboard-black').removeClass('content-dashboard-black')
      $('#sidebar').removeClass('open-sidebar')
    }
  });
  $(document).on('click', '.toggle-sidebar', () => {
    $('#content-dashboard-black').toggleClass('content-dashboard-black')
    $('#sidebar').toggleClass('open-sidebar')
  })


  $(document).on('click', '.link-navigation', function () {

    $('#content-dashboard-black').removeClass("content-dashboard-black")
    $('#sidebar').removeClass('open-sidebar')
    scrollTo(0, 0)
    let node = $(this);

    for (let element of $('.link-navigation')) {
      $(element).removeClass('link-navigation-active')
    }


    for (let element of $('.link-navigation[data-navigation=' + node.data('navigation') + ']')) {

      $(element).addClass('link-navigation-active')
    }


  })
})()
