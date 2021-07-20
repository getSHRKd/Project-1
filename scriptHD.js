class Zomato {
	constructor() {
		this.api = "b9560497b1bfd6207f3bcdd820336297";
		this.header = {
			method: 'GET',
			headers: {
				'user-key': this.api,
				'Content-Type': 'application/json'
			},
		}
	}

	async searchAPI(city) {
		const cityURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}`
		const cityInfo = await fetch(cityURL, this.header);
		const cityJSON = await cityInfo.json()
		const cityLocation = await cityJSON.location_suggestions;
		let cityID = 0
		if (cityLocation.length !== 0) {
			cityID = await cityLocation[0].id
		}

		const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city`
		const restaurantInfo = await fetch(restaurantURL, this.header)
		const restaurantJSON = await restaurantInfo.json()
		const restaurants = await restaurantJSON.restaurants
		console.log("checking response", restaurants)
		return {
			cityID, restaurants
		}
	}
}


$(document).ready(function () {
	$('select').formSelect();
});
M.AutoInit()
$(".dropdown-trigger").dropdown();
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.chips')


	//Zomato api key
	//b9560497b1bfd6207f3bcdd820336297

	// constructor()

	// searchAPI(restaurant)
	// console.log("restaurant ", restaurant)
	// // var show = restaurant.restaurant.cuisines.split(', ')[0] 
	// // console.log( restaurant.restaurant.cuisines.split(', '))       
	// $.ajax({
	// 	url: 'https://api.tvmaze.com/singlesearch/shows?q=' + restaurant,
	// 	type: "GET",

	// }).then(this.TVSuccess)

})

//  TVSuccess(data) 
//? what is this supposed to do? Feels like this code got cut from somewhere
// console.log("show data:", data);

// const div = document.createElement('div');
// div.setAttribute('class', 'col s3');
// div.innerHTML = `
			
        
// 			    	<img src="${data.image.medium}" class="is-fullwidth" alt="">
// 					<h6 class="text-uppercase pt-2 redText">${restaurant}</h6>
// 					<p>${summary.substring(0, 150) + "...<a href=" + url + ">read more</a>"}</p> 
				 
  
			 
// 		`
// document.getElementById("show-info").appendChild(div)

class Restaurants {
	constructor() {
		this.restaurantList = document.querySelector('#restaurant-list')
	}


	showFeedback(text) {
		const feedback = document.querySelector('.feedback');
		feedback.classList.add('showItem')
		feedback.innerHTML = `
			<p>${text}</p>
		`;

	}

	getRestaurants(restaurants) {
		if (restaurants.length === 0) {
			this.showFeedback('Invalid entry')
		} else {
			var i = 0
			this.restaurantList.innerHTML = '';
			restaurants.forEach(restaurant => {

				const { thumb: img, name, location: { address }, menu_url, url, cuisines } = restaurant.restaurant;
				if (img !== '' && i++ < 4) {
					this.showRestaurant(img, name, address, menu_url, url)
				}
			})
		}
	}

	showRestaurant(img, name, address, menu_url, url) {
		const div = document.createElement('div');
		div.setAttribute('class', 'col s3');
		div.innerHTML = `
			
			 
					<img src="${img}" class="is-fullwidth" alt="">
					<h6 class="text-uppercase pt-2 redText">${name}</h6>
					<p>${address}</p>
					<a href="${menu_url}" target="_blank" class="btn text-uppercase"><i class="fas fa-book"></i>Menu</a>
					<a href="${url}" target="_blank" class="btn text-uppercase"><i class="fas fa-book"></i>Zomato Page</a> 
			 
		`

		this.restaurantList.appendChild(div)
	}

}

(function () {
	const searchForm = document.getElementById('searchForm')
	const searchCity = document.getElementById('searchCity')
	const zomato = new Zomato()
	const rest = new Restaurants()


	searchForm.addEventListener('submit', e => {
		e.preventDefault()

		const cityValue = searchCity.value.toLowerCase()

		if (cityValue != '') {
			zomato.searchAPI(cityValue)
				.then(data => {
					if (data.cityID !== 0) {
						zomato.searchAPI(cityValue)
							//NEED TO EDIT/FIC THIS PART
							.then(data => {
								// rest.getRestaurants(data.restaurants)
								console.log("data from zomato");
							})
					} else {
						// rest.showFeedback('Please enter a valid city')
						console.log('Please enter a valid city')
					}
				})
		}
	})

})