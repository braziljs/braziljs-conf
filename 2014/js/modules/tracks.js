/*global $*/
(function () {

	'use strict';

	var tracks = {};

    tracks.container = $('#js-tracks-container');

    tracks.methods = {

        init : function () {

            var tablesContainer = tracks.container.find('table');

            tablesContainer.each(function () {

                $(this).find('.track-expand').on('click', function () {

                    $(this).toggleClass('track-expand--on');

                });

            });

        }

    };

    tracks.methods.init();

}());