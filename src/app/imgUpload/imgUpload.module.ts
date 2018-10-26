import { CommonModule } from '@angular/common';
import { ModuleWithProviders, ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ImgUploadComponent } from './imgUpload.component';
import { ImgCutDirective } from './imgCut.directive';
import { UploadService, REST_URL } from './upload.service';

@NgModule({
	imports: [CommonModule, HttpModule],
	declarations: [ImgUploadComponent, ImgCutDirective],
	exports: [ImgUploadComponent]
})
export class ImgUploadModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ImgUploadModule,
			providers: [UploadService, {provide: REST_URL, useValue: `http://${location.hostname}:8080`}]
		};
	}
}
