///<reference path="../../lib/ts/jquey.custom-scrollbar.d.ts" />
///<reference path="./pageController.ts" />
///<reference path="../component/chat/chatComponent.ts" />
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />

module controller {
    export class UserPageController extends PageController {
        // private _scrollContainer: JQuery;

        constructor() {
            super();

            /*this._scrollContainer = $('.content-with-bars .middle-content');
            this._scrollContainer.customScrollbar();*/

            new component.VideoPlayerComponent($('.video-box'), true);
            new component.ChatComponent();
        }
    }
}
