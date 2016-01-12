module Directives {

    interface IExperimentsScope extends ng.IScope {
        experimentsVisible: boolean;
    }

    export class Experiments implements ng.IDirective {
        public restrict: string = 'E';
        public replace: boolean = true;

        constructor(private $msg: Services.MessageService) {
        }

        public link = (scope: IExperimentsScope, element: any, attrs: any) => {

            scope.experimentsVisible = false;

            this.$msg.onShowExperiments(scope, () => {
                scope.experimentsVisible = true;
            });

            this.$msg.onHideHubMenu(scope, (name: string) => {
                if (name == "EXPERIMENTS")
                    scope.experimentsVisible = false;
            });
        };

        public templateUrl = '/App/Directives/experiments.html';
    }
}

app.registerDirective("experiments", ['$msg', '$location'], ($msg: Services.MessageService) => {
    return new Directives.Experiments($msg);
});
  