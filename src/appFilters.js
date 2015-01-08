angular.module('customFilters', [])


.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})

.filter('rounded', function () {
	return function(items) {
    if(typeof items == 'number') {
        return items.toFixed(2);
    }else {
      return NaN;
    }
	};
});
