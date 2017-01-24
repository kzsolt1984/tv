///<reference path="../../lib/ts/lodash.d.ts" />

module component {
    
    export class Bootstrap {
        private _bodyId: any;

        constructor() {
            this._bodyId = document.querySelector('body').getAttribute('id');

            this._setController();
        }

        /**
         * Set active controller
         * @private
         */
        private _setController(): void {
            var controllerName: any = _.upperFirst(this._bodyId + 'Controller'),
                win: any = window;  // compailer semantic error protection

            if (win['controller'][controllerName]) {
                new win['controller'][controllerName];
            }
            else {
                new win['controller']['CommonController'];
                console.error('Controller no exist', controllerName);
            }
        }
    }
}
