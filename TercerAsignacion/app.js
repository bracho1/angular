(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('StoredData', "https://davids-restaurant.herokuapp.com");
/*.component('foundItems ', {
  templateUrl: 'foundItems.html',
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});*/


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  var promise = MenuSearchService.getMenuCategories();

  promise.then(function (foundItems) {
    menu.categories = foundItems.data['menu_items'];
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.getMatched = function(searchTerm){
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      menu.search =  response.data['menu_items'] ;
      var found= [];

      for (var i = 0; i < menu.search.length; i++) {

      var name = menu.search[i].name;
      var short_name = menu.search[i].short_name;
      var description = menu.search[i].description;

        if (description.toLowerCase().indexOf(searchTerm) !== -1) {

          var item={
            name: name,
            short_name: short_name,
            description: description

          }
          found.push(item);
        }
      }
      menu.itemsfound = found;
      /*console.log(menu.itemsfound);*/
  })
    .catch(function (error) {
      console.log(error);
    })
  };


}

MenuSearchService.$inject = ['$http', 'StoredData'];
function MenuSearchService($http, StoredData) {
  var service = this;
  var foundMatchItems = [];
  service.getMenuCategories = function () {
    var foundItems = $http({
      method: "GET",
      url: (StoredData + "/menu_items.json")
    });

    return foundItems;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    var foundItems = $http({
      method: "GET",
      url: (StoredData + "/menu_items.json"),
    });

    return foundItems;
  };

}

})();
