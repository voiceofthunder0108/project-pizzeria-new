/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

const select = {
  templateOf: {
    menuProduct: "#template-menu-product",
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 0,
      defaultMax: 10,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product{
    constructor(id, data){
      const thisProduct = this; //utworzony obiekt (instancja)
      thisProduct.id = id; //dodajemy do każdej instancji odpowiednie dane pod kluczem id i data
      thisProduct.data = data;
      thisProduct.renderInMenu();
      console.log('New Product:', thisProduct);
    }

    renderInMenu(){
      const thisProduct = this; //utworzony obiekt (instancja)
      /* generate HTML based on template */
      const generatedHTML = templates.menuProduct(thisProduct.data);
      /* create element using utilis.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);
      /* add element to menu */
      menuContainer.appendChild(thisProduct.element);
    }
  }

  const app = {
    initMenu: function(){ //tworzenie menu
      const thisApp = this; //this = app
      console.log('thisApp.data:', thisApp.data);
      //const testProduct = new Product();
      //console.log('testproduct', testProduct);
      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]) //productData = klucz np. cake, 2nd argument = wartości klucza 
      }
    },

    initData: function(){ //dostęp do danych z data.js, potem będzie zmodyfikowana aby dane były pobierane z serwera
      const thisApp = this; //this = app
      
      thisApp.data = dataSource;
    },

    init: function(){ //inicjacja aplikacji
      const thisApp = this; //this = app
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();
}
