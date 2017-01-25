///<reference path="./pageController.ts" />
///<reference path="../component/chat/chatComponent.ts" />

module controller {
    export class UserPageController extends PageController {
        constructor() {
            super();

            new component.ChatComponent();
        }
    }
}
