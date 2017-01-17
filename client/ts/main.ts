///<reference path="../../client/lib/ts/jquery.d.ts" />

module main {
    export class Main {
        constructor() {            
            this.recommender();
            this.otherRecommender();
            
            this._bind();
        }
        
        public recommender() {
            var $box = $('.recommend-block'),
                
                $cont = $('.live-recommender-container > div');
            
            for (var i= 0; i< 2; i++) {
                var $clone = $box.clone();
                 $cont.append($clone);
            }
        }
        
        public otherRecommender() {
            var $box = $('.other-recommender-container .thumbnail-big'),
                
                $cont = $('.other-recommender-container > div');
            
            for (var i= 0; i< 7; i++) {
                var $clone = $box.clone();
                 $cont.append($clone);
            }
        }
        
        private _bind() {
            // change page lskins
            var $skinLinks = $('#change-skin').find('a');
            
            $skinLinks.on('click', (e: JQueryEventObject) => {
                var newClass = $(e.currentTarget).attr('id'),
                    classes = ['dark-green', 'light-green', 'dark-orange', 'light-orange'],
                addClass = $('body').hasClass(newClass) ? false : true;
                
                if (newClass === classes[0]) {
                    $('body').removeClass(classes[1]);
                    $('body').removeClass(classes[2]);
                    $('body').removeClass(classes[3]);
                    $('body').addClass(newClass);
                }
                else if (newClass === classes[1]) {
                    $('body').removeClass(classes[0]);
                    $('body').removeClass(classes[2]);
                    $('body').removeClass(classes[3]);
                    $('body').addClass(newClass);
                }
                else if (newClass === classes[2]) {
                    $('body').removeClass(classes[0]);
                    $('body').removeClass(classes[1]);
                    $('body').removeClass(classes[3]);
                    $('body').addClass(newClass);
                }
                else if (newClass === classes[3]) {
                    $('body').removeClass(classes[0]);
                    $('body').removeClass(classes[2]);
                    $('body').addClass(classes[1]);
                    $('body').addClass(newClass);
                }
                
                return false;
            });
            
            //change chat skins
            var $chatLinks = $('#change-chat-skin').find('a');
            
            $chatLinks.on('click', (e: JQueryEventObject) => {
                var newClass = $(e.currentTarget).attr('id'),
                addClass = newClass === 'chat-2' ? true : false;
    
                if (addClass) {
                    $('body').addClass('chat-2');
                }
                else {
                    $('body').removeClass('chat-2');
                }
                
                return false;
            });
        }
    }
}

$(document).ready(() => {
    new main.Main();
});