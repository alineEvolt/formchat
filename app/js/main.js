jQuery.noConflict();
jQuery(function($) {

  $(document).ready(function() {


    //Gestion des bouton increment
      function spin() {
        $('.incrementbtn').spinner({
          min: 0,
          start: 0,
          spin: function(event, ui) {
              valueSpin = ui.value;
          },
          options: {
            icons: {
              down: "icon custom-down-icon",
              up: "icon custom-up-icon"
            }
          }
        });
      } spin();

      //Gestion des select menus
      $('.selecctBtn').each( function() {
        $(this).selectmenu({
          position: { 
            my : "bottom bottom-5", 
            at: "top top" 
          }
        });
      });
      

      $("html").bind("click touchstart",function(e) {
        if (e.target.className === "ui-selectmenu-text" ||
          e.target.className === "ui-menu-item" || e.target.className === "ui-icon ui-icon-triangle-1-s") {
          
          var selectNode = e.target.nodeName,
              idSelect = $(selectNode).prev().attr('id');   
          $('#' + idSelect).selectmenu("open");

        }
      });

     /* $('.ui-selectmenu-text, ui-menu-item, ui-icon.ui-icon-triangle-1-s').on('click touchstart', function(e) {
        var idSelect = $(this).closest('.ui-selectmenu-button').prev().attr('id');
        
        $('#' + idSelect).selectmenu("open");
      });*/

      $('#page').scroll(function() {

        var respHeight = $('.chat_responses.zindex').height();
        $('.chat_list_item.itemDone').each( function() {
          var pageHeight = $('#page').height(),
              offsetItem = $(this).offset().top;
          console.log('height page : ' + pageHeight + ' offset : ' + offsetItem + ' height reponses : ' + respHeight);
         if( offsetItem < 240 ) {
          console.log('this item : ' + $(this).attr('class'));
         }
        });

      });
      


      //Lancement des séquences
      var firstSequence = $('#chat_form > div');

      function launchSeq( sequence_name ) {

        $s = 1;   
        var seqence = $(sequence_name);

        seqence.each(function(index, value){

          $(this).delay(1000 * index).fadeIn('', function(){

            if ( $(this).is('.chat_list_item_new') ) {
                $(this).find('.avatar').addClass('avatar_scale');
            }

            $(this).addClass('chat_list_item_slide itemDone').find('.chat_bubble').addClass('chat_bubble_typing').find('span').delay(1000).queue( function() {
                $(this).addClass('show');
            });

          });

          if ( $(sequence_name).hasClass('seqItem') === false ) {



            if( $(this).hasClass('chat_responses') ) {
              $nextSeq = '';           
              $nextSubSeq = $(this).attr('id');
              return false;
            } else if( $(this).next().attr('id') === 'submit_mary' || $(this).closest('.sequence').next().attr('id') === 'submit_mary' ) {
              
              setTimeout(launchMary, 1000);
            }

          } else {            

            if( $(this).hasClass('chat_responses') ) { 

              $nextSeq = '';
              $nextSubSeq = $(this).attr('id');
              
              return false;

            } else if( $(this).hasClass('chat_list_item') && $(this).next().attr('class') === undefined ) {

              $nextSubSeq = '';
              $nextSeq = $(this).closest('.sequence').nextAll('div').not('.sequence');          
              
              return false;

            } else if( $(this).hasClass('chat_list_item') && $(this).next().attr('class') !== undefined ) {

              $nextSubSeq = '';
              $nextSeq = $(this).nextAll('div');          
              
              return false;

            }

          }

        });

        $.when( seqence ).done( function() {
          
          if( $nextSubSeq != '' && $nextSeq == '' ) {  

            var wHeight = $('#main').height();        
            $.smoothScroll({
              offset: 350,
              scrollElement: $('#page'),
              easing: 'swing',
              speed: 500
            });

            launchQuest($nextSubSeq);
          } else {

            var wHeight = $('#main').height();        
            $.smoothScroll({
              offset: 350,
              scrollElement: $('#page'),
              easing: 'swing',
              speed: 500
            });

            launchSeq($nextSeq);
          }

        });

      } launchSeq(firstSequence);

        //lancement des questions
        function launchQuest(question_name) {          

          //Gestion de boutons increment (spin)
          $('.incrementbtn').spinner('destroy');          
          spin();

          $('#' + question_name).addClass('zindex');

          var btns = $('#' + question_name + ' .chat_response > div'),
              index = 0,
              delay = setInterval( function(){
                if ( index <= btns.length ){                
                  $( btns[index] ).addClass( 'showButton' );
                  index += 1;
                } else{
                  clearInterval( delay );
                }
              }, 100 );

          $('#' + question_name + ' .chat_response input[type="text"]').val('');

          function clickresponses() {

            btns.find('input[type=radio], a.submit_input, a.increment').one('click', function(e) {

              e.preventDefault();

              var dataNext = $(this).attr('data-next'),
                  btnType = $(this).attr('class'),
                  next_sequence = '';

              if( btnType === 'radio' ) {

                if( dataNext === 'normal_flux' ) {
                  next_sequence = $('#' + question_name).nextAll('div').not('.sequence');
                } else { 
                  next_sequence = $('#' + dataNext + ' > div');
                }

                var valueInput = $(this).val();

                $('<div class="chat_list_item chat_list_item_reponse itemDone" id="show_' + question_name + '" data-update="reponse"><div class="chat_bubble chat_bubble_reponse"><span contenteditable="true">' + valueInput + '</span></div></li>').insertBefore('#' + question_name);

              } else if ( btnType === 'submit_input' ) {

                var nextElement = $('#' + question_name).next().attr('class');
                if( $('#' + question_name).hasClass('seqItem') && nextElement === undefined ) {
                  next_sequence = $('#' + question_name).closest('.sequence').nextAll('div').not('.sequence');
                } else {
                  next_sequence = $('#' + question_name).nextAll('div').not('.sequence');
                }

                var valueInput = $(this).prev().val();

                if( valueInput !== '' ) {

                  $('<div class="chat_list_item chat_list_item_reponse itemDone" id="show_' + question_name + '" data-update="reponse"><div class="chat_bubble chat_bubble_reponse"><span contenteditable="true">' + valueInput + '</span></div></li>').insertBefore('#' + question_name);

                } else {
                  $('#' + question_name).find('.input_text').addClass('error_form');
                  $('#' + question_name).find('.input_text_text').attr('placeholder', 'Merci de saisir une réponse');
                  clickresponses();
                  return false;
                                 
                }

              } else if ( btnType === 'increment' ) {

                var nextElement = $('#' + question_name).next().attr('class'),
                    datasLength = $('#' + question_name + ' .datas').length;

                if( $('#' + question_name).hasClass('seqItem') && nextElement === undefined ) {
                  next_sequence = $('#' + question_name).closest('.sequence').nextAll('div').not('.sequence');
                } else {
                  next_sequence = $('#' + question_name).nextAll('div').not('.sequence');
                }

                var valuesArray = new Array(),
                    spinValid = new Array();

                $(this).closest('.incr.btn').find('.datas').each( function() {

                  prefixe = $(this).attr('data-prefixe'),
                  suffixe = $(this).attr('data-suffixe'),
                  btnText = $(this).find('input').attr('aria-valuenow');

                   if( btnText === undefined ) {
                    btnText = 0;
                  }

                  var valuesText = prefixe + ' ' + btnText + ' ' + suffixe + ' ',
                  spinIsValid = $(this).find('input').spinner( 'isValid' );

                 
                  valuesArray.push(valuesText);
                  spinValid.push(spinIsValid);

                        
                });

                $('<div class="chat_list_item chat_list_item_reponse itemDone" id="show_' + question_name + '" data-update="reponse"><div class="chat_bubble chat_bubble_reponse"><span contenteditable="true">' + valuesArray + '</span></div></li>').insertBefore('#' + question_name);

              }

              $(this).delay(50 * index).queue( function() {
                
                 $('#show_' + question_name).addClass('showButton');
                $('#chat_form').animate({
                  top: '-5px',
                  opacity: 1
                }, 300, function() {
                  $('#chat_form').animate({
                      top: '0'
                  }, 300);
                });

                btns.each( function(index) {
                  $(this).delay(80 * index).queue( function() {
                    $('.error_incr').fadeOut();
                      $(this).addClass('hideButton').removeClass('showButton');                 
                  });
                });

              });

              if( $(next_sequence).attr('id') === 'submit_mary' ) {
               
                  var wHeight = $('#main').height();
                  $.smoothScroll({
                    offset: 350,
                    scrollElement: $('#page'),
                    easing: 'swing',
                    speed: 500
                  });
                setTimeout(launchMary, 1000);

              } else {

                  var wHeight = $('#main').height();
                  $.smoothScroll({
                    offset: 350,
                    scrollElement: $('#page'),
                    easing: 'swing',
                    speed: 500
                  });
                launchSeq(next_sequence);
              }

              setTimeout( function() {
                $('#' + question_name).removeClass('zindex');
              }, 1000);

            });

          } clickresponses();




          $('#' + question_name + ' .input_text_text').keydown(function(event){ 
              var keyCode = (event.keyCode ? event.keyCode : event.which);   
              if (keyCode == 13) {
                  $('#' + question_name).find('a.submit_input').trigger('click');
                  $('#' + question_name).find('a.submit_input').blur();
              }
          });

          $('.selecctBtn').selectmenu({            
            change: function( event, ui ) {

              var next_sequence = '',              
                  valSelect = $(this).val();
                  
             
              $('<div class="chat_list_item chat_list_item_reponse itemDone" id="show_' + question_name + '" data-update="reponse"><div class="chat_bubble chat_bubble_reponse"><span contenteditable="true">' + valSelect + '</span></div></li>').insertBefore('#' + question_name);

              $(this).delay(50 * index).queue( function() {              
                $('#show_' + question_name).addClass('showButton');
                $('#chat_form').animate({
                  top: '-10px',
                  opacity: 1
                }, 300, function() {
                  $('#chat_form').animate({
                      top: '0'
                  }, 300);
                });

                btns.each( function(index) {
                  $(this).delay(80 * index).queue( function() {
                      $(this).addClass('hideButton').removeClass('showButton');
                      $(this).find('.selecctBtn').selectmenu('destroy');

                  });
                });

              });

              var nextElement = $('#' + question_name).next().attr('class');
                  
              if( $('#' + question_name).hasClass('seqItem') && nextElement === undefined ) {
                next_sequence = $('#' + question_name).closest('.sequence').nextAll('div').not('.sequence');
              } else {
                next_sequence = $('#' + question_name).nextAll('div').not('.sequence');
              }

              if( $(next_sequence).attr('id') === 'submit_mary' ) {

                setTimeout(launchMary, 1000);

              } else {

                launchSeq(next_sequence);

              }

            }


          });

        }

        function launchMary() {

          $('#form_chat div:not(.itemDone)').remove();
          $('#submit_mary').delay(1500).queue( function() {
              $('#submit_mary').addClass('show');
              $('#overlay').fadeIn();
          });

        }


      $('#submit_mary').keydown(function(event){ 
          var keyCode = (event.keyCode ? event.keyCode : event.which);   
          if (keyCode == 13) {
              $(this).find('a.submit_chat').trigger('click');
          }
      });

      $('a.submit_chat').on('click', function(e) {          

          var eMail = $(this).closest('.chat_submit').find('input[type="email"]').attr('value'),
              nameP = $(this).closest('.chat_submit').find('input[type="text"]').attr('value'),
              mary = $(this).closest('.chat_submit').find('input#marypopins').attr('value');



          function validateEmail($email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test( $email );
          }

          if( nameP && eMail && validateEmail(eMail) && mary === 'maryP' ) {              
            $('input#email, input#name').removeClass('error');
              $('.error_form').remove();
              post_via_ajax();

          } else if( !(validateEmail(eMail)) ) {
            $('input#email').addClass('error');            
            $('input#name').removeClass('error');
            $('.error_form').remove();
            $('<span class="error_form">Merci de saisir un email valide</span>').insertAfter('.submit_chat');
          } else if ( !(nameP) && eMail ) {
            $('input#name').addClass('error');
            $('input#email').removeClass('error');
            $('.error_form').remove();
            $('<span class="error_form">Merci de renseigner le champ obligatoire</span>').insertAfter('.submit_chat');
          } else if ( !(eMail) && nameP ) {
            $('input#email').addClass('error');
            $('input#name').removeClass('error');
            $('.error_form').remove();
            $('<span class="error_form">Merci de renseigner les champs</span>').insertAfter('.submit_chat');
          } else if ( !(nameP) && !(eMail) ) {
            $('input#email, input#name').addClass('error');
            $('.error_form').remove();
            $('<span class="error_form">Merci de renseigner les champs obligatoires</span>').insertAfter('.submit_chat');
          }


          e.preventDefault();
      
      });

      function post_via_ajax() {

          allChat = new Array();
          $('#chat_form div.itemDone:not(.chat_responses)').each( function() {
          var questRep = $(this).attr('data-update'),
              allText = $(this).find('.chat_bubble > span').text(),
              allTextP = '<p class="' + questRep + '">' + allText + '</p>';

              allChat.push(allTextP);

          });

          var chatux_ajax_url = chatux_params.chatux_ajax_url,
              $post_name = $('#name').val(),
              $post_mail = $('#email').val(),
              $post_title = $post_name + ' - ' + $post_mail,
              $questions = allChat.join('');

        
        
        $.ajax({
          type: 'POST',
          url: chatux_ajax_url,
          data: {
            action: 'chatux_create',
            post_title: $post_title,              
            questions: $questions,
            name: $post_name,
            email: $post_mail
          },
          success: function(data) {
            /*
            function insert_mary() {

                $('<div class="chat_list_item chat_list_item_reponse itemDone" id="show_nameemail" data-update="reponse"><div class="chat_bubble chat_bubble_reponse"><span>Nom : ' + $post_name + ' Email : ' + $post_mail + '</span></div></li>').insertBefore('#submit_mary');
            }*/

            function redirect_mary() {
               
              $('#mail_form').fadeOut('', function() {
                $('#mail_thx').addClass('botLoading').fadeIn();
                

              });

            }

            //setTimeout(insert_mary, 500);
            setTimeout(redirect_mary, 200);
            
          },
          error: function() {
            
          }
        });
      }

      $('.ui-button').on('touchstart click', function(e) {
        e.preventDefault();
      });


      if (matchMedia('only screen and (max-width: 640px)').matches) {

        $('.swiper-container').each(function(index, element){
            $(this).addClass('s'+index);
            $('.s'+index).swiper({
              slidesPerView: 'auto',
              centeredSlÒides: true,
              paginationClickable: false,
              spaceBetween: 0
            });
        });


      }

      //export au format CSV

     /* function exportCsv() { 

          var dataURL = ''; 
          $('.tableExport tr').each(function () { 
           var dataRow = ''; 
           $('td,th', this).each(function () { 
               dataRow += $(this).text() + ";"; 
           }); 
           dataURL += dataRow + '\n'; 
          }); 
          $('#expBtn').attr('href', 'data:text/csv;charset=utf-8;base64,' + btoa(dataURL)); 

      } exportCsv();*/


  }); /* End document ready */

}); /* jQuery end */
