///<reference path="./commonController.ts" />
///<reference path="../component/chat/chatComponent.ts" />
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />

module controller {
    export class MainPageController extends CommonController {
        constructor() {
            super();

            new component.VideoPlayerComponent($('.video-content'), false);
            new component.ChatComponent();

            this._bind();
        }
    }
}
