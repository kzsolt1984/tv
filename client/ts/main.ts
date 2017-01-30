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
            this.otherRecommender($('.other-recommender-container li'), $('.other-recommender-container > ul'), 7);
            this.otherRecommender($('.result-container li'), $('.result-container > ul'), 7);
        }
        
        public recommender() {
            var $box = $('.recommend-block'),
                
                $cont = $('.live-recommender-container > div');
            
            for (var i = 0; i < 2; i++) {
                var $clone = $box.clone();
                 $cont.append($clone);
            }
        }
        
        public otherRecommender($box: JQuery, $cont: JQuery, elementNumb: number) {            
            for (var i = 0; i < elementNumb; i++) {
                var $clone = $box.clone();
                 $cont.append($clone);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new main.Main();
});
