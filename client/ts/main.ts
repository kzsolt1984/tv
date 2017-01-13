///<reference path="../../client/lib/ts/jquery.d.ts" />

module main {
    export class Main {
        constructor() {            
            this.recommender();
        }
        
        public recommender() {
            var $box = $('.recommend-block').parent('.col-xs-4'),
                $clone = $box.clone(true),
                $cont = $('.live-recommender-container > .row');
            
            for (var i= 0; i< 3; i++) {
                
                 $cont.append($clone);
            }
        }
    }
}

$(document).ready(() => {
    new main.Main();
});