///<reference path="../../../lib/ts/bootstrap-markdown.d.ts" />

module component {
    export class UserContentEditor {
        private _$panel: JQuery;
        private _$editorForm: JQuery;
        private _$textarea: JQuery;

        constructor($panel: JQuery, $editorForm: JQuery) {
            this._$panel = $panel;
            this._$editorForm = $editorForm;
            this._$textarea = $editorForm.find('textarea');

            

            this._bind();
        }

        protected _bind(): void {
            $('.edit-panel-btn').on('click', (e: JQueryEventObject) => {
                this._setEditorData(this._$panel);

                return false;
            });
        }

        private _setEditorData($panels: JQuery): void {
            // var $editor = this._$editorForm.clone(true);
            $.each($panels, (index: any, value: any) => {
                var $element = $(value),
                    $editor = this._$editorForm.clone(),
                    title = $element.find('.title').text(),
                    desc = $element.find('.description').html(),
                    imgSrc = $element.find('img').attr('src');

                    $editor.find('.title-input').val(title);
                    // $editor.find('textarea').val(desc);
                    $editor.removeClass('hide');
                    $element.after($editor);

                    this._addMarkdown($editor.find('textarea'));

                    var p = $editor.find('textarea').data('markdown').parseContent();
                    console.log('parsed: ', p);
                    $element.remove();
                console.log(title, desc, imgSrc);
            });
        }

        private _addMarkdown($textarea: JQuery): void {
            $textarea.markdown({
                hiddenButtons: 'cmdPreview cmdUrl cmdImage',
                iconlibrary: 'fa',
                fullscreen: {
                    enable: false
                },
                onShow: function(e) {
                    console.log('1: ', e.getContent());
                    console.log('2: ', e.parseContent());
                }
            });          
        }
    }
}
