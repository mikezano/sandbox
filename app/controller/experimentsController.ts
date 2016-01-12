//http://davidwalsh.name/css-animation-callback
//http://brentvatne.ca/animation-obsession-and-ng-animate-1-3/
//https://www.youtube.com/watch?v=3hktBbxFxSM#t=69
module Web.Client {

    export class ExperimentsController {

        public static $inject = [];
        constructor() {}

    }
}
app.registerController('Web.Client.ExperimentsController', Web.Client.ExperimentsController);
app.registerRoute('/Experiments', 'Web.Client.ExperimentsController as vm', 'app/controller/experimentsController.html', 'sass/experiments.css');

  