/* global $  */
(function () {

	'use strict';

	var menu = {};

    //Configure wrappers
    menu.container = $('#js-navigation-container');
    menu.openButtonContainer = $('#js-extended-menu');
    menu.documentHooks = $('html, body');

    //Configure status
    menu.oppened = false;

    menu.methods = {

        init : function () {

            menu.openButtonContainer.on('click', function() {

                menu.methods.bindButtonBehaviours();

            });

            menu.container.on('click', 'a', function (evt) {

                evt.preventDefault();

                menu.selectedAnchorId = $(this).attr('href');

                menu.methods.goToSelectedAnchor(menu.selectedAnchorId);

            });

            //Closes the menu window with the keyboard 'escape' key
            $(document).keyup(function (evt) {

                if (evt.keyCode === 27 && menu.oppened) {

                    menu.methods.closeMenu();

                }

            });

        },

        bindButtonBehaviours : function () {

           if (menu.oppened) {

                menu.methods.closeMenu();

            } else {

                menu.methods.openMenu();

            }

        },

        closeMenu : function () {

            //Toggles the class for oppening and closing the menu
            menu.container.toggleClass('navigation-container--on').toggleClass('visuallyhidden');

            menu.oppened = false;

            $(document.body).off('click.openMenu');

        },

        openMenu : function () {

            //Toggles the class for oppening and closing the menu
            menu.container.toggleClass('navigation-container--on').toggleClass('visuallyhidden');

            menu.oppened = true;

            menu.methods.outsideClickCloseMenu();

        },

        outsideClickCloseMenu : function () {

            //We need the setTimeout for this to work
            setTimeout(function () {

                $(document.body).on('click.openMenu', function (evt) {

                    if (!$(evt.target).is(menu.container) && menu.oppened) {

                        menu.methods.closeMenu();

                    }

                });

            }, 0);

        },

        goToSelectedAnchor : function (anchorID) {

            menu.methods.closeMenu();

            menu.anchorContainer = $(anchorID);

            menu.documentHooks.animate({

                scrollTop: menu.anchorContainer.offset().top - 80

            }, 700);

            menu.anchorContainer.attr('tabindex', 0);
            menu.anchorContainer.focus();

        }

    };

    menu.methods.init();

}());