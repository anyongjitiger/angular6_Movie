import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { UploadMetadata } from './before-upload.interface';
import { UploadService } from './upload.service';
import { Style } from './style';

export class FileHolder {
  public pending: boolean = false;
  public serverResponse: { status: number, response: any };
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'img-upload',
  templateUrl: './imgUpload.component.html',
  styleUrls: ['./imgUpload.component.css']
})
export class ImgUpload 
implements OnInit, OnChanges
{
	originImg: string;
	file: FileHolder;
	showFileTooLargeMessage: boolean = false;
	@Input() beforeUpload: (param: UploadMetadata) => UploadMetadata | Promise<UploadMetadata> = data => data;
	@Input() disabled = false;
	@Input() buttonCaption = 'Select Images';
	@Input() maxFileSize: number = 4096*1024;
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
	@ViewChild('input')
	private inputElement: ElementRef;
	@ViewChild('canvas_1')
  	private canvas1: ElementRef;
  	@ViewChild('canvas_2')
  	private canvas2: ElementRef;
	constructor(private uploadService: UploadService) {
		// code...
	}
	ngOnInit() {
		this.originImg = "";
	    if (!this.fileTooLargeMessage) {
      		this.fileTooLargeMessage = 'The image was too large and was not uploaded.' + (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'MB.' : '');
	    }
		this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map((ext) => 'image/' + ext) : ['image/*'];
	}
	ngOnChanges(changes) {
	    
	}

	onFileChange(files: FileList) {
	    if (this.disabled) return;
	    if (this.url) {
	      this.uploadStateChanged.emit(true);
	    }
	    this.showFileTooLargeMessage = false;
	    this.uploadFile(files[0]);
	}

	private async uploadFile(file: File) {
		console.log(file);
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

		const img = document.createElement('img');
		img.src = window.URL.createObjectURL(beforeUploadResult.file);
		console.log(img.src);
		this.originImg = img.src;
		/*const reader = new FileReader();
		reader.addEventListener('load', (event: any) => {
			const fileHolder: FileHolder = new FileHolder(event.target.result, beforeUploadResult.file);
			this.uploadSingleFile(fileHolder, beforeUploadResult.url, beforeUploadResult.formData);
			this.file = fileHolder;
			this.originImg = fileHolder.src;
		}, false);
		reader.readAsDataURL(beforeUploadResult.file);*/
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


	onCutCompleted(img: ImageData) {
		console.log(img);
	}
}