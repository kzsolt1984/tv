///<reference path="../../../lib/ts/jquey.custom-scrollbar.d.ts" />

module component {
    export class ChatComponent {
        private _$chatContainer: JQuery;
        private _$chatContent: JQuery;
        private _$chatSendBtn: JQuery;
        private _$chatTextarea: JQuery;
        private _$chatSettingsBtn: JQuery;
        private _$chatSettingsPanel: JQuery;

        private _isScrolled: boolean = false;
        private _selectedColor: string = 'color-1';

        constructor() {
            this._$chatContainer = $('.chat-container');
            this._$chatContent = this._$chatContainer.find('ul');
            this._$chatSendBtn = $('.chat-interface .chat-send-btn');
            this._$chatTextarea = $('.chat-interface textarea');
            this._$chatSettingsBtn = $('.chat-buttons .setting-btn');
            this._$chatSettingsPanel = $('.chat-interface .chat-settings');

            this._$chatContainer.customScrollbar({
                preventDefaultScroll: true
            });

            this._scollToChatBottom();
            
            this._bind();
            console.log('ChatComponent init done');
        }

        public sendMessage(): void {
            if (!this._$chatTextarea.val().length) {
                return;
            }

            this._$chatContent.append(this._getMessageTemplate('Béna Béla', this._$chatTextarea.val()));
            this._$chatTextarea.val('');

            this._$chatContainer.customScrollbar('resize', true);

            if (!this._isScrolled) {
                this._scollToChatBottom();
            }
        }

        protected _bind(): void {
            this._$chatContainer.on('customScroll', (event: any, scrollData: any) => {
                if (scrollData.scrollPercent < 100) {
                    this._isScrolled = true;
                }
                else {
                    this._isScrolled = false;
                }
            });

            this._$chatSendBtn.on('click', () => {
                this.sendMessage();

                return false;
            });

            this._$chatSettingsBtn.on('click', () => {
                this._setSettingsPanelVisibility();

                return false;
            });

            this._$chatSettingsPanel.find('a').on('click', (e: JQueryEventObject) => {
                var selectedE = $(e.currentTarget);

                this._selectedColor = selectedE.data('color');

                this._$chatSettingsPanel.find('a').removeClass('selected');
                selectedE.addClass('selected');
                
                this._setSettingsPanelVisibility();

                return false;
            });
        }

        private _scollToChatBottom(): void {
            this._$chatContainer.customScrollbar('scrollToY', this._$chatContainer.height());
        }

        private _setSettingsPanelVisibility(): void {
            if ( this._$chatSettingsPanel.is(':hidden')) {
                this._$chatSettingsPanel.show();
            }
            else {
                this._$chatSettingsPanel.hide();
            }
        }

        private _getMessageTemplate(user: string, message: string): string {
            return '<li>' 
            + '<span class="info ' + this._selectedColor + '">' + _.escape(user) + ': &nbsp;</span>'
            + '<span class="text">' + _.escape(message) + '</span>'
            + '</li>';
        }
    }
}
