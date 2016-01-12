module Directives {

    interface ISampleScope extends ng.IScope {
        test: string;
        animatePageLoad: () => void;
        curtainChange: (event: JQueryEventObject) => void;
        currentPage
    }

    export class Hub implements ng.IDirective {
        public restrict: string = 'E';
        public replace: boolean = true;
        public scope = {
            options: '='
        };

        constructor(private $msg: Services.MessageService, private $q: ng.IQService, private $animate: ng.IAnimateService) {
        }

        public link = (scope: ISampleScope, element: any, attrs: any) => {


            this.$msg.onStartSubMenuChange(scope, (event: JQueryEventObject) => {
                scope.curtainChange(event);
            });

            this.$msg.onShowHub(scope, () => {
                scope.animatePageLoad();
            });

            this.$msg.onStartPageChange(scope, (event: JQueryEventObject) => {

                this.$q.all([
                    this.$animate.addClass($('#zano-container'), 'zoom-out')
                ]).then(() => {
                    this.$msg.endPageChange(event);
                });
            });

            scope.test = "hi";

            scope.animatePageLoad = () => {

                this.$animate.addClass($("#zano-container"), 'animate-in')
                    .then(() => {

                    return this.$q.all([
                        this.$animate.addClass($('#left-triangle'), 'in'),
                        this.$animate.addClass($('#right-triangle'), 'in')
                    ]);

                }).then(() => {
                    return this.$q.all([
                        this.$animate.addClass($('#left-curtain'), 'open'),
                        this.$animate.addClass($('#right-curtain'), 'open')
                    ]);
                });
            };

            scope.curtainChange = (event) => {

                this.$q.all([
                    this.$animate.addClass($('#left-curtain'), 'close'),
                    this.$animate.addClass($('#right-curtain'), 'close')
                ]).then(() => {
                    //Before the curtains close, want to start displaying content behind curtain
                    this.$msg.endSubMenuChange(event);

                    $('#left-curtain').removeClass('close');
                    $('#right-curtain').removeClass('close');

                    
                });
            };
        };

        public templateUrl = '/App/Directives/hub.html';
    }
}

app.registerDirective("hub", ['$msg', '$q', '$animate'], ($msg: Services.MessageService, $q: ng.IQService, $animate: ng.IAnimateService) => {
    return new Directives.Hub($msg, $q, $animate);
});
