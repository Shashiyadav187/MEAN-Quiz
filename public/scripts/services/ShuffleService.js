myApp.service('Shuffle', function () {
    this.randomizeArray = function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x); return o;
    };
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});