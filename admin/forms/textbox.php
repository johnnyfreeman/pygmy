<h1>Content Editor<img class="close" src="http://localhost/cms/admin/img/icons/system-delete-alt.png" alt="X" /></h1>
<form class="editor" action="" method="post" accept-charset="utf-8">
	<div class="editor">
		<textarea name="content" class="wysiwyg"><?php echo $_POST['html']; ?></textarea>
	</div>
	<div class="buttons">	
		<button type="submit">Done</button>
	</div>
</form>