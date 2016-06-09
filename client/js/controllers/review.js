// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllReviewsController', ['$scope', 'Review', function($scope,
      Review) {
    $scope.reviews = Review.find({
      filter: {
        include: [
          'coffeeShop',
          'reviewer'
        ]
      }
    });
  }])
  .controller('AllProductsController', ['$scope', 'Product', function($scope,
      Product) {
    $scope.products = Product.find();
	
	$scope.byRange = function (fieldName, minValue, maxValue) {
  if (minValue === undefined) minValue = 0;
  if (maxValue === undefined) maxValue = 500;

  return function predicateFunc(item) {
    return minValue <= item[fieldName] && item[fieldName] <= maxValue;
  };
};
  
  }])
  .controller('AddReviewController', ['$scope', 'CoffeeShop', 'Review',
      '$state', function($scope, CoffeeShop, Review, $state) {
    $scope.action = 'Add';
    $scope.coffeeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = false;

    CoffeeShop
      .find()
      .$promise
      .then(function(coffeeShops) {
        $scope.coffeeShops = coffeeShops;
        $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
      });

    $scope.submitForm = function() {
      Review
        .create({
          rating: $scope.review.rating,
          comments: $scope.review.comments,
          coffeeShopId: $scope.selectedShop.id
        })
        .$promise
        .then(function() {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('AddProductController', ['$scope', 'Product',
      '$state', function($scope, Product, $state) {
    $scope.action = 'Ajouter';
    $scope.product = {};
    $scope.isDisabled = false;

    $scope.submitForm = function() {
      Product
        .create({
          Name: $scope.product.Name,
		  Description: $scope.product.Description,
		  Rate: $scope.product.Rate,
		  ReducedRate: $scope.product.ReducedRate,
		  AnnualFee: $scope.product.AnnualFee,
		  RewardsProgram: $scope.product.RewardsProgram,
		  CashBack: $scope.product.CashBack,
		  ImageURL: $scope.product.ImageURL          
        })
        .$promise
        .then(function() {
          $state.go('all-products');
        });
    };
  }])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Review
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-reviews');
      });
  }])
  .controller('DeleteProductController', ['$scope', 'Product', '$state',
      '$stateParams', function($scope, Product, $state, $stateParams) {
    Product
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('all-products');
      });
  }])
  .controller('EditReviewController', ['$scope', '$q', 'CoffeeShop', 'Review',
      '$stateParams', '$state', function($scope, $q, CoffeeShop, Review,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.coffeeShops = [];
    $scope.selectedShop;
    $scope.review = {};
    $scope.isDisabled = true;

    $q
      .all([
        CoffeeShop.find().$promise,
        Review.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var coffeeShops = $scope.coffeeShops = data[0];
        $scope.review = data[1];
        $scope.selectedShop;

        var selectedShopIndex = coffeeShops
          .map(function(coffeeShop) {
            return coffeeShop.id;
          })
          .indexOf($scope.review.coffeeShopId);
        $scope.selectedShop = coffeeShops[selectedShopIndex];
      });

    $scope.submitForm = function() {
      $scope.review.coffeeShopId = $scope.selectedShop.id;
      $scope.review
        .$save()
        .then(function(review) {
          $state.go('all-reviews');
        });
    };
  }])
  .controller('EditProductController', ['$scope', '$q', 'Product',
      '$stateParams', '$state', function($scope, $q, Product,
      $stateParams, $state) {
    $scope.action = 'Modifier';
    $scope.product = {};
    $scope.isDisabled = true;

    $q
      .all([        
        Product.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {        
        $scope.product = data[0];      
      });

    $scope.submitForm = function() {
      $scope.product
        .$save()
        .then(function(Product) {
          $state.go('all-products');
        });
    };
  }])
  .controller('ViewProductController', ['$scope', '$q', 'Product',
      '$stateParams', '$state', function($scope, $q, Product,
      $stateParams, $state) {
    $scope.action = 'Visualiser';
    $scope.product = {};
    $scope.isDisabled = true;

    $q
      .all([        
        Product.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {        
        $scope.product = data[0];      
      });

    $scope.submitForm = function() {
      $scope.product
        .$save()
        .then(function(Product) {
          $state.go('all-products');
        });
    };
  }])
  .controller('MyReviewsController', ['$scope', 'Review', '$rootScope',
      function($scope, Review, $rootScope) {
    $scope.reviews = Review.find({
      filter: {
        where: {
          publisherId: $rootScope.currentUser.id
        },
        include: [
          'coffeeShop',
          'reviewer'
        ]
      }
    });
  }])
  .component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
      this.user = 'world';
    }
  });
