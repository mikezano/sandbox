/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />

module Web.Client {
    export class App {
        private app: ng.IModule;
        private services: ng.IModule;
        public appName: string = 'angularApp';

        constructor() {
            this.services = angular.module("angularServices", []);
            this.app = angular.module(this.appName, [
                'ngAnimate',        // animations
                'ngRoute',        // routing
            ])
                .config([
                '$compileProvider',
                ($compileProvider) => {
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sip):/);
                }
            ]);

            this.defaultRoute('/');
        }

        registerController(controllerName: string, controllerConstructor: Function) {
            this.app.controller(controllerName, controllerConstructor);
        }

        registerService(serviceName: string, serviceConstructor: Function) {
            this.app.service(serviceName, serviceConstructor);
        }

        private getControllerName(controllerConstructor: Function): string {

            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(controllerConstructor.toString());
            return (results && results.length > 1) ? results[1] : "";

        }

        registerRoute(path: string, controllerName: string, template: string, css:string) {
            this.app.config(($routeProvider: ng.route.IRouteProvider) => {
                $routeProvider.when(path, {
                    controller: controllerName,
                    templateUrl: template,
                    caseInsensitiveMatch: true,
                    resolve: {
                        load: ['injectCss', (injectCSS: Services.InjectCss) => { injectCSS.getCss(Math.floor((Math.random() * 10) + 1), css); }]
                    }
                });
            });
        }
        registerDirective(name: string, parameterNames: any[], directiveFactory: ng.IDirectiveFactory) {
            parameterNames.push(directiveFactory);
            this.app.directive(name, parameterNames);
        }

        registerConstant(name: string, value: any) {
            this.app.constant(name, value);
        }

        defaultRoute(path: string) {
            this.app.config(($routeProvider: ng.route.IRouteProvider) => {
                $routeProvider.otherwise({ redirectTo: path });
            });
        }

        run(document: Document) {
            angular.bootstrap(document, [this.appName]);
        }

    }
}

// used by rest of app to register controllers and services
var app: Web.Client.App = new Web.Client.App();

