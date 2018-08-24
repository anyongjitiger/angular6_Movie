import { Directive, EventEmitter, HostListener, ElementRef, Input, Output } from '@angular/core';
import { UploadService } from './upload.service';

@Directive({
  selector: '[imgCut]'
})
export class ImgCutDirective {
  @Input() imageSrc: string;
  @Input() cutImage: boolean = false;
  @Output() fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cutComplete: EventEmitter<ImageData> = new EventEmitter<ImageData>();

  flag: boolean = false;
  startX: number;
  startY: number;
  context: CanvasRenderingContext2D;
  canvas1: any;
  cutData: any;
  outSize: boolean = false; //判断截图的尺寸是否超出限定大小
  upService: UploadService;

  constructor(uploadService: UploadService, elem: ElementRef) {
      this.upService = uploadService;
      this.canvas1 = elem.nativeElement;
      this.context = this.canvas1.getContext('2d');
  }
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    this.flag = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any){
    if(this.flag && this.cutImage){
        let img = new Image(), W, H, eX, eY;
        img.src = this.imageSrc;
        W = img.width,H = img.height, eX = event.offsetX, eY = event.offsetY;
        if((eX - this.startX)!= 0 && (eY - this.startY)!=0){
          let sizeObj = this.upService.generateSize(this.canvas1.offsetWidth, this.canvas1.offsetHeight, W, H);
          this.context.clearRect(0,0,this.canvas1.offsetWidth,this.canvas1.offsetHeight);
          this.context.drawImage(img,0,0, W, H,
                                sizeObj.x,sizeObj.y,
                                sizeObj.width, 
                                sizeObj.height);
          this.context.fillStyle = 'rgba(255,255,255,0.6)';//设定为半透明的白色
          this.context.fillRect(sizeObj.x, sizeObj.y, eX - sizeObj.x, this.startY - sizeObj.y);//矩形A
          this.context.fillRect(eX, sizeObj.y, sizeObj.width + sizeObj.x - eX, eY - sizeObj.y);//矩形B
          this.context.fillRect(this.startX, eY, sizeObj.width + sizeObj.x - this.startX, sizeObj.height + sizeObj.y - eY);//矩形C
          this.context.fillRect(sizeObj.x, this.startY, this.startX - sizeObj.x, sizeObj.height + sizeObj.y -this.startY);//矩形D
          let txt, txtWidth;
          this.cutData = this.context.getImageData(this.startX, this.startY, eX - this.startX, eY - this.startY);
          this.context.fillStyle = "Red";
          this.context.font="12px Arial";
          this.outSize = false;
          if(eX - this.startX > 350){
            txt = "Width shouldn't be more than 350";
            this.outSize = true;
          }else if(eY - this.startY > 350){
            txt = "Height shouldn't be more than 350";
            this.outSize = true;
          }else{
            txt=`${this.cutData.width} × ${this.cutData.height}`;
          }
          txtWidth = this.context.measureText(txt).width;  //这个方式可以获取到文字所占的像素宽度
          if(eX > sizeObj.x + sizeObj.width - txtWidth){
            this.context.fillText(txt, sizeObj.x + sizeObj.width - txtWidth, eY + 30);
          }else{
            this.context.fillText(txt, eX, eY);
          }
        } //getImageData这个方法不能用跨域的图片
        // resultImg.putImageData(cutData,0,0);
    }
  }
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any){
    this.flag = false;
    if(!this.outSize && this.cutImage){
      this.cutComplete.emit(this.cutData);
    }
  }

  /*@HostListener('drop', ['$event'])
  onDrop(event: any) {
    let dataTransfer = ImgCutDirective.getDataTransfer(event);

    if (!ImgCutDirective.hasFiles(dataTransfer.types)) {
      return;
    }

    event.preventDefault();

    let files = this.filterFiles(dataTransfer.files);

    event.preventDefault();
    this.fileOver.emit(false);
    this.fileDrop.emit(files);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    this.fileOver.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: any) {
    let dataTransfer = ImgCutDirective.getDataTransfer(event);

    if (!ImgCutDirective.hasFiles(dataTransfer.types)) {
      return;
    }

    dataTransfer.dropEffect = 'copy';
    event.preventDefault();
    this.fileOver.emit(true);
  }

  private filterFiles(files: FileList): any {
    if (!this.accept || this.accept.length === 0) {
      return files;
    }

    let acceptedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      for (let j = 0; j < this.accept.length; j++) {
        if (ImgCutDirective.matchRule(this.accept[j], files[i].type)) {
          acceptedFiles.push(files[i]);
          break;
        }
      }
    }

    return acceptedFiles;
  }

  private static getDataTransfer(event: any): DataTransfer {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private static hasFiles(types: any): boolean {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    }

    if (types.contains) {
      return types.contains('Files');
    }

    return false;
  }

  private static matchRule(rule: string, candidate: string) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(candidate);
  }*/
}
