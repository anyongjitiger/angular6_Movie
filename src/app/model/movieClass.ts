import { Movie } from "./movie";
export class MovieClass implements Movie {
  constructor(
    public id?: number,
    public cnName?: string,
    public name?: string,
    public cover?: string,
    public year?: number,
    public createDate?: Date,
    public dataSize?: string,
    public movieLength?: string,
    public doubanScore?: number){  }
}