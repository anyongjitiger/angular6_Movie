import { Component } from "@angular/core";
import { Model } from "../model/repository.model";
import { RestDataSource } from "../model/rest.datasource";
import { ErrorResponse } from "../model/response";

@Component({
	selector: "gameAdd",
	templateUrl: "gameAdd.component.html",
  	styleUrls: ['gameAdd.component.css'],
})
export class GameAddComponent {
	constructor(private model: Model,private dataSource: RestDataSource ){ }
	onPreviewClicked(event){
		console.log(event.file);
	}
}