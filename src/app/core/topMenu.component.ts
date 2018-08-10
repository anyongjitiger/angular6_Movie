import { Component } from "@angular/core";
import { Menu } from "../model/menu.model";
import { Model } from "../model/repository.model";

@Component({
	selector: "topMenu",
	templateUrl: "topMenu.component.html"
})
export class TopMenuComponent {
	constructor(private model: Model ){}
	getMenus(): Menu[]{
		let menus: Menu[] = this.model.getMenus();
		return menus;
	}
}