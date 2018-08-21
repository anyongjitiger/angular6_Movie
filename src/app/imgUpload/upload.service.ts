import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {
  constructor(private http: Http) {
  }

  public postImage(url: string, image: File, headers?: Headers | { [name: string]: any }, partName: string = 'image', customFormData?: { [name: string]: any }, withCredentials?: boolean): Observable<Response> {
    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }

    const options: RequestOptionsArgs = new RequestOptions();

    if (withCredentials) {
      options.withCredentials = withCredentials;
    }

    if (headers) {
      options.headers = new Headers(headers);
    }


    // add custom form data
    let formData = new FormData();
    for (let key in customFormData) {
      formData.append(key, customFormData[key]);
    }
    formData.append(partName, image);
    return this.http.post(url, formData, options);
  }
  public generateSize(cvsWidth : number, 
            cvsHeight: number,
            imgWidth : number, 
            imgHeight: number): {x: number, y: number, width: number, height: number} {
    let x = 0, y = 0, vWidth = 0, vHeight = 0;
    if(imgWidth < cvsWidth){
      if(imgHeight < cvsHeight){
        x = Math.floor((cvsWidth - imgWidth)/2);
        y = Math.floor((cvsHeight - imgHeight)/2);
        vWidth = imgWidth, vHeight = imgHeight;
      }else{
        vHeight = cvsHeight;
        vWidth = Math.floor(imgWidth*(cvsHeight/imgHeight));
        x = Math.floor((cvsWidth - vWidth)/2);
        y=0;
      }
    }else{
      if(imgHeight < cvsHeight){
        vWidth = cvsWidth;
        vHeight = Math.floor(imgHeight * (cvsWidth/imgWidth));
        x = 0, y = Math.floor((cvsHeight - vHeight)/2);
      }else{
        let comp = (imgWidth/imgHeight) - (cvsWidth/cvsHeight);
        if(comp > 0){
          vWidth = cvsWidth;
          vHeight = Math.floor(imgHeight * (cvsWidth / imgWidth));
          x = 0, y = Math.floor((cvsHeight - vHeight)/2);
        }else{
          vHeight = cvsHeight;
          vWidth = Math.floor(imgWidth*(cvsHeight/imgHeight));
          x = Math.floor((cvsWidth - vWidth)/2);
          y=0;
        }
      }
    }
    return {x: x, y: y, width: vWidth, height: vHeight};
  }
}
