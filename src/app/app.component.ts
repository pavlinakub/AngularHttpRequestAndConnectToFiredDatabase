import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts(); //vypsani dat do console fetchPost hned po nacteni stranky
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http
      .post(
        'https://angular-httppartofcourse-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchPosts() {
    //getAllData
    this.http
      .get(
        'https://angular-httppartofcourse-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((responseData: { [key: string]: unknown }) => {
          const postArray: { [key: string]: unknown }[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe((posts) => {
        console.log(posts); //tady si muzeme vypsat data
      });
  }
}
//pak se musis podivat na obserable
