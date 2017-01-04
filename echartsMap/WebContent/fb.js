(function() {
  var fibonacci = function(n) {
    return n < 2 ? 1 : (fibonacci(n - 1) + fibonacci(n - 2));
  };

  onmessage = function(event) {
    postMessage({
      input: event.data,
      result: fibonacci(event.data)
    });
  };

})();