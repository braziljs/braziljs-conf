$(function () {

    'use strict';

    var PUBLIC = {},
        PRIVATE = {};

    PUBLIC.init = function () {

        PUBLIC.appendEvents();

    };

    PUBLIC.appendEvents = function () {

        var modalContainer = $('#modal'),
            keynotesContainer = $('.keynote-container:first'); //This is a tip.... read carefully :)

        keynotesContainer.hover(
            function () {

                modalContainer.addClass('on');

            },
            function () {

                modalContainer.removeClass('on');

            }
        );

    };

    return PUBLIC.init();

});