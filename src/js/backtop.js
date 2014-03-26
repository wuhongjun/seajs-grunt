define(function(require, exports, module) {

    var $ = require('jquery');

    module.exports = {

        init: function(data) {

            //add element
            var $self;
            $self = $('<a/>' , {
                id: data.scrollName,
                href: '#top'
            })
            $self.appendTo('body');

            //css
            $self.css({
                display: 'none',
                position: 'fixed',
                zIndex: data.zIndex
            });

            var animIn, animOut, animSpeed, scrollDis,triggerVisible;

            animIn = 'show';
            animOut = 'hide';
            animSpeed = 10;
            scrollDis = data.scrollDistance;
            triggerVisible = false;

            $(window).scroll( function() {
                if( $(window).scrollTop() > scrollDis ) {
                    if(!triggerVisible) {
                        $self[animIn](animSpeed)
                        triggerVisible = true
                    }
                } else {
                    if(triggerVisible) {
                        $self[animOut](animSpeed)
                        triggerVisible = false
                    }
                }
            });

            $self.click(function(e){
                e.preventDefault()

                $('html, body').animate({scrollTop: 0}, 300, 'linear')
            });

        }

    }
})