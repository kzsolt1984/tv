///<reference path="../../../lib/ts/jquery-ui.d.ts" />
///<reference path="../../util/mobileUtil.ts" />

module component {
    export class VideoPlayerComponent {
        private _videoContainer: HTMLElement;
        private _$videoContainer: JQuery;
        private _$videoElement: JQuery;
        private _videoElement: HTMLVideoElement;
        private _playStopBtn: JQuery;
        private _volumeBtn: JQuery;
        private _fullScreenBtn: JQuery;
        private _audioSlider: JQuery;
        private _videoBigSreenBtn: JQuery;
        private _allowMinimizeVideo: boolean = false;
        private _prevVolume: number = 100;
        private _fullScreenEnabled: any;

        constructor($videoContainer: JQuery, allowMinimizeVideo?: boolean) {
            this._$videoContainer = $videoContainer;
            this._videoContainer = $videoContainer.get(0);
            this._$videoElement = $videoContainer.find('video');
            this._videoElement = <HTMLVideoElement>this._$videoElement.get(0);
            this._playStopBtn = $videoContainer.find('.control-playing');
            this._volumeBtn = $videoContainer.find('.control-volume');
            this._fullScreenBtn = $videoContainer.find('.control-full-screen');
            this._audioSlider = $videoContainer.find('.volume-slider');
            this._videoBigSreenBtn = $videoContainer.find('.control-big-screen');
            this._allowMinimizeVideo = allowMinimizeVideo;
            this._fullScreenEnabled = !!(document.fullscreenEnabled 
                                        || (<any>document).mozFullScreenEnabled
                                        || (<any>document).msFullscreenEnabled
                                        || (<any>document).webkitSupportsFullscreen
                                        || (<any>document).webkitFullscreenEnabled
                                        || document.createElement('video').webkitRequestFullScreen);

            // full screen disabled
            if (!this._fullScreenEnabled) {
                this._fullScreenBtn.hide();
            }
            
            var supportsVideo: boolean = (this._videoElement.canPlayType('video/mp4').length > 0)
                                            || (this._videoElement.canPlayType('video/webm').length > 0)
                                            || (this._videoElement.canPlayType('video/ogg').length > 0);

            if (!supportsVideo) {
                // TODO: show error text without video tag
                return;
            }

            this._bind();
        }

        /**
         * Play or stop video
         * @returns void
         */
        public setVideoRunningState(): void {
            if (this._videoElement.paused || this._videoElement.ended) {
                this._videoElement.play();
                this._changeVideoPlayIconState(true);
            }
            else {
                this._videoElement.pause();            
                this._changeVideoPlayIconState(false); 
            }            
        }

        /**
         * Fullscreen on/off handler
         */
        public setFullScreenState(): void {
            if (this._isFullscreen()) {
                if (document.exitFullscreen) {
                    (<any>document).exitFullscreen();
                }
                else if ((<any>document).mozCancelFullScreen) {
                    (<any>document).mozCancelFullScreen();
                }
                else if ((<any>document).webkitCancelFullScreen) {
                    (<any>document).webkitCancelFullScreen();
                }
                else if ((<any>document)['msExitFullscreen']) {
                    (<any>document).msExitFullscreen();
                }
            }
            else {
                if (this._videoContainer.requestFullscreen) { 
                    this._videoContainer.requestFullscreen();
                }
                else if ((<any>this._videoContainer).mozRequestFullScreen) {
                    (<any>this._videoContainer).mozRequestFullScreen();
                }
                else if (this._videoContainer.webkitRequestFullScreen) {
                    this._videoContainer.webkitRequestFullScreen();
                }
                else if ((<any>this._videoContainer).msRequestFullscreen) {
                    (<any>this._videoContainer).msRequestFullscreen();
                }
            }
        }

