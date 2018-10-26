import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './core/table.component';
import { FormComponent } from './core/form.component';
import { MoviesComponent } from './core/movies.component';
import { MovieAddComponent } from './core/movieAdd.component';
import { GameAddComponent } from './core/gameAdd.component';
import { NotFoundComponent } from './core/notFound.component';
import { ProductCountComponent } from './core/productCount.component';
import { CategoryCountComponent } from './core/categoryCount.component';
import { ImgUploadComponent } from './imgUpload/imgUpload.component';
import { ModelResolver } from './model/model.resolver';
import { TermsGuard } from './terms.guard';
import { LoadGuard } from './load.guard';
import { UnsavedGuard } from './core/unsaved.guard';

const childRoutes: Routes = [
	{
		path: '',
		canActivateChild: [TermsGuard],
		children: [
			{ path: 'products', component: ProductCountComponent},
			{ path: 'categories', component: CategoryCountComponent},
			{ path: '', component: ProductCountComponent}
		],
		resolve: { model: ModelResolver }
	}
];
/*const routes: Routes = [
	{ path:"ondemand", loadChildren: "./ondemand/ondemand.module#OndemandModule", canLoad: [LoadGuard]},
	{ path: "form/:mode/:id", component: FormComponent, resolve: { model: ModelResolver }, canDeactivate: [UnsavedGuard]},
	{ path: "form/:mode", component: FormComponent, resolve: { model: ModelResolver }, canActivate: [TermsGuard]},
	{
		path: "table",
		component: TableComponent,
		children: childRoutes
	},
	{
		path: "table/:category",
		component: TableComponent,
		children: childRoutes
	},
	{ path: "", redirectTo: "/table", pathMatch: "full"},
	{ path: "**", component : NotFoundComponent}
];*/
const routes: Routes = [
	{ path: 'form/:mode/:id', component: FormComponent, canDeactivate: [UnsavedGuard]},
	{ path: 'form/:mode', component: FormComponent, canActivate: [TermsGuard]},
	{
		path: 'table',
		component: TableComponent
	},
	{
		path: 'movies',
		component: MoviesComponent
	},
	{
		path: 'addMovie',
		component: MovieAddComponent
	},
	{
		path: 'addGame',
		component: GameAddComponent
	},
	{
		path: 'uploadImg',
		component: ImgUploadComponent
	},
	{
		path: 'table/:category',
		component: TableComponent
	},
	{ path: '', redirectTo: '/addMovie', pathMatch: 'full'},
	{ path: '**', component : NotFoundComponent}
];

export const routing = RouterModule.forRoot(routes);
