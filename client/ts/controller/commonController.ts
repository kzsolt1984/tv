///<reference path="../component/videoplayer/videoPlayerComponent.ts" />

module controller {
    export class CommonController {
        constructor() {
            console.log('CommonController init done');

            // temporarily place
            new component.VideoPlayerComponent($('.video-content'));
        }
    }
}
