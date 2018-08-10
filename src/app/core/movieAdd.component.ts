import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MovieClass } from "../model/movieClass";
import { Model } from "../model/repository.model";
import { RestDataSource } from "../model/rest.datasource";
import { ErrorResponse } from "../model/response";

@Component({
	selector: "movieAdd",
	templateUrl: "movieAdd.component.html",
  // styleUrls: ['movieAdd.component.css'],
})
export class MovieAddComponent {
  movie: MovieClass = new MovieClass();
	constructor(private model: Model,private dataSource: RestDataSource ){ }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('file', file);
        this.dataSource.upload(formData).subscribe((val) => {
                console.log("DELETE call successful value returned in body", 
                  val);
            },
            response => {
                console.log("DELETE call in error", response);
            },
            () => {
                console.log("The DELETE observable is now completed.");
            });
    }
  }
}