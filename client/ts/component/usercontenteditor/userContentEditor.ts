///<reference path="../../../lib/ts/bootstrap-markdown.d.ts" />

module component {
    export class UserContentEditor {
        private _$textarea: JQuery;

        constructor($textarea: JQuery) {
            this._$textarea = $textarea;

            this._$textarea.markdown({
                hiddenButtons: 'cmdPreview cmdUrl cmdImage',
                iconlibrary: 'fa',
                fullscreen: {
                    enable: false
                }
            });
        }
    }
}
