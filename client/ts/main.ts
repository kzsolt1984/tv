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
            var $links = $('#change-skin').find('a');
            
            $links.on('click', (e: JQueryEventObject) => {
                $('body').attr('class', $(e.currentTarget).attr('id'));
                
                return false;
            });
        }
    }
}

$(document).ready(() => {
    new main.Main();
});