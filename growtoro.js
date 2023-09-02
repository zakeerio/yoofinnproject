$('.submit-checkout').on('click', function() {
    // TEST
    // var stripe = Stripe('pk_test_51IVH1EAbTE2jKd8otfWEVhotk6EAxOZVARanEwDPzZEE9THGdRCLfQv21JV79oqnIuCyFpVawhvsmU0m8F5v5Ri700imuCCbWV');

    // Live
    
    var stripe = Stripe('pk_live_51JQeRWESXl5LVsJK7OlORJRvgVrarIk67d0X60lBPX9On0ZLEAKtagAxAC7F8x95p22RW43fcFV2SYUHykgV5lh500Kn1oTjbD');

    // $('.checkoutbutton').click(function(e){
    //     e.preventDefault();
    var priceId = 'price_1LW2VTAbTE2jKd8oPI5rRbMp'; //$(this).attr('data-priceId');
    var planId = 'BASIC';
    var planqty = 1;
    var domainname = window.location.hostname;
    
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
            'success_url' : "https://docs.google.com/forms/d/e/1FAIpQLSdZGFPYV419ykjaYmnvo3LUzW7fjQ_n_xxHthQKTXJWlBJ2eQ/viewform",
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