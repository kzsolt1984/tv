///<reference path="./pageController.ts" />
///<reference path="../component/chat/chatComponent.ts" />
///<reference path="../component/videoplayer/videoPlayerComponent.ts" />

module controller {
    export class UserPageController extends PageController {
        constructor() {
            super();

            new component.VideoPlayerComponent($('.video-content'), true);
            new component.ChatComponent();
        }
    }
}
