module Directives {

    interface IHubMenuScope extends ng.IScope {
        selectMenuItem: (e: any) => void;
        currentItem: string;
    }

    export class HubMenu implements ng.IDirective {
        public restrict: string = 'E';
        public replace: boolean = true;

        constructor(private $msg: Services.MessageService, private $location: ng.ILocationService) {
        }

        public link = (scope: IHubMenuScope, element: any, attrs: any) => {

            scope.currentItem = null;

            this.$msg.onEndPageChange(scope, (event: JQueryEventObject) => {

                var nextPage = $(event.target).text();
                console.log(nextPage);

                this.$location.path(nextPage);
            });

            this.$msg.onEndSubMenuChange(scope, (event: JQueryEventObject) => {

                this.$msg.hideHubMenu(scope.currentItem);

                scope.currentItem = $(event.target).text().trim().toUpperCase();

                switch (scope.currentItem) {
                    case "MAIN":
                        break;
                    case "RESUME":
                        this.$msg.showResume();
                        break;
                    case "EXPERIMENTS":
                        this.$msg.showExperiments();
                        break;
                }
            });

            scope.selectMenuItem = ($event) => { 
                this.$msg.startSubMenuChange($event);
            };
        };

        public templateUrl = '/App/Directives/hubMenu.html';
    }
}

app.registerDirective("hubMenu", ['$msg', '$location'], ($msg: Services.MessageService, $location: ng.ILocationService) => {
    return new Directives.HubMenu($msg, $location);
});
  