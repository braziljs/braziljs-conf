/*global $*/
(function () {

	'use strict';

	var speakers = {},
        bodyContainer = $('body');

    speakers.container = $('#js-speakers-container');
    speakers.overlayContainer = $('#js-overlay-container');
    speakers.closeButton = $('#js-overlay-button-close');

    //To see if the modal is already open
    speakers.isLayerActive = false;

    speakers.methods = {

        loadSequence : function () {

            var options = {
                autoPlay : false,
                nextButton : $('#js-overlay-button-next'),
                prevButton : $('#js-overlay-button-prev'),
                transitionThreshold : 200,
                preloader : true,
                reverseAnimationsWhenNavigatingBackwards : false,
                preventDelayWhenReversingAnimations : true
            };


            window.sequence = speakers.overlayContainer.sequence(options).data("sequence");

            speakers.methods.init();

        },

        init : function () {

            speakers.container.on('click', 'a', function (evt) {

                 evt.preventDefault();

                 speakers.speakerIndex = $(this).attr('data-layer');

                 speakers.methods.openLayer(speakers.speakerIndex);

            });

            speakers.closeButton.on('click', function () {

                if (speakers.isLayerActive) {

                    speakers.methods.closeLayer();

                }

            });

            $(document).keyup(function (evt) {

                if (evt.keyCode === 27 && speakers.isLayerActive) {

                    speakers.methods.closeLayer();

                }

            });

        },

        openLayer : function (speakerID) {

            speakers.isLayerActive = true;

            speakers.overlayContainer.toggleClass('visuallyhidden');

            window.sequence.goTo(speakerID, 1);

            speakers.methods.bindBodyBehaviours();

        },

        closeLayer : function () {

            speakers.isLayerActive = false;

            speakers.overlayContainer.toggleClass('visuallyhidden');

            //Removes the event attached to the body
            bodyContainer.off('click.modalEvents');

        },

        bindBodyBehaviours : function () {

            bodyContainer.on('click.modalEvents', function (evt) {

                if ($(evt.target).is(speakers.overlayContainer)) {

                    speakers.methods.closeLayer();

                }

            });

        }

    };

    //We need to load sequence before anything.
    speakers.methods.loadSequence();

}());