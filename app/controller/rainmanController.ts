//http://davidwalsh.name/css-animation-callback
//http://brentvatne.ca/animation-obsession-and-ng-animate-1-3/
//https://www.youtube.com/watch?v=3hktBbxFxSM#t=69
module Web.Client {

    export class RainManController {

        public static $inject = [];
        constructor() { }

    }
}
app.registerController('Web.Client.RainManController', Web.Client.RainManController);
app.registerRoute('/Rainman', 'Web.Client.RainManController as vm', 'App/Controller/rainmanController.html', 'CSS/rainman.css');

  