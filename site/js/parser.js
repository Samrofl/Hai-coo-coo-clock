var stringBuild = function(el){
    var message = "Hello World!";
        $(el).html(message);
}

var newString = new stringBuild($('#messenger'));