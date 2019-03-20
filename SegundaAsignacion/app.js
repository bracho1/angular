(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.service('ShoppingListService', ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService) {
  var itemAdder = this;

  itemAdder.items = ShoppingListService.getItems();
  itemAdder.boughtList = ShoppingListService.getItemsBought();

  itemAdder.addItem = function () {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }

  itemAdder.removeItem = function (itemIndex, Qtity, Name) {
    ShoppingListService.removeItem(itemIndex);
    try {
      ShoppingListService.addItem(Name, Qtity);
    } catch (error) {
      itemAdder.errorMessage = error.message;
    }

  };
}

function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [{
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "24"
  },
  {
    name: "Cookies",
    quantity: "50"
  },
  {
    name: "Chocolate",
    quantity: "3"
  },
  {
    name: "Waters",
    quantity: "2"
  }];

  var boughtList = [];

  service.addItem = function (itemName, quantity) {

    if(items.length <= 0){
      throw new Error("Everything is bought!");
    }else{
          var item = {
          name: itemName,
          quantity: quantity
        };
        boughtList.push(item);
    }

  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getItemsBought = function () {
    return boughtList;
  };

}

})();