        /**
         * Events binding
         */
        protected _bind(): void {
            /** Video events */
            this._playStopBtn.on('click', (e: JQueryEventObject) => {
                this.setVideoRunningState();

                return false;
            });

            this._$videoElement.on('ended', () => {
                this._changeVideoPlayIconState(false);
            });

            /** Audio events */
            this._volumeBtn.on('click', (e: JQueryEventObject) => {
                var muted = this._audioSlider.slider('value') === 0;

                if (muted) {
                    this._audioSlider.slider('value', this._prevVolume || 100);
                    this._updateVolume(false);
                }
                else {
                    this._prevVolume = this._videoElement.volume * 100;
                    this._audioSlider.slider('value', 0);
                    this._updateVolume(true);
                    
                }
                
                return false;
            });

            this._audioSlider.slider({
                value  : this._videoElement.volume * 100,
                step   : 1,
                range  : 'min',
                min    : 0,
                max    : 100,
                change  : () => {
                    var volumeVar = this._audioSlider.slider('value');

                    this._videoElement.volume = (volumeVar / 100);

                    if (volumeVar) {
                        this._updateVolume(false);
                    }
                    else {
                        this._updateVolume(true);
                    }
                }
            });

            /** Fullscreen events */
            this._fullScreenBtn.on('click', (e: JQueryEventObject) => {
                if (!this._fullScreenEnabled) {
                    this._fullScreenBtn.hide();
                    return false;
                }
                
                this.setFullScreenState();

                return false;
            });

            document.addEventListener('fullscreenchange', () => {
                this._setFullScreenClass(!!((<any>document).fullScreen || document.fullscreenElement));
            });
            document.addEventListener('webkitfullscreenchange', () => {
                this._setFullScreenClass(!!document.webkitIsFullScreen);
            });
            document.addEventListener('mozfullscreenchange', () => {
                this._setFullScreenClass(!!(<any>document).mozFullScreen);
            });
            document.addEventListener('msfullscreenchange', () => {
                this._setFullScreenClass(!!(<any>document).msFullscreenElement);
            });

            /**
             * Minimize Events
             */
            if (this._allowMinimizeVideo) {
                $(window).on('scroll', (e: JQueryEventObject) => {
                    this._setVideoMinimizedStatus();                    
                });

                this._videoBigSreenBtn.on('click', () => {
                    $('html, body').animate({scrollTop: '0px'}, 300, () => {
                        this._setVideoMinimizedStatus();
                    });

                    return false;
                });
            }
        }

        /**
         * Show play or pause btn icon
         * 
         * @param pause {boolean}
         */
        private _changeVideoPlayIconState(pause: boolean): void {
            var $playIcon = this._playStopBtn.find('.video-play-icon'),
                $pauseIcon = this._playStopBtn.find('.video-pause-icon');

            if (pause) {
                $playIcon.hide();
                $pauseIcon.show();
            }
            else {
                $pauseIcon.hide();
                $playIcon.show();                    
            }
        }

        /**
         * Get fullscreen is supported or not
         */
        private _isFullscreen(): boolean {
            return !!((<any>document).fullScreen
                    || document.webkitIsFullScreen 
                    || (<any>document).mozFullScreen
                    || (<any>document).msFullscreenElement
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

        /**
         * Show mute or volume btn icon
         * 
         * @param mute {boolean}   muted or not
         */
        private _updateVolume(mute: boolean): void {
            var $volumeIcon = this._volumeBtn.find('.video-volume-up-icon'),
                $muteIcon = this._volumeBtn.find('.video-volume-down-icon');

            if (mute) {
                $volumeIcon.hide();
                $muteIcon.css('display', 'inline-block');
            }
            else {
                $muteIcon.hide();
                $volumeIcon.show();                
            }
        }

        /**
         * Add/removed minimized video class from scrollTop value
         */
        private _setVideoMinimizedStatus(): void {
            var top = $(document).scrollTop(),
                $videoContent = this._$videoContainer.parent(), 
                videoHeight = $videoContent.outerHeight();

            if (top > (videoHeight + 100)) {
                this._$videoContainer.addClass('scrolled');
                $videoContent.height(videoHeight);
            }
            else {
                this._$videoContainer.removeClass('scrolled');
                $videoContent.removeAttr('style');
            }
        }
    }
}
