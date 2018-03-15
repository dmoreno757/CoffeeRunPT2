(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selecter) {
    if (!selecter) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selecter);
    if (this.$formElement.length == 0) {
      throw new Error("Could not find element with selector: " + selecter);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });

      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };
  
  $("#pay").on("submit", function () {
    event.preventDefault();
    var data = {};
    $(this).serializeArray().forEach(function (item) {
      data[item.name] = item.value;
      console.log("input correctly");
    });
    $("#payConfirmation").text("Thank you for your payment " + data.username);
    $("#sticky").modal({});
    console.log(data);
  });

  FormHandler.prototype.addInputHandler = function (fn) {
    console.log("setting input handler for form");
    this.$formElement.on("input", "[name='emailAddress']", function (event) {
      var emailAddress = event.target.value;

      var message = "";
      if (fn(emailAddress)) {
        event.target.setCustomValidity("");
      } else {
        message = emailAddress + " is not an authorized email address";
        event.target.setCustomValidity(message);
      }

    });
  };




  App.FormHandler = FormHandler;
  window.App = App;
})(window);