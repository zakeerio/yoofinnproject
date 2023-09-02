$('.submit-btn').on('click', function() {
    // TEST
    // var stripe = Stripe('pk_test_51IVH1EAbTE2jKd8otfWEVhotk6EAxOZVARanEwDPzZEE9THGdRCLfQv21JV79oqnIuCyFpVawhvsmU0m8F5v5Ri700imuCCbWV');

    // Live
    
    var stripe = Stripe('pk_live_51JQeRWESXl5LVsJK7OlORJRvgVrarIk67d0X60lBPX9On0ZLEAKtagAxAC7F8x95p22RW43fcFV2SYUHykgV5lh500Kn1oTjbD');

    // $('.checkoutbutton').click(function(e){
    //     e.preventDefault();
    var priceId = matchedValue; //'price_1LW2VTAbTE2jKd8oPI5rRbMp'; //$(this).attr('data-priceId');
    var planId = 'BASIC';
    var planqty = 1;
    var domainname = window.location.hostname;
    console.log('Here');

    var settings = {
        "url": "https://api2.growtoro.com/api/charge.php",
        // "url": 'https://stripe-api.test/api/charge.php',

        "type": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "key__8c0d8aa13bf726012e1314e8ad8b4175665b6777513accd79ccb7c63d19706a5",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            'couponcode' : coupon
        })
        
    };


    $.ajax(settings).done(function (response) {
        if(response.id) {
            calculatepromo(response);
        } else {
            $('div#notice').html(response.error)
            $('div#notice').css({
                "color": "red",
                "text-align": "center"
            });
            $('.plan-price-right').html('$' + originalprice);
            $('#totalamount, #subtotal').html('$' + originalprice); 
            $('div#notice').show();
            // alert(response.error);
        }
    });

    var settings = {
        "url": "https://stripeapi.pixeltechnosol.com/growtorostripeapi/charge.php",
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