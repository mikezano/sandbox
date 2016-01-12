module Services {

    export class InjectCss {

        public static $inject = ['$q', '$http'];
        constructor(private $q:ng.IQService) { }



        public createLink(id, url) {
            var link = document.createElement('link');
            link.id = id;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            return link;
        }

        public checkLoaded(url, deferred, tries) {
            for (var i in document.styleSheets) {
                var href = document.styleSheets[i].href || "";
                if (href.split("/").slice(-1).join() === url) {
                    deferred.resolve();
                    return;
                }
            }
            tries++;
            setTimeout(()=>{ this.checkLoaded(url, deferred, tries); }, 50);
        }

        public getCss(id, url) {
            var tries = 0,
                deferred = this.$q.defer(),
                link;
            angular.element('link[id]').remove();
            if (!angular.element('link#' + id).length) {
                link = this.createLink(id, url);
                link.onload = deferred.resolve;
                angular.element('head').append(link);
            }
            this.checkLoaded(url, deferred, tries);

            return deferred.promise;           
        }
    }
}

app.registerService('injectCss', Services.InjectCss);  