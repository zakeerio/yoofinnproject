$(document).ready(function() {
    $(".next-step").click(function() {
        var currentSlide = $(this).parents(".w-slide");
        var requiredInputs = currentSlide.find("input");
        var allInputsChecked = true;

        requiredInputs.each(function() {
            if (!$(this).prop("checked")) {
                console.log('A checkbox is not checked.');
                allInputsChecked = false;
                return false; // Exit the each loop early
            }
        });

        if (allInputsChecked) {
            $('.w-slider-arrow-right').trigger('click');
            $(this).prop("disabled", false);
        } else {
            $(this).prop("disabled", true);
        }
    });
});


var total = 0;
var duration_subtoal=0;
var total1 = 0;
var total2 = 0;
var formats_total = 0;
var price3 = 0;

// $('.next-step').on('click', function(){
//     $('.w-slider-arrow-right').trigger('click', function(){
//         console.log('this clicked');
//     });
// })
$('.step-1').on('click', function(){
    console.log('this step-1');
   $('.duration-price').text($(this).children('input[data-price]').attr('data-price'));
   duration_subtoal = parseInt($(this).children('input[data-price]').attr('data-price'));
   total = duration_subtoal;
   console.log(total);
})

// step 2 code
var step2ClickProcessed = false;
$(document).on('click', '.step-2', function(event) {
    
    if (!step2ClickProcessed) {
        step2ClickProcessed = true;
        var x = 0;
        setTimeout(function() {
            var step3 = false;
            x = $('.step-2 .radio-button.w--redirected-checked').length;
            if (x === 2) {
                step3 = false;
                // var val = parseInt($(this).parents('.duration').children().find('.duration-price').text());
                // val = val + 247;
                // console.log(val)+" -- ";
                var total1  = duration_subtoal+247;
                total = total1;
                console.log(total1+" -- Two "+total);
                formats_total = total1;
                $('.duration-price').text(total1);
            } else if (x === 3 && step3 == false) {
                // var val1 = parseInt($(this).parents('.duration').children().find('.duration-price').text());
                // val1 = val1 + 247;
                step3 = true;
                var total2  = total+(247*2);
                total = total2;
                formats_total = total2;

                console.log(total2+" -- Three "+total);
                $('.duration-price').text(total2);
            } else {
                total = duration_subtoal;
                formats_total = duration_subtoal;

                console.log(total+" single");

                $('.duration-price').text(total);
            }
            step2ClickProcessed = false;
        }, 500);
    }
});

// step 3
$(document).on('click', '.step-3', function() {
    // var isClicked = $(this).data('clicked');
    // if (!isClicked) {
        console.log('this step-3');
        $(this).data('clicked', true);
        var stp3 = $(this).attr('data-step-3');
        console.log(stp3);
        // var price3 = parseInt($(this).parents('.duration').children().find('.duration-price').text());
        price3 = formats_total + parseInt(stp3);
        total = price3;
        $('.duration-price').text(price3);
    // }
});

// step 4
$(document).on('click', 'label[data-thumbnail]', function() {
    // if (!$(this).data('clicked')) {
        // $(this).data('clicked', true);
        console.log('this step-thumbnail');

        var thumb = parseInt($(this).attr('data-thumbnail'));
        console.log('thumb: ' + thumb);
        // var stp4 = parseInt($(this).parents('.duration').children().find('.duration-price').text());
        
        var stp4 = price3 + thumb;
        total = stp4;
        $('.duration-price').text(stp4);
        console.log('Total: ' + total);
    // }
});


