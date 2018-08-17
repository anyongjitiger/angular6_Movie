import { Directive, EventEmitter, HostListener, ElementRef, Input, Output } from '@angular/core';

@Directive({
  selector: '[imgCut]'
})
export class ImgCutDirective {
  @Input() imageSrc: string;
  @Output() fileOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cutComplete: EventEmitter<ImageData> = new EventEmitter<ImageData>();

  flag: boolean = false;
  startX: number;
  startY: number;
  context: CanvasRenderingContext2D;
  cutData: any;

  constructor(elem: ElementRef) {
      this.context = elem.nativeElement.getContext('2d');
  }
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    this.flag = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any){
    if(this.flag){
        let img = new Image(), W, H, eX, eY;
        img.src = this.imageSrc;
        W = img.width,H = img.height, eX = event.offsetX, eY = event.offsetY;
        // console.log(`w=${W},h=${H},clientX=${eX},clientY=${eY}`);
        this.context.clearRect(0,0,W,H);
        // resultImg.clearRect(0,0,cutData.width,cutData.height);
        this.context.drawImage(img,0,0);
        this.context.fillStyle = 'rgba(255,255,255,0.6)';//设定为半透明的白色
        this.context.fillRect(0, 0, eX, this.startY);//矩形A
        this.context.fillRect(eX, 0, W-eX, eY);//矩形B
        this.context.fillRect(this.startX, eY, W-this.startX, H-eY);//矩形C
        this.context.fillRect(0, this.startY, this.startX, H-this.startY);//矩形D
        this.cutData = this.context.getImageData(this.startX, this.startY, eX - this.startX, eY - this.startY); //getImageData这个方法不能用跨域的图片
        // resultImg.putImageData(cutData,0,0);
    }
  }
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any){
    this.flag = false;
    this.cutComplete.emit(this.cutData);
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
