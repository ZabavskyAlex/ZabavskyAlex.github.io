class LandingPage{

	constructor(){
		this.DIR = 'img/screen',
	  	this.page_len = 24;
	  	this.page_current = 1;
	}

	start(){
		let carousel = document.getElementById('carousel'),
		carousel_content = document.getElementById('carousel-content');

	

		let last_span =document.querySelector('#nav-page > span:last-child');

		for(let i = 0; i < this.page_len; i++ ){
			let new_nav_div = document.createElement('div');
			new_nav_div.classList.add('page');
			new_nav_div.id = `page-${i + 1}`;
			last_span.parentNode.insertBefore(new_nav_div, last_span);
		}

		this.addContent(carousel_content, 1);

		this.addEventPage();
	}	

	nextPage(number_page){

	  if(number_page){

	  	document.getElementsByClassName('page')[this.page_current - 1].style.backgroundColor = 'rgb(41%, 41%, 41%, 0.4)';

	  	let carousel_content = document.getElementById('carousel-content');
	  	carousel_content.innerHTML = "";

		this.addContent(carousel_content, number_page);

	  	this.page_current = number_page; 
	  }
	}

	addContent(tips_content, number_page){

		if(!number_page)
			number_page = 1;

		let carousel_content = document.getElementById('carousel-content');
		carousel_content.style.backgroundImage = `url(${this.DIR}/${number_page}.png)`;

		document.getElementsByClassName('page')[number_page - 1].style.backgroundColor = 'black';
	}

	addEventPage(){

		document.onkeydown = (event) => {
			if(document.getElementById('carousel')){
				if(event.keyCode === 37){
					this.nextPage(this.page_current - 1 > 0 ?  this.page_current - 1: this.page_len);
				}
				else if(event.keyCode === 39){			
					this.nextPage(this.page_current < this.page_len ? this.page_current + 1: 1);
				}	
			}
		}

		document.getElementById('wrapper').addEventListener('click', (event) => {
			let tagId = event.target.id,
				href;

			if(tagId === "start_game")
				href = 'game/index.html';
			else if(tagId === "github")
				href = 'https://github.com/ZabavskyAlex';
			else if(tagId === "linkedin")
				href = 'https://www.linkedin.com/in/alexander-zabavsky-739670151/';
			else if (tagId.substr(0, 4) === "page"){

				let number_page = Number(event.target.id.substr(-2)) > 0 ? Number(event.target.id.substr(-2)): Number(event.target.id.substr(-1));

				if(event.target.id === 'page-start'){
				  	number_page = this.page_current - 1 > 0 ?  number_page = this.page_current - 1: this.page_len;
				}
				else if(event.target.id === 'page-finish'){
				  	number_page = this.page_current < this.page_len ? number_page = this.page_current + 1: 1;
				 }

				this.nextPage(number_page);
			}

			if(href)
				window.open(href);
		});
	}
}

new LandingPage().start();
