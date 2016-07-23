/**
 * Created by NetGod on 16/5/19.
 */
;(function ($) {
    $("a[data-dialog-id]").on('click', function (e) {
        e.preventDefault();
        var modalLocation = $(this).attr('data-dialog-id');
        $('#' + modalLocation).dialog($(this).data());
    });

    $.fn.dialog = function (options) {
        var defaults = {
            animation: 'fadeAndPop',
            animationspeed: 300,
            closeonbackgroundclick: true,
            dismissmodalclass: 'close-dialog-modal'
        };

        var options = $.extend({}, defaults, options);

        return this.each(function () {

            var modal = $(this),
                topMeasure = parseInt(modal.css('top')),
                topOffset = modal.height() + topMeasure,
                locked = false,
                modalBG = $('.dialog-modal-bg');

            //如果背景不存在就加入背景层
            if (modalBG.length == 0) {
                modalBG = $('<div class="dialog-modal-bg" />').insertAfter(modal);
            }

            modal.bind('dialog:open', function () {
                modalBG.unbind('click.modalEvent');
                $('.' + options.dismissmodalclass).unbind('click.modalEvent');
                if (!locked) {
                    lockModal();
                    if (options.animation == "fadeAndPop") {
                        modal.css({'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'display': 'block'});
                        modalBG.fadeIn(options.animationspeed / 2);
                        modal.delay(options.animationspeed / 2).animate({
                            'top': $(document).scrollTop() + topMeasure + 'px',
                            'opacity': 1
                        }, options.animationspeed, unlockModal());
                    }

                    if (options.animation == "fade") {
                        modal.css({'top': $(document).scrollTop() + topMeasure, 'opacity': 0, 'visibility': 'visible'});
                        modalBG.fadeIn(options.animationspeed / 2);
                        modal.delay(options.animationspeed / 2).animate({
                            'opacity': 1
                        }, options.animationspeed, unlockModal());
                    }

                    if (options.animation == "none") {
                        modal.css({'top': $(document).scrollTop() + topMeasure, 'visibility': 'visible'});
                        modalBG.css({'display': 'block'});
                        unlockModal();
                    }
                }

                modal.unbind('dialog:open');
            });

            modal.bind('dialog:close', function () {
                if (!locked) {
                    lockModal();
                    if (options.animation == "fadeAndPop") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            'top': $(document).scrollTop() - topOffset + 'px',
                            'opacity': 0
                        }, options.animationspeed / 2, function () {
                            modal.css({
                                'opacity': 1, 'display': 'none', 'top': topMeasure
                            });
                            unlockModal();
                        });
                    }
                    if (options.animation == "fade") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            'opacity': 0
                        }, options.animationspeed / 2, function () {
                            modal.css({
                                'opacity': 1, 'visibility': 'hidden', 'top': topMeasure
                            });
                            unlockModal();
                        });
                    }
                    if (options.animation == "none") {
                        modal.css({
                            'visibility': 'hidden', 'top': topMeasure
                        });
                        modalBG.css({
                            'display': 'none'
                        });

                    }
                }

                modal.unbind('dialog:close');
            });

            //立即打开
            modal.trigger('dialog:open');

            $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
                modal.trigger('dialog:close');
            });

            //如果设置了点击背景关闭
            if (options.closeonbackgroundclick) {
                modalBG.css({"cursor": "pointer"});
                modalBG.bind('click.modalEvent', function () {
                    modal.target('dialog.close');
                })
            }

            //按下ESC关闭对话框
            $('body').keyup(function (e) {
                if (e.which === 27) {
                    modal.target('dialog.close');
                }
            });

            function unlockModal() {
                locked = false;
            }

            function lockModal() {
                locked = true;
            }
        });
    }
})(jQuery);
