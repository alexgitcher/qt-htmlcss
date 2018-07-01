const setHover = function () {
  const productSelected = document.querySelectorAll('.product__item--selected');

  for (let i = 0; i < productSelected.length; i += 1) {
    const product = productSelected[i];

    product.addEventListener('mouseleave', function (e) {
      const target = e.target;
      target.classList.add('hover-enabled');
    });
  }
};

const selectProduct = function () {
  const btnBuy = document.querySelectorAll('.btn-buy'),
    productActive = document.querySelectorAll('.product__item--active');

  for (let i = 0; i < productActive.length; i += 1) {
    const product = productActive[i];

    product.addEventListener('click', function () {
      const self = this;
      self.classList.remove('hover-enabled');
      self.classList.toggle('product__item--selected');
      setHover();
    });
  }

  for (let i = 0; i < btnBuy.length; i += 1) {
    const btn = btnBuy[i];

    btn.addEventListener('click', function () {
      const productItem = this.parentElement.previousElementSibling;
      productItem.classList.remove('hover-enabled');
      productItem.classList.add('product__item--selected');
      setHover();
    });
  }
};

const showCatalog = function () {
  const catalog = document.querySelector('.catalog');

  catalog.classList.add('catalog--visible');
};

const setHeightToProductBody = function () {
  const productBodies = document.querySelectorAll('.product__body'),
    productBodiesLength = productBodies.length;
  let maxHeight = 0;

  for (let i = 0; i < productBodiesLength; i += 1) {
    const productBody = productBodies[i],
      productBodyHeight = productBody.clientHeight;

    maxHeight = productBodyHeight > maxHeight ? productBodyHeight : maxHeight;
  }

  for (let i = 0; i < productBodiesLength; i += 1) {
    const productBody = productBodies[i];

    productBody.style.height = maxHeight + 'px';
  }
};

document.addEventListener('DOMContentLoaded', function () {
  setHeightToProductBody();
  setTimeout(showCatalog, 200)
  selectProduct();
});