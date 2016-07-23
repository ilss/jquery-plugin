/**
 * Created by NetGod on 16/1/12.
 */
;(function ($) {
    $('input[data-my-input-type]').on('click', function (e) {
        $(this).myInput($(this).attr('data-my-input-type'));
        $(document).one("click", function () {
            if ($('.my-input-div').length > 0)
                $('.my-input-div').remove();
        });
        e.stopPropagation();
    });

    $.fn.myInput = function (type) {
        return this.each(function () {
            var temp_html = null, $input = $(this);
//            alert(type);
            switch (type) {
                case 'number':
                    temp_html = '<div class="my-input-div"><ul><li><a href="#">0</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li> <li><a href="#">5</a></li> <li><a href="#">6</a></li> <li><a href="#">7</a></li> <li><a href="#">8</a></li> <li><a href="#">9</a></li> <li class="exit"><a href="#">删除</a></li></ul> </div>';
                    break;
                default :
                    temp_html = '<div class="my-input-div"><ul><li><a href="#">0</a></li><li><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li><li><a href="#">4</a></li> <li><a href="#">5</a></li> <li><a href="#">6</a></li> <li><a href="#">7</a></li> <li><a href="#">8</a></li> <li><a href="#">9</a></li> <li class="exit"><a href="#">删除</a></li></ul> </div>';
                    break
            }
            $(this).after(temp_html);
            var $div = $('.my-input-div');
            if ($div.length > 0) {
                $('.my-input-div li:not(.exit) a').on('click', function (e) {
                    e.preventDefault();
                    $input.val($input.val() == 0 ? $(this).text() : $input.val() + $(this).text());
                });

                $('.my-input-div li.exit a').on('click', function (e) {
                    e.preventDefault();
                    if ($input.val().length > 0) {
                        var temp_val = $input.val();
                        temp_val = temp_val.substring(0, temp_val.length - 1);
                        $input.val(temp_val);
                    }
//                        $input.val($input.val() == 0 ? $(this).text() : $input.val() + $(this).text());
                });

                $div.click(function (e) {
                    e.stopPropagation();
                })
            }
        });
    }
})(jQuery);
