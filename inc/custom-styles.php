/*		Custom styles */
body, #page, .chat_responses {
    color: <?php the_field('text_color_quest', 'option'); ?> !important;
}
body, #page {
    background: <?php the_field('bkg_general_chat', 'option'); ?> !important;
    color: <?php the_field('text_color_quest', 'option'); ?> !important;
}

.chat_responses .chat_response.chat_list_item_slide {
    background: <?php the_field('bkg_general_chat', 'option'); ?> !important;
}

p, h1, h2, h3, ul, li {
	color: <?php the_field('text_color_quest', 'option'); ?> !important;
}

#chat_form .chat_list_item .chat_bubble:not(.chat_bubble_reponse),
#chat_form .chat_list_item .chat_bubble:not(.chat_bubble_reponse).chat_bubble_typing,
#chat_form .chat_list_item .chat_bubble:not(.chat_bubble_reponse) > span {
	color: <?php the_field('text_color_quest', 'option'); ?> !important;
	background: <?php the_field('bkg_bulles_quest', 'option'); ?> !important;
}

#submit_mary,
#submit_mary input,
#chat_form .chat_list_item .chat_bubble:not(.chat_bubble_reponse).chat_bubble_typing {
	background-color: <?php the_field('bkg_bulles_quest', 'option'); ?> !important;
}

.chat_responses input.btn, 
#chat_form .chat_list_item .chat_bubble.chat_bubble_reponse,
.chat_responses input.btn:hover,
.chat_responses input.btn:focus,
.btn a:hover,
.btn a:focus,
.chat_responses .radio label:hover,
.chat_responses .radio label:focus,
.submit a:hover,
.submit a:focus {
	background: <?php the_field('bkg_bulles_reponse', 'option'); ?> !important;	
	color: <?php the_field('text_color_reponse', 'option'); ?> !important;
}

.chat_responses input.btn, .btn a, .chat_responses .radio label, .submit a, .chat_responses input.input_text_text {
	color: <?php the_field('text_color_reponse', 'option'); ?> !important;
	border-color: <?php the_field('bkg_bulles_reponse', 'option'); ?> !important;
}
.chat_responses input.input_text_text::-webkit-input-placeholder { color: <?php the_field('text_color_reponse', 'option'); ?> !important; }
.chat_responses input.input_text_text::-moz-input-placeholder { color: <?php the_field('text_color_reponse', 'option'); ?> !important; }
.chat_responses input.input_text_text::-moz-placeholder { color: <?php the_field('text_color_reponse', 'option'); ?> !important; }
.chat_responses input.input_text_text::-ms-input-placeholder { color: <?php the_field('text_color_reponse', 'option'); ?> !important; }

.chat_responses .ui-selectmenu-button,
.chat_responses select {
	color: <?php the_field('text_color_reponse', 'option'); ?> !important;
	background-color: <?php the_field('bkg_bulles_reponse', 'option'); ?> !important;
}

#submit_mary input:focus {
	border-color: <?php the_field('bkg_bulles_reponse', 'option'); ?> !important;
}

.chat_responses .ui-spinner a.ui-spinner-button .ui-icon {
	background-color: <?php the_field('bkg_bulles_reponse', 'option'); ?> !important;
}