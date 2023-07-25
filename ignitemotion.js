
$('.next-step').on('click', function(){
    $('.w-slider-arrow-right').trigger('click');
})
$('.step-1').on('click', function(){
   $('.duration-price').text($(this).children('input[data-price]').attr('data-price'));
})

// step 2 code
var step2ClickProcessed = false;
$(document).on('click', '.step-2', function(event) {
    if (!step2ClickProcessed) {
        step2ClickProcessed = true;
        var x = 0;
        var the = $(this);
        setTimeout(function() {
            x = $('.step-2 .radio-button.w--redirected-checked').length;
            if (x === 2) {
                var val = parseInt(the.parents('.duration').children().find('.duration-price').text());
                val = val + 247;
                $('.duration-price').text(val);
            } else if (x === 3) {
                var val1 = parseInt(the.parents('.duration').children().find('.duration-price').text());
                val1 = val1 + 247;
                $('.duration-price').text(val1);
            }
            step2ClickProcessed = false;
        }, 500);
    }
});

// step 3
$(document).on('click', '.step-3', function() {
    var isClicked = $(this).data('clicked');
    if (!isClicked) {
        $(this).data('clicked', true);
        var stp3 = $(this).attr('data-step-3');
        var price3 = parseInt($(this).parents('.duration').children().find('.duration-price').text());
        price3 = price3 + parseInt(stp3);
        $('.duration-price').text(price3);
    }
});

// step 4
$('label[data-thumbnail]').on('click', function() {
    if (!$(this).data('clicked')) {
        $(this).data('clicked', true);

        var thumb = parseInt($(this).attr('data-thumbnail'));
        console.log('thumb: ' + thumb);
        var stp4 = parseInt($(this).parents('.duration').children().find('.duration-price').text());
        stp4 = stp4 + thumb;
        $('.duration-price').text(stp4);
        console.log('step: ' + stp4);
    }
});


// TEST
var stripe = Stripe('pk_test_51IVH1EAbTE2jKd8otfWEVhotk6EAxOZVARanEwDPzZEE9THGdRCLfQv21JV79oqnIuCyFpVawhvsmU0m8F5v5Ri700imuCCbWV');

$('.checkoutbutton').click(function(e){
    e.preventDefault();
    var priceId =  'price_1LW2VTAbTE2jKd8oPI5rRbMp'; //$(this).attr('data-priceId');
    var planId = 'BASIC';
    var planqty = 1;
    var domainname = window.location.hostname;
    console.log('Here');
    
    var settings = {
        "url": "https://stripeapi.pixeltechnosol.com/stripeapi/charge.php",
        //"url": 'https://stripe-api.test/api/charge.php',

        "type": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
                "Authorization": "key__8c0d8aa13bf726012e1314e8ad8b4175665b6777513accd79ccb7c63d19706a5111",
            'priceId' : priceId,
            'planId' : planId,
            'planqty' : planqty,
            'domain' : domainname,
        })
        
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.id) {
        
            stripe.redirectToCheckout({
            sessionId: response.id
            });
        } else {
            alert(response);
        }
    });
});
