import { NgModule } from "@angular/core";
// import { StaticDataSource } from "./static.datasource";
import { Model } from "./repository.model";
import { HttpModule, JsonpModule } from "@angular/http";
import { REST_URL, REMOTE_REST_URL, RestDataSource } from "./rest.datasource";
import { ModelResolver } from "./model.resolver";

@NgModule({
	imports: [HttpModule, JsonpModule],
    providers: [Model, RestDataSource, ModelResolver,
    	{provide:REST_URL, useValue: `http://${location.hostname}:3500` },
    	{provide:REMOTE_REST_URL, useValue: `http://${location.hostname}:8080` }
    	]
})
export class ModelModule { }
