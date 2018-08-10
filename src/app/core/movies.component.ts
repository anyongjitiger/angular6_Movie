import { Component } from "@angular/core";
import { Movie } from "../model/movie";
import { MovieClass } from "../model/movieClass";
import { MovieBlockComponent } from "./movieBlock.component";
import { Model } from "../model/repository.model";

@Component({
	selector: "movies",
	templateUrl: "movies.component.html",
  styleUrls: ['movies.component.css'],
})
export class MoviesComponent {
  public editorContent = `<h3>I am Example content</h3>`;
  movie: Movie = new MovieClass();
	constructor(private model: Model ){
  }
  ngOnInit() {
    setTimeout(() => {
      this.editorContent = '<h1>content changed!</h1>';
      // this.editor.disable();
    }, 2800)
  }
  onContentChanged({ editor: editorInstance,html: html,text: text,content: content,delta: delta,oldDelta: oldDelta,source: source }) {
    let dependedDate = new Date(), milliseconds = Date.parse("2017/03/19");
    dependedDate.setTime(milliseconds);
    this.movie.cnName = "雷神3：诸神黄昏";
    this.movie.name = "Thor: Ragnarok";
    this.movie.cover = "http://yinfans.qiniudn.com/wp-content/uploads/2018/02/p2454809896.jpg";
    this.movie.createDate = dependedDate;
    this.movie.dataSize = "14.1G";
    this.movie.movieLength = "130min"
    this.movie.doubanScore = 7.5;
    this.movie.year = 2017;
  }
  saveMovie() {
    this.model.saveMovie(this.movie);
  }
}