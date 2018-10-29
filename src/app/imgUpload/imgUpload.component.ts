import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Headers, Response } from '@angular/http';
import { UploadMetadata } from './before-upload.interface';
import { UploadService } from './upload.service';
import { Style } from './style';

export class FileHolder {
	public pending = false;
	public serverResponse: { status: number, response: any };
	constructor(public src: string, public file: File) {}
}

@Component({
	selector: 'img-upload',
	templateUrl: './imgUpload.component.html',
	styleUrls: ['./imgUpload.component.css']
})
export class ImgUploadComponent implements OnInit, OnChanges {
	originImg: SafeUrl;
	file: FileHolder;
	showFileTooLargeMessage = false;
	cutCompleted = false; // 截图完成
	@Input() disabled = false;
	@Input() cutImage = false; // 是否需要开启截图功能
	@Input() buttonCaption = 'Select Images';
	@Input() maxFileSize: number = 4096 * 1024;
	@Input() fileTooLargeMessage;
	@Input('extensions') supportedExtensions: string[];
	@Input('innerStyle') style: Style;
	@Input('class') cssClass = 'img-ul';
	@Input() url: string;
	@Input() headers: Headers | { [name: string]: any };
	@Input() partName: string;
	@Input() withCredentials = false;
	@Output() uploadStateChanged = new EventEmitter<boolean>();
	@Output() uploadFinished = new EventEmitter<FileHolder>();
	@ViewChild('hide_img')
	private imageObj: ElementRef;
	@ViewChild('input')
	private inputElement: ElementRef;
	@ViewChild('canvas_1')
	private canvas1: ElementRef;
	@ViewChild('canvas_2')
	private canvas2: ElementRef;
	@Input() beforeUpload: (param: UploadMetadata) => UploadMetadata | Promise<UploadMetadata> = data => data;
	constructor(private uploadService: UploadService, private sanitizer: DomSanitizer) {
		// code...
	}
	ngOnInit() {
		this.originImg = '';
		if (!this.fileTooLargeMessage) {
			this.fileTooLargeMessage = 'The image was too large and was not uploaded.'
			+ (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'MB.' : '');
		}
		this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map((ext) => 'image/' + ext) : ['image/*'];
	}
	ngOnChanges(changes) {

	}
	setCanvasData(event) {
		if (!this.cutImage) { return; }
		const canvas1 = this.canvas1.nativeElement, imgE = this.imageObj.nativeElement;
		canvas1.getContext('2d').clearRect(0, 0, canvas1.offsetWidth, canvas1.offsetHeight);
		const sizeObj = this.uploadService.generateSize(canvas1.offsetWidth, canvas1.offsetHeight, imgE.naturalWidth, imgE.naturalHeight);
		canvas1.getContext('2d').drawImage(this.imageObj.nativeElement, 0, 0,
													imgE.naturalWidth,
													imgE.naturalHeight,
													sizeObj.x, sizeObj.y,
													sizeObj.width,
													sizeObj.height);
	}
	onFileChange(files: FileList) {
		if (this.disabled) { return; }
		if (this.url) {
			this.uploadStateChanged.emit(true);
		}
		this.showFileTooLargeMessage = false;
		const sfUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[0]));
		this.originImg = sfUrl;
		this.clearCanvas(this.canvas2);
		this.cutCompleted = false;
		this.uploadFile(files[0]);
	}

	private async uploadFile(file: File) {
		if (this.maxFileSize && file.size > this.maxFileSize) {
			this.inputElement.nativeElement.value = '';
			this.showFileTooLargeMessage = true;
			return;
		}

		const beforeUploadResult: UploadMetadata = await this.beforeUpload({ file, url: this.url, abort: false });

		if (beforeUploadResult.abort) {
			this.inputElement.nativeElement.value = '';
			return;
		}
		const reader = new FileReader();
		reader.addEventListener('load', (event: any) => {
			const fileHolder: FileHolder = new FileHolder(event.target.result, beforeUploadResult.file);
			this.uploadSingleFile(fileHolder, beforeUploadResult.url, beforeUploadResult.formData);
			this.file = fileHolder;
			this.originImg = fileHolder.src;
		}, false);
		reader.readAsDataURL(beforeUploadResult.file);
	}

	private uploadSingleFile(fileHolder: FileHolder, url = this.url, customForm?: { [name: string]: any }) {
		if (url) {
			fileHolder.pending = true;
			this.uploadService
			.postImage(url, fileHolder.file, this.headers, this.partName, customForm, this.withCredentials)
			.subscribe(
				response => this.onResponse(response, fileHolder),
				error => {
					this.onResponse(error, fileHolder);
					this.inputElement.nativeElement.value = '';
				});
		} else {
			this.uploadFinished.emit(fileHolder);
		}
	}

	private onResponse(response: Response, fileHolder: FileHolder) {
		fileHolder.serverResponse = { status: response.status, response };
		fileHolder.pending = false;
		this.uploadFinished.emit(fileHolder);
		this.uploadStateChanged.emit(false);
	}
	private clearCanvas(canvas: ElementRef) {
		canvas.nativeElement.getContext('2d').clearRect(0, 0, canvas.nativeElement.offsetWidth, canvas.nativeElement.offsetHeight);
	}

	onCutCompleted(img: ImageData) {
		const cv2 = this.canvas2.nativeElement;
		if (img || false) {
			this.clearCanvas(this.canvas2);
			this.cutCompleted = true;
			const sizeObj = this.uploadService.generateSize(cv2.offsetWidth, cv2.offsetHeight, img.width, img.height);
			cv2.getContext('2d').putImageData(img, Math.floor((350 - img.width) / 2), Math.floor((350 - img.height) / 2));
		}
	}
}