$('.submit-btn').on('click', function() {
    var concatenatedValue = '';

    $('.slider-2 input[data-value]').each(function() {
        if ($(this).prop('checked')) {
            var dataValue = $(this).data('value');
            if (concatenatedValue !== '') {
                concatenatedValue += '_';
            }
            concatenatedValue += dataValue;
        }
    });

    console.log('Concatenated Value:', concatenatedValue);

    // Assuming 'comb' is your JSON object
    var comb = {
        'solo-video-60-sec_square-formatting_voice-over_3-thumbnail':'price_1NaCbuENjwnIyXhTS6pw4X6C',
        'solo-video-60-sec_square-formatting_voice-over_2-thumbnail':'price_1NaCbUENjwnIyXhTttBDIf2Z',
        'solo-video-60-sec_square-formatting_voice-over_1-thumbnail':'price_1NaCb7ENjwnIyXhTMuDtOoQr',
        'solo-video-40-sec_square-formatting_voice-over_3-thumbnail':'price_1NaCaZENjwnIyXhTfiKzZtQV',
        'solo-video-40-sec_square-formatting_voice-over_2-thumbnail':'price_1NaCaDENjwnIyXhTShnfpFZh',
        'solo-video-40-sec_square-formatting_voice-over_1-thumbnail':'price_1NaCZrENjwnIyXhTeujlIv5z',
        'solo-video-20-sec_square-formatting_voice-over_3-thumbnail':'price_1NaCZYENjwnIyXhTxuC4l19Y',
        'solo-video-20-sec_square-formatting_voice-over_2-thumbnail':'price_1NaCZBENjwnIyXhToxldfNnS',
        'solo-video-20-sec_square-formatting_voice-over_1-thumbnail':'price_1NaCYnENjwnIyXhTmi8NrvWZ',
        'solo-video-60-sec_landscape-formatting_voice-over_3-thumbnail':'price_1NaCYWENjwnIyXhTqDHEd7hZ',
        'solo-video-60-sec_landscape-formatting_voice-over_2-thumbnail':'price_1NaCYAENjwnIyXhTaBHfRRBd',
        'solo-video-60-sec_landscape-formatting_voice-over_1-thumbnail':'price_1NaCXmENjwnIyXhTTPDw5loX',
        'solo-video-40-sec_landscape-formatting_voice-over_3-thumbnail':'price_1NaCXSENjwnIyXhTIShqJkXs',
        'solo-video-40-sec_landscape-formatting_voice-over_2-thumbnail':'price_1NaCWyENjwnIyXhToltQv9pd',
        'solo-video-40-sec_landscape-formatting_voice-over_1-thumbnail':'price_1NaCWRENjwnIyXhTRKtux1Xc',
        'solo-video-20-sec_landscape-formatting_voice-over_3-thumbnail':'price_1NaCW2ENjwnIyXhTRRk6WHzc',
        'solo-video-20-sec_landscape-formatting_voice-over_2-thumbnail':'price_1NaCFeENjwnIyXhTQMfgosy6',
        'solo-video-20-sec_landscape-formatting_voice-over_1-thumbnail':'price_1NaCEzENjwnIyXhT7cdHtbDA',
        'solo-video-60-sec_vertical-formatting_voice-over_3-thumbnail':'price_1NaCUXENjwnIyXhTP72IqGm0',
        'solo-video-60-sec_vertical-formatting_voice-over_2-thumbnail':'price_1NaCTbENjwnIyXhThzpUhG4D',
        'solo-video-60-sec_vertical-formatting_voice-over_1-thumbnail':'price_1NaCSqENjwnIyXhTPzdH8YkU',
        'solo-video-40-sec_vertical-formatting_voice-over_3-thumbnail':'price_1NaCSGENjwnIyXhTPDwfzk9e',
        'solo-video-40-sec_vertical-formatting_voice-over_2-thumbnail':'price_1NaCRtENjwnIyXhTA38cf8VR',
        'solo-video-40-sec_vertical-formatting_voice-over_1-thumbnail':'price_1NaCRKENjwnIyXhTxnZigmBo',
        'solo-video-20-sec_vertical-formatting_voice-over_3-thumbnail':'price_1NaCQpENjwnIyXhTvyv6itG5',
        'solo-video-20-sec_vertical-formatting_voice-over_2-thumbnail':'price_1NaCQHENjwnIyXhT7oLqPXLa',
        'solo-video-20-sec_vertical-formatting_voice-over_1-thumbnail':'price_1NaCOrENjwnIyXhTbq3xcC5B',
        'solo-video-60-sec_square-formatting_3-thumbnail':'price_1NaCOTENjwnIyXhTCnT3W7IS',
        'solo-video-60-sec_square-formatting_2-thumbnail':'price_1NaCM2ENjwnIyXhTTYRXsrmN',
        'solo-video-60-sec_square-formatting_1-thumbnail':'price_1NaCLaENjwnIyXhTpPz4objr',
        'solo-video-40-sec_square-formatting_3-thumbnail':'price_1NaCL2ENjwnIyXhTdgmIkrAL',
        'solo-video-40-sec_square-formatting_2-thumbnail':'price_1NaCKUENjwnIyXhTPeAMPoEO',
        'solo-video-40-sec_square-formatting_1-thumbnail':'price_1NaCJvENjwnIyXhTb5h4bJOX',
        'solo-video-20-sec_square-formatting_3-thumbnail':'price_1NaCJZENjwnIyXhTP8yaN3yu',
        'solo-video-20-sec_square-formatting_2-thumbnail':'price_1NaCJCENjwnIyXhTsne3FGtN',
        'solo-video-20-sec_square-formatting_1-thumbnail':'price_1NaCIrENjwnIyXhTbBfJk3kx',
        'solo-video-60-sec_landscape-formatting_3-thumbnail':'price_1NaCIPENjwnIyXhTEWdoi1K2',
        'solo-video-60-sec_landscape-formatting_2-thumbnail':'price_1NaCHzENjwnIyXhT52kJlCat',
        'solo-video-60-sec_landscape-formatting_1-thumbnail':'price_1NaCHVENjwnIyXhTwAEq6HrL',
        'solo-video-40-sec_landscape-formatting_3-thumbnail':'price_1NaCH6ENjwnIyXhTAArW6dd8',
        'solo-video-40-sec_landscape-formatting_2-thumbnail':'price_1NaCGkENjwnIyXhTaQ8W5dZl',
        'solo-video-40-sec_landscape-formatting_1-thumbnail':'price_1NaCGQENjwnIyXhT31s4GbbM',
        'solo-video-20-sec_landscape-formatting_3-thumbnail':'price_1NaCG2ENjwnIyXhTc29ZSjpu',
        'solo-video-20-sec_landscape-formatting_2-thumbnail':'price_1NaCFeENjwnIyXhTQMfgosy6',
        'solo-video-20-sec_landscape-formatting_1-thumbnail':'price_1NaCEzENjwnIyXhT7cdHtbDA',
        'solo-video-60-sec_vertical-formatting_3-thumbnail':'price_1NaCETENjwnIyXhTpLVnc1NB',
        'solo-video-60-sec_vertical-formatting_2-thumbnail':'price_1NaCE0ENjwnIyXhTBtQ1QAF3',
        'solo-video-60-sec_vertical-formatting_1-thumbnail':'price_1NaCDfENjwnIyXhTp2MOhXxw',
        'solo-video-40-sec_vertical-formatting_3-thumbnail':'price_1NaCDEENjwnIyXhTtqimfkCF',
        'solo-video-40-sec_vertical-formatting_2-thumbnail':'price_1NaCCnENjwnIyXhTUupHwmWx',
        'solo-video-40-sec_vertical-formatting_1-thumbnail':'price_1NaCCMENjwnIyXhTnase5HBg',
        'solo-video-20-sec_vertical-formatting_3-thumbnail':'price_1NaCBnENjwnIyXhTBMCgYSDU',
        'solo-video-20-sec_vertical-formatting_2-thumbnail':'price_1NaCBKENjwnIyXhTvmN1lAPC',
        'solo-video-20-sec_vertical-formatting_1-thumbnail':'price_1NaCAuENjwnIyXhTwvBY6dJ9',
        'solo-video-60-sec_voice-over_3-thumbnail':'price_1NaCANENjwnIyXhTkA1sm2uY',
        'solo-video-60-sec_voice-over_2-thumbnail':'price_1NaCA1ENjwnIyXhTcKmpKyR0',
        'solo-video-60-sec_voice-over_1-thumbnail':'price_1NaC9XENjwnIyXhTIihCu8qI',
        'solo-video-40-sec_voice-over_3-thumbnail':'price_1NaC94ENjwnIyXhTnoBjCW9Q',
        'solo-video-40-sec_voice-over_2-thumbnail':'price_1NaC8aENjwnIyXhTfRWLfoKN',
        'solo-video-40-sec_voice-over_1-thumbnail':'price_1NaC7xENjwnIyXhTMXfxRIKz',
        'solo-video-20-sec_voice-over_3-thumbnail':'price_1NaC7VENjwnIyXhTwKENm2wh',
        'solo-video-20-sec_voice-over_2-thumbnail':'price_1NaC6jENjwnIyXhTsczd6Rac',
        'solo-video-20-sec_voice-over_1-thumbnail':'price_1NaC6FENjwnIyXhTUp0fTJFU',
        'solo-video-60-sec_3-thumbnail':'price_1NaC5qENjwnIyXhTHUNPQA2I',
        'solo-video-60-sec_2-thumbnail':'price_1NaC5RENjwnIyXhTqnzRHhek',
        'solo-video-60-sec_1-thumbnail':'price_1NaC4kENjwnIyXhTxVsQr2vG',
        'solo-video-40-sec_3-thumbnail':'price_1NaC4GENjwnIyXhTZ8ZnJ13w',
        'solo-video-40-sec_2-thumbnail':'price_1NaC3sENjwnIyXhTWuTvdZ51',
        'solo-video-40-sec_1-thumbnail':'price_1NaC3VENjwnIyXhT9dX8piDd',
        'solo-video-20-sec_3-thumbnail':'price_1NaC2uENjwnIyXhTtcLc4s8B',
        'solo-video-20-sec_2-thumbnail':'price_1NaC1zENjwnIyXhTfOUTw6NL',
        'solo-video-20-sec_1-thumbnail':'price_1NaC1HENjwnIyXhTxvn1sKRe',
        'solo-video-60-sec_square-formatting_voice-over':'price_1NaC0XENjwnIyXhTrS7g8KfZ',
        'solo-video-40-sec_square-formatting_voice-over':'price_1NaBzsENjwnIyXhTTK2XxOZn',
        'solo-video-20-sec_square-formatting_voice-over':'price_1NaByzENjwnIyXhTyEyVfZui',
        'solo-video-60-sec_landscape-formatting_voice-over':'price_1NaBybENjwnIyXhTbtUFvYEB',
        'solo-video-40-sec_landscape-formatting_voice-over':'price_1NaBxrENjwnIyXhTprrzisds',
        'solo-video-20-sec_landscape-formatting_voice-over':'price_1NaBxcENjwnIyXhTf3NPlGq9',
        'solo-video-60-sec_vertical-formatting_voice-over':'price_1NaBw9ENjwnIyXhTRziXO4LJ',
        'solo-video-40-sec_vertical-formatting_voice-over':'price_1NaBwLENjwnIyXhTQlyJjEKV',
        'solo-video-20-sec_vertical-formatting_voice-over':'price_1NaBvgENjwnIyXhTH26F53fZ',
        'solo-video-60-sec_square-formatting':'price_1NaBuzENjwnIyXhT62w2lADW',
        'solo-video-40-sec_square-formatting':'price_1NaBueENjwnIyXhTbIVLPcWe',
        'solo-video-20-sec_square-formatting':'price_1NaBuTENjwnIyXhTYb5TP45s',
        'solo-video-60-sec_landscape-formatting':'price_1NaBuDENjwnIyXhTe3pKvQ8k',
        'solo-video-40-sec_landscape-formatting':'price_1NaBu2ENjwnIyXhTFsouqlI7',
        'solo-video-20-sec_landscape-formatting':'price_1NaBt8ENjwnIyXhTLFZ0y1QG',
        'solo-video-60-sec_vertical-formatting':'price_1NaBtJENjwnIyXhTOFgJzBxC',
        'solo-video-40-sec_vertical-formatting':'price_1NaBstENjwnIyXhTHBYyFSoc',
        'solo-video-20-sec_vertical-formatting':'price_1NaBseENjwnIyXhTJQXPbjn'
      }

    if (comb.hasOwnProperty(concatenatedValue)) {
        var matchedValue = comb[concatenatedValue];
        console.log('Matched Value:', matchedValue);

        // TEST
        // var stripe = Stripe('pk_test_51IVH1EAbTE2jKd8otfWEVhotk6EAxOZVARanEwDPzZEE9THGdRCLfQv21JV79oqnIuCyFpVawhvsmU0m8F5v5Ri700imuCCbWV');

        // Live

        var stripe = Stripe('pk_live_51N9RBYENjwnIyXhTON92zsZ7qNV68rz7hBk95Pm9duNSAeSyMJi2vS0ePVTUgdTWJZQQBHmSb33yAmt9ZMxyMwjH001c70RD2i');

        // $('.checkoutbutton').click(function(e){
        //     e.preventDefault();
            var priceId = matchedValue; //'price_1LW2VTAbTE2jKd8oPI5rRbMp'; //$(this).attr('data-priceId');
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
        // });


        // You can now use the 'matchedValue' as needed.
    } else {
        console.log('No match found in "comb" for the concatenatedValue:', concatenatedValue);
    }
});