///<reference path="../../lib/ts/jquey.custom-scrollbar.d.ts" />
///<reference path="./commonController.ts" />
///<reference path="../component/chat/chatComponent.ts" />
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />
///<reference path="../component/usercontenteditor/userContentEditor.ts" />

module controller {
    export class UserPageController extends CommonController {
        // private _scrollContainer: JQuery;

        constructor() {
            super();

            /*this._scrollContainer = $('.content-with-bars .middle-content');
            this._scrollContainer.customScrollbar();*/

            new component.VideoPlayerComponent($('.video-box'), true);
            new component.ChatComponent();
            new component.UserContentEditor($('.user-content .content-panel'), $('.user-content .editor-form'));
        }
    }
}
