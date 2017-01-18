module conf {
    export class Config {
        private static _config: any = {};

        public static init(): void {
            Config._config['global'] = {};
            Config._config['local'] = {};

            var $gConfig = $('#global-js-variables'),
                gConfigText = $gConfig.text(),
                $lConfig = $('#local-js-variables'),
                lConfigText = $lConfig.text()
                                .replace(/"{/g, '\{').replace(/}"/g, '\}')
                                .replace(/"\[\{/g, '\[\{').replace(/}]"/g, '\}]');

            if (gConfigText.length) {
                Config._config['global'] = JSON.parse(gConfigText);
            }

            if (lConfigText.length) {
                Config._config['local'] = JSON.parse(lConfigText);
            }
        }

        public static get(key: string, isGlobalVar = true): any {
            if (Config._config) {
                if (isGlobalVar && Config._config['global'][key]) {
                    return Config._config['global'][key];
                }
                else if (!isGlobalVar && Config._config['local'][key]) {
                    return Config._config['local'][key];
                }
            }

            return null;
        }
    }
}
