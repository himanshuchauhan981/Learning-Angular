import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, retry } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs';
import { AppError } from '../app-erros';
import { NotFoundError } from '../not-found-error';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	private url = 'https://jsonplaceholder.typicode.com/posts';
	constructor(private http: Http) { }

	getPosts(){
		return this.http.get(this.url)
	}

	createPost(post){
		return this.http.post(this.url,JSON.stringify(post)).pipe(
			retry(1),catchError((error:Response) =>{
				if(error.status === 404){
					return Observable.throw(new NotFoundError());
				}
				return Observable.throw( new AppError(error))
			})
		)
	}

	updatePost(post){
		return this.http.patch(this.url+'/'+post.id,JSON.stringify({isRead :true }))
	}

	deletePost(id){
		return this.http.delete(this.url+'/post/'+id).pipe(
			retry(1),catchError((error:Response) =>{
				if(error.status === 404){
					return Observable.throw(new NotFoundError());
				}
				return Observable.throw( new AppError(error))
			})
		)
	}

}
