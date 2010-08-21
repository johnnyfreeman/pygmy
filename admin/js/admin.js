$(document).ready(function(){
	
	var bodyHeight = $('body').height();
	
	$('body').addClass('js'); 
	
	// add a container div for all editable's clones
	$('body').prepend('\n\n<!-- Just empty boxes for editing -->\n<div id="editable-regions">\n</div>\n<!-- No more silly editing boxes -->\n\n');
		
	/*******************************************************************/
	/* START LOOP													   */
	/* =============================================================== */
	/* Loop through all elements that contain the .editable class.	   */
	/* Give each a unique id and link it to the clone div by storing   */
	/* that id as a classname in the clone. Then, match their          */
	/* positions, widths, and heights.                                 */
	/*******************************************************************/
	$('.editable').each(function(i){
		
		var tagName = $(this).get(0).tagName;
		
		
		if(tagName == "IMG"){
			$(this).bind('load', function (e) {
				// some things we'll need to know about each
				var regionHeight = $(this).outerHeight();
				var regionWidth = $(this).outerWidth();
				var regionPosition = $(this).offset();
				// set an id to give us something to refer back to
				$(this).attr('id', 'i'+i);
				// create a div to lay directly on top of each
				$('#editable-regions').prepend('\n\t<div class="' + i + '"></div>');
				// set the xy position, width, and height for each
				$('.' + i).css({'top': regionPosition.top-3 + 'px','left': regionPosition.left-3 + 'px','height': regionHeight+2 + 'px','width':regionWidth+2 + 'px'});
			}); // end bind load event
		} else {
			// some things we'll need to know about each
			var regionHeight = $(this).outerHeight();
			var regionWidth = $(this).outerWidth();
			var regionPosition = $(this).offset();
			// set an id to give us something to refer back to
			$(this).attr('id', 'i'+i);
			// create a div to lay directly on top of each
			$('#editable-regions').prepend('\n\t<div class="' + i + '"></div>');
			// set the xy position, width, and height for each
			$('.' + i).css({'top': regionPosition.top-3 + 'px','left': regionPosition.left-3 + 'px','height': regionHeight+2 + 'px','width':regionWidth+2 + 'px'});
		}
	}); /* END LOOP ****************************************************/
	
	// create the overlay, the loader, and modal box
	$('body').prepend('\n<div id="overlay"></div>\n\n');
	$('#overlay').prepend('\n<div id="loader">Loading...</div>\n<div id="modal"></div>\n');
		
	/* This triggers the editing process 
	+*/
	$('#edit').toggle(function(event){
		
		event.preventDefault();
		
		$('#editable-regions').fadeIn(300);
		
		/*******************************************************************/
		/* CLONE CLICK													   */
		/* =============================================================== */
		/* When a editable's clone is clicked a modal box is opened        */
		/* containing the editable's content.                              */
		/*******************************************************************/
		$('#editable-regions div').click(function(event){
			
			event.preventDefault();
			
			// store the tagname and id
			var i = $(this).attr('class');
			var refId = $('.editable:eq(' + i + ')');
			var tagName = refId.get(0).tagName;
			var data = new Object;
			
			// display the appropriate form page for editable's tagname
 			if (tagName == 'IMG') {
				var formLocation = "admin/forms/gallery.php";
				data.src = refId.attr('src');
				data.alt = refId.attr('alt');
			} else {
				var formLocation = "admin/forms/textbox.php";
				data.html = refId.html();
			}
			
			// display overlay
			$('#overlay').fadeIn(200, function(){
								
				// center loader in the window
				var halfLoaderWidth = $('#loader').outerWidth()/2;
				var halfWindowWidth = $(window).width()/2;
				var halfWindowHeight = $(window).height()/2;
				var loaderPosLeft = halfWindowWidth - halfLoaderWidth;
				$('#loader').css('left', loaderPosLeft + 'px');
				
				// bring the loader down on to the top of the page
				$('#loader').animate(
					{top: '10px'}, 
					300
				);
				
				// get the form and display it in the modal box
				$.ajax({
					cache: false,
					data: data,
					success: function(data){
					$('#modal').html(data);
						$('.wysiwyg').wysiwyg({
							controls: {
								undo: {visible: false},
								redo: {visible: false},
								justifyLeft: {visible: false},
								justifyCenter: {visible: false},
								justifyRight: {visible: false},
								justifyFull: {visible: false},
								separator01: {visible: false},
								indent: {visible: false},
								outdent: {visible: false},
								subscript: {visible: false},
								superscript: {visible: false},
								separator03: {visible: false},
								insertOrderedList: {visible: false},
								insertUnorderedList: {visible: false},
								insertHorizontalRule: {visible: false},
								separator05: {visible: false},
								separator06: {visible: false},
								h1mozilla: {visible: false},
								h2mozilla: {visible: false},
								h3mozilla: {visible: false},
								h1: {visible: false},
								h2: {visible: false},
								h3: {visible: false},
								separator09: {visible: false},
								removeFormat: {visible: false}
							}
						});
						$('div.wysiwyg ul.panel li a.bold').text('Bold');
						$('div.wysiwyg ul.panel li a.italic').text('Italic');
						$('div.wysiwyg ul.panel li a.strikeThrough').text('Strike Through');
						$('div.wysiwyg ul.panel li a.underline').text('Underline');
						$('div.wysiwyg ul.panel li a.createLink').text('Link');
						$('div.wysiwyg ul.panel li a.insertImage').text('Image');
						$('.wysiwyg, iframe').css('width', '100%');
						// center modal box in the window
						$('.img').css('height',halfWindowHeight);
						var halfModalWidth = $('#modal').outerWidth()/2;
						var modalPosLeft = halfWindowWidth - halfModalWidth;
						var halfModalHeight = $('#modal').outerHeight()/2;
						var modalPosTop = halfWindowHeight - halfModalHeight;
						$('#modal').css('left', modalPosLeft + 'px').css('top', modalPosTop + 'px');
					},
					type: 'POST',
					url: formLocation,
					complete: function(){
						// fade in modal box and move loader back out of view again
						$('#modal').fadeIn(300, function(){
							$('#loader').animate({top: '-30px'}, 300);
							$('.close').click(function(event){
								event.preventDefault();
								$('#overlay, #modal').hide();
							});
						}); // end #modal fadein
					} // close complete option
				}); // $.ajax
			}); // end show overlay
			
		}); /* END CLONE CLICK *********************************************/
	},function(){
		
		$('#editable-regions').fadeOut(300);
		
	}); // end #edit toggle
}); // end document ready