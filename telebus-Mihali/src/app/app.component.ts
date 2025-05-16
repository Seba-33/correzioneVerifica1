import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './post.model';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,PostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'telebus-Mihali';
  vettPost : Post[] = []  ;
  obs : Observable<Post[]> ;
  //mi faccio dare l'oggetto http da angular
  constructor(private http: HttpClient){
    //faccio la richiesta http, perche il costruttore parte all'avvio
  this.obs =  this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts'); //richiedo i post dal mio server
  //dico all'observable cosa fare quando ricevo i dati
  this.obs.subscribe(this.getdata );
  
  }

  //la funzione che l'observable chiama quando riceve il data
  getdata = (data : Post[]) => {
    console.log(data);
    this.vettPost = data; //assegno i dati ricevuti dall'array di post
  }

  obsPost! : Observable<any>;  //per ora non so che dati ricevero
  addPost(userId : string, body : string) {
    let nuovoPost = new Post(userId, body, "0","SENZA TITOLO");     
    this.vettPost.push(nuovoPost);
    console.log(this.vettPost);

    this.obsPost = this.http.post('https://jsonplaceholder.typicode.com/posts', nuovoPost)
    this.obsPost.subscribe(this.rispostaPost);


  }

  rispostaPost = (data : any) => {
    console.log(data)
  }

  
}
