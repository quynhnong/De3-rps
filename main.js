//slide image

let images = [
    "img/product-3.png",
    "img/product-1.png",
    "img/product-2.png",
    "img/product-4.png",
    "img/product-5.png",
];


var num = 1;

function next(context) {
  const parentElement = context.closest(".container-product");
    var slider = parentElement.querySelector(".slider");

    num++;
    if(num >= images.length) {
        num = 0;
    }
    slider.src = images[num];

}

function prev(context) {
  const parentElement = context.closest(".container-product");
    var slider = parentElement.querySelector(".slider");

    num--;
    if(num < 0) {
        num = images.length-1;
    }
    slider.src = images[num];

}


//slider


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}



//add cart


let products = [
  {
    img: 'img/product-1',
    name: 'Kubusbowl Small',
    price: 179,
    inCart: 0
  },
  {
    img: 'img/product-2',
    name: 'Divine Footstool',
    price: 179,
    inCart: 0
  },
  {
    img: 'img/product-3',
    name: 'Cache Pendant Lamp 1',
    price: 179,
    inCart: 0
  },
  {
    img: 'img/product-4',
    name: 'RIO Chair',
    price: 179,
    inCart: 0
  },
  {
    img: 'img/product-5',
    name: 'Cache Pendant Lamp',
    price: 179,
    inCart: 0
  },
  {
    img: 'img/product-6',
    name: 'Prismatic table',
    price: 69,
    inCart: 0
  },
  {
    img: 'img/product-7',
    name: 'CobraT hermo Cup',
    price: 179,
    inCart: 0
  },
  {
    img: 'img/product-8',
    name: 'Montana Collection',
    price: 179,
    inCart: 0
  }
]


let carts = document.querySelectorAll('.add-cart')

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}

function onLoadCartNumber(){
  let productNumbers = localStorage.getItem('cartNumbers')

  if(productNumbers){
    document.querySelector('.list-icon .cart-icon .cart-icon-active').textContent = productNumbers;
  }
}

function cartNumbers(product){


  let productNumbers = localStorage.getItem('cartNumbers')
  productNumbers = parseInt(productNumbers)

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.list-icon .cart-icon .cart-icon-active').textContent = productNumbers + 1;

  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.list-icon .cart-icon .cart-icon-active').textContent = 1;
  }

  setItems(product);

}

function setItems(product){
  let cartItems = localStorage.getItem('productInCart')
  cartItems = JSON.parse(cartItems)

  if(cartItems != null){

    if(cartItems[product.name] == undefined){
      cartItems = {
        ...cartItems,
        [product.name]: product
      }
    }
    cartItems[product.name].inCart += 1
  }else{
    product.inCart = 1    
    cartItems = {
      [product.name]: product
  }

  }
  localStorage.setItem('productInCart', JSON.stringify
  (cartItems))
  
}


function totalCost(product){
  
  let cartCost = localStorage.getItem('totalCost')
  
  if(cartCost != null) {
    cartCost = JSON.parse(cartCost)
    localStorage.setItem('totalCost', cartCost + product.price)
  }else{
    localStorage.setItem('totalCost', product.price)
  }
  
}

function displayCart(){
  let cartItems = localStorage.getItem('productInCart')
  cartItems = JSON.parse(cartItems)

  let productContainer = document.querySelector('.car-icon-list-item')

  if(cartItems && productContainer){
    productContainer.innerHTML = ''
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <li class="cart-icon-item">
          <div class="cart-icon-item-img">
              <img src="${item.img}.png" alt="">
          </div>
          <div class="cart-icon-item-info">
              <div class="cart-icon-info-name">
                  <h5>${item.name}</h5>
              </div>
              <div class="cart-icon-info-price">
                  <h5>$${item.price}.00</h5>
              </div>
          </div>
          <div class="cart-icon-item-amount">
              <span class="cart-icon-item-mutiply">
                  x
              </span>
              <span class="cart-icon-item-qnt">
                  ${item.inCart}
              </span>
          </div>
      </li>
      ` 
    })
  }
}

displayCart();
onLoadCartNumber();


