import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ModelModule } from '../model/model.module';
import { ImgUploadModule } from '../imgUpload/imgUpload.module';
import { TableComponent } from './table.component';
import { FormComponent } from './form.component';
import { TopMenuComponent } from './topMenu.component';
import { MovieBlockComponent } from './movieBlock.component';
import { MoviesComponent } from './movies.component';
import { MovieAddComponent } from './movieAdd.component';
import { GameAddComponent } from './gameAdd.component';

import { QuillModule } from 'ngx-quill';
import { ImageUploadModule } from 'angular2-image-upload';
// import { SharedState,SHARED_STATE } from "./sharedState.model";
import { Subject } from 'rxjs/Subject';
import { StatePipe } from './state.pipe';
import { MessageModule } from '../messages/message.module';
import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';
import { Model } from '../model/repository.model';
// import { MODES } from "./sharedState.model";
import { RouterModule } from '@angular/router';
import { ProductCountComponent } from './productCount.component';
import { CategoryCountComponent } from './categoryCount.component';
import { NotFoundComponent } from './notFound.component';
import { UnsavedGuard } from './unsaved.guard';

@NgModule({
	imports: [BrowserModule, FormsModule, ModelModule, MessageModule, RouterModule, MatCardModule, QuillModule, MatSelectModule,
		ImageUploadModule.forRoot(), ImgUploadModule.forRoot()],
	declarations: [TableComponent, FormComponent, StatePipe, ProductCountComponent, CategoryCountComponent,
		NotFoundComponent, TopMenuComponent, MovieBlockComponent, MoviesComponent, MovieAddComponent, GameAddComponent],
	providers: [UnsavedGuard],
	exports: [ModelModule, TableComponent, FormComponent, TopMenuComponent, MovieBlockComponent,
		MoviesComponent, MovieAddComponent, GameAddComponent],
	// providers: [{provide: SHARED_STATE,
		// deps: [MessageService, Model],
		// useFactory: (messageService, model) => {
			// let subject = new Subject<SharedState>();
			/*subject.subscribe(m => messageService.reportMessage(
					new Message(MODES[m.mode] + (m.id != undefined ? ` ${model.getProduct(m.id).name}` : ""))
				));*/
			// return subject;
		// }
	// }]
	// providers: [SharedState]
})
export class CoreModule { }
