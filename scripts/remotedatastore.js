(function (window) {
  "use strict";
  var App = window.App;
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }


  RemoteDataStore.prototype.post = function (key, val, returnData) {
    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);
      returnData(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + "/" + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    console.log(key)
    var element = this.serverUrl;
    $.ajax(element + "/" + key, {
      type: "DELETE",
      error: function (serverResponse) {
        console.log(serverResponse);
      }
    });
  }

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
