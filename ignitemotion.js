var total = 0;
$('.next-step').on('click', function(){
    $('.w-slider-arrow-right').trigger('click', function(){
        console.log('this clicked');
    });
})
$('.step-1').on('click', function(){
    console.log('this step-1');
   $('.duration-price').text($(this).children('input[data-price]').attr('data-price'));
   total = parseInt($(this).children('input[data-price]').attr('data-price'));
   console.log(total);
})

// step 2 code
var step2ClickProcessed = false;
$(document).on('click', '.step-2', function(event) {
    
    if (!step2ClickProcessed) {
        console.log('this step-2');
        step2ClickProcessed = true;
        var x = 0;
        setTimeout(function() {
            x = $('.step-2 .radio-button.w--redirected-checked').length;
            if (x === 2) {
                // var val = parseInt($(this).parents('.duration').children().find('.duration-price').text());
                // val = val + 247;
                // console.log(val)+" -- ";
                var total1  = total+247;
                console.log(total1+" -- "+total);
                $('.duration-price').text(total1);
            } else if (x === 3) {
                // var val1 = parseInt($(this).parents('.duration').children().find('.duration-price').text());
                // val1 = val1 + 247;
                
                var total2  = total+(247*2);
                console.log(total2+" -- "+total);
                $('.duration-price').text(total2);
            } else {
                $('.duration-price').text(total);
            }
            step2ClickProcessed = false;
        }, 500);
    }
});

// step 3
$(document).on('click', '.step-3', function() {
    var isClicked = $(this).data('clicked');
    if (!isClicked) {
        console.log('this step-3');
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
        console.log('this step-thumbnail');

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
