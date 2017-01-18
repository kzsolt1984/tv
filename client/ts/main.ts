///<reference path="../lib/ts/jquery.d.ts" />
///<reference path="./core/config.ts" />
///<reference path="./core/bootstrap.ts" />

module main {
    export class Main {
        constructor() {        
            /* system init */    
            conf.Config.init();
            new component.Bootstrap(); 
            /* system init end */    

            this.recommender();
            this.otherRecommender();
        }
        
        public recommender() {
            var $box = $('.recommend-block'),
                
                $cont = $('.live-recommender-container > div');
            
            for (var i = 0; i < 2; i++) {
                var $clone = $box.clone();
                 $cont.append($clone);
            }
        }
        
        public otherRecommender() {
            var $box = $('.other-recommender-container .thumbnail-big'),
                
                $cont = $('.other-recommender-container > div');
            
            for (var i = 0; i < 7; i++) {
                var $clone = $box.clone();
                 $cont.append($clone);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new main.Main();
});
