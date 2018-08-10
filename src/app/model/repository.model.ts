import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Menu } from "./menu.model";
import { Gift } from './gift';
import { Movie } from './movie';
import { Observable } from "rxjs/Observable";
import { RestDataSource } from "./rest.datasource";
import { PageResponse, ErrorResponse, CommonResponse } from './response';
// import { StaticDataSource } from "./static.datasource";

@Injectable()
export class Model {
	private products: Product[] = new Array<Product>();
	private menus: Menu[] = new Array<Menu>();
	private gifts: Gift[] = new Array<Gift>();
	private movies: Movie[] = new Array<Movie>();
	private locator = (p: Product,id:number) => p.id == id;
	constructor(private dataSource: RestDataSource) {
		// this.products = new Array<Product>();
		// this.dataSource.getData().forEach(p => this.products.push(p));
        this.dataSource.getProducts().subscribe(data => this.products = data);
        this.dataSource.getMenus().subscribe(data => this.menus = data);
	}
	getGifts(param ?: any) {
	    this.dataSource.getGifts(param).subscribe(res => {
	      if (res instanceof ErrorResponse) {
	        // this.toasterService.popAsync('error', '错误', res.error.message);
	      } else {
	        this.gifts = res.data;
	        // this.pageInfo = res.pageInfo;
	      }
	    });
  	}
  	getMovies(param ?: any){
  		this.dataSource.getMovies(param).subscribe(res => {
	      if (res instanceof ErrorResponse) {
	        // this.toasterService.popAsync('error', '错误', res.error.message);
	      } else {
	        this.movies = res.data;
	        console.log(this.movies);
	        // this.pageInfo = res.pageInfo;
	      }
	    });
  	}
  	saveMovie(movie: Movie) {
        if (movie.id == 0 || movie.id == null) {
            this.dataSource.saveMovie(movie).subscribe(res => {
		        if (res.statusCode === 200) {
		        	console.log(res);
		          // this.modalRef.hide();
		          // this.toasterService.popAsync('success', '通知', '礼品添加成功');
		        } else {
		          // this.toasterService.popAsync('error', '错误', res.error.message);
		         // alert(res.error.message);
		        }
		      }
            	// p => this.products.push(p)
        	);
        } else {
            /*this.dataSource.updateProduct(product).subscribe(p => {
                let index = this.products.findIndex(item => this.locator(item, p.id));
                this.products.splice(index, 1, p);
            })*/
        }
    }
	getProducts(): Product[] {
		return this.products;
	}
	getProduct(id: number): Product {
		return this.products.find(p => this.locator(p, id));
	}
	getNextProductId(id: number): number {
		let index = this.products.findIndex(p => this.locator(p, id));
		if(index > -1){
			return this.products[this.products.length > index + 2 ? index + 1 : 0].id;
		}else {
			return id || 0;
		}
	}
	getPreviousProductId(id: number): number {
		let index = this.products.findIndex(p => this.locator(p, id));
		if(index > -1){
			return this.products[index > 0 ? index - 1 : this.products.length - 1].id;
		}else {
			return id || 0;
		}
	}
	saveProduct(product: Product) {
        if (product.id == 0 || product.id == null) {
            /*product.id = this.generateID();
            this.products.push(product);*/
            this.dataSource.saveProduct(product).subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product).subscribe(p => {
                let index = this.products.findIndex(item => this.locator(item, p.id));
                this.products.splice(index, 1, p);
            })
        }
    }

    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(() => {
            let index = this.products.findIndex(p => this.locator(p, id));
            if (index > -1) {
                this.products.splice(index, 1);
            }
        });
    }

    getMenus(): Menu[] {
		return this.menus;
	}

    private generateID(): number {
        let candidate = 100;
        while (this.getProduct(candidate) != null) {
            candidate++;
        }
        return candidate;
    }
}