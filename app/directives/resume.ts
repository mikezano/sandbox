module Directives {

    interface IResumeScope extends ng.IScope {
        resumeVisible: boolean;
    }

    export class Resume implements ng.IDirective {
        public restrict: string = 'E';
        public replace: boolean = true;

        constructor(private $msg: Services.MessageService) {
        }

        public link = (scope: IResumeScope, element: any, attrs: any) => {

            scope.resumeVisible = false;

            this.$msg.onShowResume(scope, () => {
                scope.resumeVisible = true;
            });

            this.$msg.onHideHubMenu(scope, (name: string) => {
                if (name == "RESUME")
                    scope.resumeVisible = false;
            });
        };       

        public templateUrl = '/app/directives/resume.html';
    }
}

app.registerDirective("resume", ['$msg', '$location'], ($msg: Services.MessageService) => {
    return new Directives.Resume($msg);
});
  