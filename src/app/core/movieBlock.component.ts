import { Component } from '@angular/core';
import { Movie } from '../model/movie';
import { Model } from '../model/repository.model';
import { RestDataSource } from '../model/rest.datasource';
import { ErrorResponse } from '../model/response';

@Component({
	selector: 'movieBlock',
	templateUrl: 'movieBlock.component.html',
	styleUrls: ['movieBlock.component.css'],
})
export class MovieBlockComponent {
	constructor(private model: Model, private dataSource: RestDataSource ) {
	console.log('MovieBlockComponent');
		this.model.getMovies({
			params: {
				name: '',
				pageNo: '1',
				pageSize: '10'
			}
		});
	this.getMovie(6);
	}
	getMovie(param: any) {
		this.dataSource.getMovie(param).subscribe(res => {
			if (res instanceof ErrorResponse) {} else {
				console.log(res.data);
			}
		});
	}
}
