$.fn.clickMe = function(options){
    var $this = this;

    $this.each(function(){
        var self = $(this);

        self.options = {
            content: "Click Me!",
            background: "white",
            clickCallback: false
        };
        if(options !== undefined){
            $.extend(self.options, options);
        }

        function createElement(parent){
            var el = $("<div class=\"click-me-cover\"><div>");
            el.css("background-color", self.options.background);
            var content = el.find("div");
            content.html(self.options.content);
            return el;
        }
        var clickMe = createElement(self);

        self.mutate = function(){
            self.addClass('click-me');
            self.prepend(clickMe);
        }

        self.putBack = function(){
            self.removeClass('click-me');
            clickMe.remove();
        }

        /* event based */
        self.on("click", function(){
            self.putBack();
            if(
                self.options.clickCallback 
                && 
                $.isFunction(self.options.clickCallback)
            ){
                self.options.clickCallback();
            }
        });

        /* procedural */
        self.mutate();
    });
};