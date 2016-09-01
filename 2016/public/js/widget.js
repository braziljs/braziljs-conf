window.BrazilJS = {
    data: {},
    widget: {
        load: function (who, data) {
            var iframe;

            switch(who){
                case 'partners': {
                    data.container.innerHTML = "";
                    var host = location.host.indexOf('localhost') === 0? "http://localhost": "https://braziljs.org";
                    data.container.innerHTML = '<iframe src="'+host+'/widget?name='+data.name+'&event='+data.eventId+'&theme='+(data.theme||'white')+'&noheader='+(data.noheader? 1: 0)+'&receivingPage='+ encodeURIComponent(self.location.href) +'" style="width: 100%; border: none;" frameborder="no" scrolling="no" id="BrazilJS-Widtget-partners-IFrame"></iframe>';

                    window.addEventListener("message", function(event){
                        var origin = event.origin || event.originalEvent.origin;

                        //if (origin == "https://braziljs.org") {}
                        if(event.data.contentHeight){
                            window.BrazilJS.data.contentHeight = event.data.contentHeight;
                            resizer();
                        }
                    }, false);

                    var resizer = function(){
                        iframe = iframe || document.getElementById('BrazilJS-Widtget-partners-IFrame');
                        iframe.style.height = window.BrazilJS.data.contentHeight + 'px';
                    };
                }
            }
        }
    }
}
