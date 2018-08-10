export class Menu {
	constructor(public id?: number,
				public name?: string,
				public link?: string,
				public subMenus?: Menu) {}
}