module component {
    export class VideoPlayerComponent {
        private _videoContainer: HTMLElement;
        private _videoElement: HTMLVideoElement;
        private _playStopBtn: JQuery;
        private _volumeBtn: JQuery;
        private _fullScreenBtn: JQuery;

        constructor($videoContainer: JQuery) {
            this._videoContainer = $videoContainer.get(0);
            this._videoElement = <HTMLVideoElement>$videoContainer.find('video').get(0);
            this._playStopBtn = $videoContainer.find('.control-playing');
            this._volumeBtn = $videoContainer.find('.control-volume');
            this._fullScreenBtn = $videoContainer.find('.control-full-screen');

            var supportsVideo: boolean = (this._videoElement.canPlayType('video/mp4').length > 0);

            if (!supportsVideo) {
                return;
            }

            this._bind();
        }

        /**
         * Play or stop video
         * @returns void
         */
        public setVideoRunningState(): void {
            var $playIcon = this._playStopBtn.find('.video-play-icon'),
                $pauseIcon = this._playStopBtn.find('.video-pause-icon');

            if (this._videoElement.paused || this._videoElement.ended) {
                this._videoElement.play();

                $playIcon.hide();
                $pauseIcon.show();
            }
            else {
                this._videoElement.pause();

                $pauseIcon.hide();
                $playIcon.show();                    
            }
        }

        /**
         * Mute volume or volume up
         */
        public setVolumeState(): void {
            var muted: boolean = this._videoElement.muted,
                $volumeUp = this._volumeBtn.find('.video-volume-up-icon'),
                $mute = this._volumeBtn.find('.video-volume-down-icon');

            this._videoElement.muted = !this._videoElement.muted;

            if (muted) {
                $mute.hide();
                $volumeUp.show();
            }
            else {
                $volumeUp.hide();
                $mute.show();                
            }
        }

        public setFullScreenState(): void {
            if (this._isFullscreen()) {
                //
            }
            else {
                if (this._videoContainer.requestFullscreen) { 
                    this._videoContainer.requestFullscreen();
                }
                else if (this._videoContainer['mozRequestFullScreen']) {
                    this._videoContainer['mozRequestFullScreen']();
                }
                else if (this._videoContainer.webkitRequestFullScreen) {
                    this._videoContainer.webkitRequestFullScreen();
                }
                else if (this._videoContainer['msRequestFullscreen']) {
                    this._videoContainer['msRequestFullscreen']();
                }
                // setFullscreenData(true);
            }
        }

        /**
         * Events binding
         */
        protected _bind() {
            this._playStopBtn.on('click', (e: JQueryEventObject) => {
                this.setVideoRunningState();

                return false;
            });

            this._volumeBtn.on('click', (e: JQueryEventObject) => {
                this.setVolumeState();

                return false;
            });

            this._fullScreenBtn.on('click', (e: JQueryEventObject) => {
                var fullScreenEnabled = !!(document.fullscreenEnabled 
                                        || document['mozFullScreenEnabled']
                                        || document['msFullscreenEnabled'] 
                                        || document['webkitSupportsFullscreen'] 
                                        || document['webkitFullscreenEnabled'] 
                                        || document.createElement('video').webkitRequestFullScreen);

                if (!fullScreenEnabled) {
                    this._fullScreenBtn.hide();
                    return false;
                }
                
                this.setFullScreenState();

                return false;
            });
        }

        private _isFullscreen(): boolean {
            return !!(document['fullScreen ']
                    || document.webkitIsFullScreen 
                    || document['mozFullScreen']
                    || document['msFullscreenElement']
                    || document.fullscreenElement);
        }
    }
}
