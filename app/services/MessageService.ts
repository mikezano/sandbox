module Services {
    export class MessageService {
        public static $inject = ['$rootScope'];

        constructor(private $rootScope: ng.IScope) { }

        showHub() {
            this.$rootScope.$broadcast("show-hub");
        }

        onShowHub(scope: ng.IScope, callback: () => void) {
            this.registerCallback(scope, "show-hub", (args: any[])=> callback());
        }

        hideHub() {
            this.$rootScope.$broadcast("hide-hub");
        }

        onHideHub(scope: ng.IScope, callback: () => void) {
            this.registerCallback(scope, "hide-hub", (args: any[]) => callback());
        }

        hideHubMenu(name:string) {
            this.$rootScope.$broadcast("hide-hub-menu", name);
        }

        onHideHubMenu(scope: ng.IScope, callback: (name:string) => void) {
            this.registerCallback(scope, "hide-hub-menu", (args: any[]) => callback(args[0]));
        }

        showResume(): void {
            this.$rootScope.$broadcast("show-resume");
        }

        onShowResume(scope: ng.IScope, callback: () => void) {
            this.registerCallback(scope, "show-resume", (args: any[]) => callback());
        }

        showExperiments(): void {
            this.$rootScope.$broadcast("show-experiments");
        }

        onShowExperiments(scope: ng.IScope, callback: () => void) {
            this.registerCallback(scope, "show-experiments", (args: any[]) => callback());
        }

        pageChangeHub(event: JQueryEventObject) {
            this.$rootScope.$broadcast("page-change-hub", event);
        }

        onPageChangeHub(scope: ng.IScope, callback: (event: JQueryEventObject) => void) {
            this.registerCallback(scope, "page-change-hub", (args: any[]) => callback(args[0]));
        }

        startPageChange(event: JQueryEventObject) {
            this.$rootScope.$broadcast("start-page-change", event);
        }

        onStartPageChange(scope: ng.IScope, callback: (event: JQueryEventObject) => void) {
            this.registerCallback(scope, "start-page-change", (args: any[]) => callback(args[0]));
        }

        endPageChange(event: JQueryEventObject) {
            this.$rootScope.$broadcast("end-page-change", event);
        }

        onEndPageChange(scope: ng.IScope, callback: (event: JQueryEventObject) => void) {
            this.registerCallback(scope, "end-page-change", (args: any[]) => callback(args[0]));
        }

        startSubMenuChange(event: JQueryEventObject) {
            this.$rootScope.$broadcast("start-sub-menu-change", event);
        }

        onStartSubMenuChange(scope: ng.IScope, callback: (event: JQueryEventObject) => void) {
            this.registerCallback(scope, "start-sub-menu-change", (args: any[]) => callback(args[0]));
        }

        endSubMenuChange(event: JQueryEventObject) {
            this.$rootScope.$broadcast("end-sub-menu-change", event);
        }

        onEndSubMenuChange(scope: ng.IScope, callback: (event: JQueryEventObject) => void) {
            this.registerCallback(scope, "end-sub-menu-change", (args: any[]) => callback(args[0]));
        }

        private registerCallback(scope: ng.IScope, name: string, callback: (args: any[]) => void) {
            var cleanUp = this.$rootScope.$on(name, (evt, ...args) => {
                callback(args);
            });

            scope.$on('$destroy', () => {
                cleanUp();
            });
        }
    }
}

app.registerService('$msg', Services.MessageService);