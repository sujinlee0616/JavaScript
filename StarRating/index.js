// Initial Ratings
const ratings = {
    sony: 3.8,
    samsung: 4.7,
    vizio: 2.3,
    panasonic: 3.6,
    phillips: 2.6
}

// Total Stars
const starsTotal = 5;

// Run getRatings when DOM loads
document.addEventListener('DOMContentLoaded', getRatings);

// Form Elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

// Init product 
let product;

// Product select change
productSelect.addEventListener('change', (e) => {
    product = e.target.value;
    // console.log(product);
    // Enable rating control
    ratingControl.disabled = false;
    ratingControl.value = ratings[product];
});

// Rating control change
ratingControl.addEventListener('blur', (e) => {  // blur이벤트 : 해당 엘리먼트에 포커스가 해제되었을때 발생
    const rating = e.target.value;

    // Check for 
    // Make sure 5 or under
    if(rating > 5){
        alert('Please rate 1 - 5');
        return;
    }

    // Change rating
    ratings[product] = rating;
    getRatings();
});

// Get ratings
function getRatings(){
    // console.log('ran');

    for(let rating in ratings){
        // Get percentage
        const starPercentage = (ratings[rating] / starsTotal) * 100 ;

        // Round to nearest 10 
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        // Set width of stars-inner to percentage
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
        // 아래에는 회색 별(.stars-outer)가 있고, 그 위에 노란색 별(.stars-inner)가 오는데, 
        // 이 노란색 별의 width를 조정. ex) .stars-inner의 width를 90%로 준다.

        // Add number rating
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];

    }
}