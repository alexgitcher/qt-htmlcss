/* jQuery */

// function selectProduct() {
//   var btnBuy = $('.btn-buy'),
//     product = $('.product'),
//     productActive = $('.product__item--active');

//   productActive.each(function () {
//     $(this).on('click', function () {
//       $(this)
//         .removeClass('hover-enabled')
//         .toggleClass('product__item--selected');
//     });
//   });

//   btnBuy.each(function () {
//     $(this).on('click', function () {
//       $(this)
//         .closest(product)
//         .find(productActive)
//         .addClass('product__item--selected');
//     });
//   });
// }

// function setHover() {
//   $(document).on('mouseleave', '.product__item--selected', function () {
//     $(this).addClass('hover-enabled');
//   });
// }

// function showCatalog() {
//   var catalog = $('.catalog');

//   catalog.addClass('catalog--visible');
// }

// function setHeightToProductBody() {
//   var productBodies = $('.product__body'),
//     productBodiesLength = productBodies.length,
//     maxHeight = 0;

//   for (var i = 0; i < productBodiesLength; i++) {
//     var productBody = productBodies[i],
//       productBodyHeight = $(productBody).outerHeight();

//     maxHeight = productBodyHeight > maxHeight ? productBodyHeight : maxHeight;
//   }

//   for (var i = 0; i < productBodiesLength; i++) {
//     var productBody = productBodies[i];

//     $(productBody).css('height', maxHeight + 'px');
//   }
// }

// $(document).ready(function() {
//   setHeightToProductBody();
//   setTimeout(showCatalog, 200)
//   selectProduct();
//   setHover();
// });


/* Vanilla JS */

function setHover() {
  var productSelected = document.querySelectorAll('.product__item--selected');

  for (var i = 0; i < productSelected.length; i++) {
    var product = productSelected[i];

    product.addEventListener('mouseleave', function (e) {
      var target = e.target;
      target.classList.add('hover-enabled');
    });
  }
}

function selectProduct() {
  var btnBuy = document.querySelectorAll('.btn-buy'),
    productActive = document.querySelectorAll('.product__item--active');

  for (var i = 0; i < productActive.length; i++) {
    var product = productActive[i];

    product.addEventListener('click', function () {
      var that = this;
      that.classList.remove('hover-enabled');
      that.classList.toggle('product__item--selected');
      setHover();
    });
  }

  for (var i = 0; i < btnBuy.length; i++) {
    var btn = btnBuy[i];

    btn.addEventListener('click', function () {
      var productItem = this.parentElement.previousElementSibling;
      productItem.classList.remove('hover-enabled');
      productItem.classList.add('product__item--selected');
      setHover();
    });
  }
}

function showCatalog() {
  var catalog = document.querySelector('.catalog');

  catalog.classList.add('catalog--visible');
}

function setHeightToProductBody() {
  var productBodies = document.querySelectorAll('.product__body'),
    productBodiesLength = productBodies.length,
    maxHeight = 0;

  for (var i = 0; i < productBodiesLength; i++) {
    var productBody = productBodies[i],
      productBodyHeight = productBody.clientHeight;

    maxHeight = productBodyHeight > maxHeight ? productBodyHeight : maxHeight;
  }

  for (var i = 0; i < productBodiesLength; i++) {
    var productBody = productBodies[i];

    productBody.style.height = maxHeight + 'px';
  }
}

document.addEventListener('DOMContentLoaded', function (e) {
  setHeightToProductBody();
  setTimeout(showCatalog, 200)
  selectProduct();
});