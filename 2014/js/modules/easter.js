/*global $*/
(function () {

	'use strict';

	var easter = {};


    //tracks.container = $('#js-tracks-container');

    //Speakers easter
    easter.speakers = {};

    easter.speakers.methods = {

        init : function () {

            var speakersContainer = $('#js-speakers-container'),
                toastyContainer = $('#js-ಠ_ಠ'),
                hoverTimes = 0,
                hoverTotalTimes = Math.floor((Math.random() * 10)),
                toasty = new Audio(),
                loaded = false;

            speakersContainer.find('.speaker-card__number').on('mouseenter', function () {

                if (!loaded) {
                    toasty.setAttribute('src','/toasty.mp3');
                    toasty.load();
                    toastyContainer.addClass('ಠ_ಠ--load');
                    loaded = true;
                }

                hoverTimes = hoverTimes + 1;

                if (hoverTimes === hoverTotalTimes) {

                    toastyContainer.addClass('ಠ_ಠ--on');
                    toasty.play();
                    hoverTimes = 0;
                    hoverTotalTimes = Math.floor((Math.random() * 10)) + 2;
                    setTimeout(function(){

                        toastyContainer.removeClass('ಠ_ಠ--on');

                    },2000);

                }

            });

        }

    };

    easter.speakers.methods.init();

}());