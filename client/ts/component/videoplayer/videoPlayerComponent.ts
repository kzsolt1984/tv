module component {
    export class VideoPlayerComponent {
        private _videoContainer: HTMLElement;
        private _$videoContainer: JQuery;
        private _videoElement: HTMLVideoElement;
        private _playStopBtn: JQuery;
        private _volumeBtn: JQuery;
        private _fullScreenBtn: JQuery;
        private _audioSlider: JQuery;
        private _volumeDrag: boolean = false;

        constructor($videoContainer: JQuery) {
            this._$videoContainer = $videoContainer;
            this._videoContainer = $videoContainer.get(0);
            this._videoElement = <HTMLVideoElement>$videoContainer.find('video').get(0);
            this._playStopBtn = $videoContainer.find('.control-playing');
            this._volumeBtn = $videoContainer.find('.control-volume');
            this._fullScreenBtn = $videoContainer.find('.control-full-screen');
            this._audioSlider = $videoContainer.find('.volume-slider');

            var supportsVideo: boolean = (this._videoElement.canPlayType('video/mp4').length > 0);

            if (!supportsVideo) {
                return;
            }

            // set default value
            this.updateVolume(0, this._videoElement.volume);

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
         * Fullscreen on/off handler
         */
        public setFullScreenState(): void {
            if (this._isFullscreen()) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document['mozCancelFullScreen']) {
                    document['mozCancelFullScreen']();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if (document['msExitFullscreen']) {
                    document['msExitFullscreen']();
                }
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
            /** Video events */
            this._playStopBtn.on('click', (e: JQueryEventObject) => {
                this.setVideoRunningState();

                return false;
            });

            /** Audio events */
            this._volumeBtn.on('click', (e: JQueryEventObject) => {
                this._videoElement.muted = !this._videoElement.muted;

                return false;
            });

            this._audioSlider.on('mousedown', (e: JQueryEventObject) => {
                this._volumeDrag = true;
                this._videoElement.muted = false;
                console.log('down', e.offsetX);
                this.updateVolume(e.offsetX);
            });
            $(document).on('mouseup', (e: JQueryEventObject) => {
                if (this._volumeDrag) {
                    this._volumeDrag = false;
                    this.updateVolume(e.offsetX);
                    console.log('up', e.offsetX);
                }
            });

            /*$(document).on('mouseleave', (e: JQueryEventObject) => {
                this._volumeDrag = false;
            });*/


            this._audioSlider.on('mousemove', (e: JQueryEventObject) => {
                if (this._volumeDrag) {
                    this.updateVolume(e.offsetX);
                    console.log('move', e.offsetX);
                }
            });

            /** Fullscreen events */
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

            document.addEventListener('fullscreenchange', () => {
                this._setFullScreenClass(!!(document['fullScreen'] || document.fullscreenElement));
            });
            document.addEventListener('webkitfullscreenchange', () => {
                this._setFullScreenClass(!!document.webkitIsFullScreen);
            });
            document.addEventListener('mozfullscreenchange', () => {
                this._setFullScreenClass(!!document['mozFullScreen']);
            });
            document.addEventListener('msfullscreenchange', () => {
                this._setFullScreenClass(!!document['msFullscreenElement']);
            });
        }

        /**
         * Get fullscreen is supported or not
         */
        private _isFullscreen(): boolean {
            return !!(document['fullScreen ']
                    || document.webkitIsFullScreen 
                    || document['mozFullScreen']
                    || document['msFullscreenElement']
                    || document.fullscreenElement);
        }
        
        /**
         * Add or remove fullscreen class
         */
        private _setFullScreenClass(isFullscreen: boolean) {
            if (isFullscreen) {
                this._$videoContainer.addClass('full-screen');
            }
            else {
                this._$videoContainer.removeClass('full-screen');
            }
        }

        private updateVolume(offsetX: number, volume?: number): void {
            var percentage = 0,
                $volumeIcon = this._volumeBtn.find('.video-volume-up-icon'),
                $muteIcon = this._volumeBtn.find('.video-volume-down-icon');

            if (offsetX > 100) {
                offsetX = 100;
            }

            if (offsetX < 0) {
                offsetX = 0;
            }

            // if only volume have specificed then direct update volume
            if (volume) {
                percentage = volume * 100;
            } 
            else {
                percentage = 100 * offsetX / this._audioSlider.width();
            }

            if (percentage > 100) {
                percentage = 100;
            }

            if (percentage < 0) {
                percentage = 0;
            }

            // update volume bar and video volume
            this._audioSlider.find('.volume-slider-range').css('width', percentage + '%');
            this._audioSlider.find('.volume-slider-handle').css('left', percentage + '%');
            this._videoElement.volume = percentage / 100;

            if (this._videoElement.volume === 0) {
                $volumeIcon.hide();
                $muteIcon.css('display', 'inline-block');
            }
            else {
                $muteIcon.hide();
                $volumeIcon.show();                
            }
        }
    }
}
