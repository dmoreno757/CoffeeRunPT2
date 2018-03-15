(function (window) {
  "use strict";
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }
  //text
  Truck.prototype.createOrder = function (order, returnData) {
    console.log("Adding order for " + order.emailAddress);
    this.db.post(order.emailAddress, order, returnData);
  };

  Truck.prototype.deliverOrder = function (customerId) {
    console.log("Delivering order for " + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(this.db.getAll());
    console.log("Truck #" + this.truckId + " has pending orders");
    customerIdArray.forEach(function (id) {
      console.log(this.db.get(id));
    }.bind(this));
  };

  App.Truck = Truck;
  window.App = App;
})(window);