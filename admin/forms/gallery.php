<h1>Image Editor<img class="close" src="http://localhost/cms/admin/img/icons/system-delete-alt.png" alt="X" /></h1>
<form class="editor" action="" method="post" accept-charset="utf-8">
	<div class="preview">
		<div class="img" style="width:50%;overflow:auto;background: transparent url(admin/img/transparency.jpg) repeat top left;">
			<img alt="<?php echo $_POST['alt']; ?>" src="<?php echo $_POST['src']; ?>" />
		</div>
	</div>
	<div class="buttons">	
		<button type="submit">Save</button> <span class="or">or</span> <a href="#" class="close">close</a>
	</div>
</form>