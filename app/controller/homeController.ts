//http://davidwalsh.name/css-animation-callback
//http://brentvatne.ca/animation-obsession-and-ng-animate-1-3/
//https://www.youtube.com/watch?v=3hktBbxFxSM#t=69
/// <reference path="../../typings/angularjs/angular.d.ts" />

module Web.Client {

    export class HomeController {

        private message: string;
        public currentPage: string;
        private el: Element;
        public numbers: number[] = [];
        public selectedProject: string;

        public static $inject = ['$msg', '$q', '$animate', '$animateCss', '$timeout'];
        constructor(
            private $msg: Services.MessageService,
            private $q: ng.IQService,
            private $animate: any,
            private $animateCss: any,
            private $timeout:ng.ITimeoutService
            ) {

            this.message = "Message from Home";

            this.$timeout(() => {
                $msg.showHub();
            }, 1000);
            
        }

        public animatePageLoad(): void {

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
        }

        public zoomOut(): void {
            this.$msg.showHub();
            //this.$animate.removeClass($("#zano-container"), 'animate-in');
            //this.$animate.addClass($("#zano-container"), 'zoomOut')
        }

        //public changePage($event): void {


        //    var curtainsAnimate: ng.IPromise<void>[] = [];
        //    curtainsAnimate.push(this.$animate.addClass($('#bottom-left-curtain'), 'animate-in'));
        //    curtainsAnimate.push(this.$animate.addClass($('#top-right-curtain'), 'animate-in'));

        //    this.$q.all(curtainsAnimate).then(() => {
        //        console.log("here");
        //        //this.$scope.$apply(() => {
        //        var nextPage = $($event.target).text();

        //        switch (nextPage) {
        //            case 'LINK1':
        //                this.currentPage = "views/intro.html";
        //                break;
        //            case 'LINK2':
        //                this.currentPage = "views/music.html";
        //                break;
        //            case 'LINK3':
        //                this.currentPage = "views/resume.html";
        //                break;
        //            case 'PROJECTS':
        //                this.currentPage = "views/projects.html";
        //                break;
        //        }

        //        $('#bottom-left-curtain').removeClass('animate-in');
        //        $('#top-right-curtain').removeClass('animate-in');                                    
        //        //});
        //    });

        //}
    }
}
app.registerController('Web.Client.HomeController', Web.Client.HomeController);
app.registerRoute('/', 'Web.Client.HomeController as vm', 'App/Controller/homeController.html', 'sass/home.css');