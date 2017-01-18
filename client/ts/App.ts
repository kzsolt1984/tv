'use strict';
///<reference path="../lib/ts/jquery.d.ts"/>
///<reference path="./core/Config.ts"/>

///<reference path="./core/bootstrap.ts"/>
module app {
    export class App {
        constructor() {
            conf.Config.init();

            new component.Bootstrap();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new app.App();
});
