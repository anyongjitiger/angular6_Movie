import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from "./model/model.module";
import { ImgUploadModule } from "./imgUpload/imgUpload.module";
import { QuillModule } from 'ngx-quill';
import { ImageUploadModule } from "angular2-image-upload";
import { CoreModule } from "./core/core.module";
import { TableComponent } from "./core/table.component";
import { FormComponent } from "./core/form.component";
import { MessageModule } from "./messages/message.module";
import { MessageComponent } from "./messages/message.component";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { TermsGuard } from "./terms.guard";
import { LoadGuard } from "./load.guard";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MATERIAL_SANITY_CHECKS } from '@angular/material';

@NgModule({
    imports: [BrowserModule, HttpClientModule,CoreModule, QuillModule,
    		MessageModule, routing, BrowserAnimationsModule, ImgUploadModule.forRoot(),
    		ImageUploadModule.forRoot()],
    declarations: [AppComponent],
    providers: [TermsGuard, LoadGuard,{
            provide: MATERIAL_SANITY_CHECKS,
            useValue: false
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
