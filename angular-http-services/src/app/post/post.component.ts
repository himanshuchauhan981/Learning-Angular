import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../app-erros';
import { NotFoundError } from '../not-found-error';

@Component({
	selector: 'post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
	posts: any[];
	
	constructor(private service : PostService){
		
	}

	ngOnInit(){
		this.service.getPosts()
			.subscribe(response=>{
				this.posts = response.json()
			},(error)=>{
				console.log(error)
				alert('An unexpected error occured')
			})
	}

	createPost(input: HTMLInputElement){
		let post = { title: input.value }
		input.value = '';
		this.service.createPost(post)
		.subscribe(response=>{
				post['id']= response.json().id;
				this.posts.splice(0,0,post);
				console.log(response.json())
			},
			(error: Response)=>{
				if(error.status === 404){
					alert('An unexcepted error occured')
				}
			}
		)
	}

	updatePost(post){
		this.service.updatePost(post)
		.subscribe(response=>{
			console.log(response.json())
		})
	}

	deletePost(post){
		this.service.deletePost(234)
		.subscribe(
			response =>{
				let index = this.posts.indexOf(post)
				this.posts.splice(index,1)
			},
			(error: AppError) =>{
				if(error instanceof NotFoundError){
					alert('This post has already been deleted')
				}
				else{
					alert('An unexpected error occured...')
				}
				
			}
		)
	}
}
