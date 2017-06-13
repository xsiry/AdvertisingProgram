BootstrapDialog.show({
	title: '文件上传',
	size: 'BootstrapDialog.SIZE_WIDE',
	closeByBackdrop: false,
	message: $('<div class="img_upload" data-url="https://www.baidu.com" data-mincount=1 data-maxcount=3 data-types="image, flash"></div>').load('app/upload_file.html')
});