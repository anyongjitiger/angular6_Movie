import { Injectable, Inject, InjectionToken} from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response } from "@angular/http";
import { HttpClient,HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Product } from "./product.model";
import { Menu } from "./menu.model";
import { PageResponse, ErrorResponse, CommonResponse, DataResponse } from './response';
import { Gift } from './gift';
import { Movie } from './movie';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/delay";

export const REST_URL = new InjectionToken("rest_url");
export const REMOTE_REST_URL = new InjectionToken("remote_rest_url");

@Injectable()
export class RestDataSource{
	constructor(private http: Http, private httpc: HttpClient, 
			@Inject(REST_URL) private url: string,
			@Inject(REMOTE_REST_URL) private remote_url: string){ }
	getGifts(param ?: any): Observable<any>{
    	return this.httpc.get<PageResponse<Gift> | ErrorResponse>(`${this.remote_url}/api/v1/gift`,param);
  	}
  	getMovies(param ?: any): Observable<any>{
    	return this.httpc.get<PageResponse<Movie> | ErrorResponse>(`${this.remote_url}/api/v1/movie`,param);
  	}
  	getMovie(param: any): Observable<DataResponse<Movie> | ErrorResponse> {
  		return this.httpc.get<DataResponse<Movie> | ErrorResponse>(`${this.remote_url}/api/v1/movie/${param}`);
  	};
  	saveMovie(movie: Movie): Observable<CommonResponse | ErrorResponse> {
  		return this.httpc.post<CommonResponse | ErrorResponse>(`${this.remote_url}/api/v1/movie`, movie);
  	}
  	upload(data: FormData): Observable<HttpEvent<any>> {
  		console.log(data);
  		let header = new HttpHeaders();
        header.append('Content-Type', 'multipart/form-data');
        header.append('Accept', 'application/json');
        /*let initParams: Map<any, any> = new Map();
        initParams.set(headers,headers);*/

        console.log("uploading-----------------------------");
        return this.httpc.request(new HttpRequest('POST',`${this.remote_url}/api/v1/upload`,data,{headers: header})).catch(
				(error: Response) => Observable.throw(`Network Error: ${error.statusText} (${error.status})`)
			);
  		// return this.httpc.post<CommonResponse | ErrorResponse>(`${this.remote_url}/api/v1/upload`, movie);
  	}
	getMenus(): Observable<Menu[]>{
		return this.http.get(`${this.url}/menus`).map(response => response.json());
	} 
	getProducts(): Observable<Product[]>{
		return this.http.get(`${this.url}/products`).map(response => response.json());
		// return this.sendRequest(RequestMethod.Get, this.url);
	}
	saveProduct(product: Product): Observable<Product> {
		// return this.http.post(this.url, product).map(response => response.json());
		return this.sendRequest(RequestMethod.Post, `${this.url}/products`, product);
	}
	updateProduct(product: Product):Observable<Product> {
		// return this.http.put(`${this.url}/${product.id}`,product).map(response => response.json());
		return this.sendRequest(RequestMethod.Put, `${this.url}/products/${product.id}`, product);
	}
	deleteProduct(id : number): Observable<Product> {
		// return this.http.delete(`${this.url}/${id}`).map(response => response.json());
		return this.sendRequest(RequestMethod.Delete, `${this.url}/products/${id}`);
	}
	private sendRequest(verb: RequestMethod, url: string, body?: Product): Observable<Product>{ 
		let headers = new Headers();
		headers.set("Access-Key", "<secret>");
		headers.set("Application-Names", "exampleApp");
		return this.http.request(new Request({
			method: verb,
			url: url,
			body: body,
			headers: headers
		}))
		// .delay(3000)
		.map(response => response.json()).catch(
				(error: Response) => Observable.throw(`Network Error: ${error.statusText} (${error.status})`)
			);
	}
}