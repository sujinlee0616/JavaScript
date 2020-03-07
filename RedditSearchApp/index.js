import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', e => {
    // Get search term
    const searchForm = searchInput.value;
    // console.log(searchForm);
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // console.log(sortBy);
    // Get limit
    const searchLimit = document.getElementById('limit').value;
    // console.log(searchLimit);
    // Get search 
    const searchTerm = searchInput.value;
    // console.log(searchTerm);
    // Check input
    if(searchTerm === ''){
        // Show message
        showMessage('Please add a search term.', 'alert-danger');
    }

    // Clear input
    searchInput.value='';  // submit하고 나면 input값 삭제 

    // Serach Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            // console.log(results);
            let output = '<div class="card-columns">';
            // Loop through posts
            results.forEach(post => {
                // Check for iamge
                const imageSrc 
                = post.preview ? // post.preview가 존재하는지 
                post.preview.images[0].source.url : 
                'https://images.ladbible.com/thumbnail?type=jpeg&url=http://beta.ems.ladbiblegroup.com/s3/content/b07ffa575ca19e0dd56f6c63d8f8916b.png&quality=70&width=720';

                // Show results using card UI
                // console.log(results); // Reddit API에서 뭘 가져올 수 있는지 이름은 뭔지 살펴보자. 
                output += `
                <div class="card">
                <img src="${imageSrc}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${truncateText(post.title, 50)}</h5>
                  <p class="card-text">${truncateText(post.selftext, 200)}</p>  
                  <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                  <hr>
                  <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                  <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
              </div>
                `;
            });
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });

    e.preventDefault();
});

// Show message
function showMessage(message, className){
    // Create dev
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent 
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');

    // Insert message
    searchContainer.insertBefore(div, search);

    // Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000); // 3초 후 메시지 제거

}

// Truncate Text (ex. ${post.selftext} )
function truncateText(text, limit){   
    const shortened = text.indexOf(' ', limit); 
    if(shortened == -1) return text; 
    return (text.substring(0, shortened) + '...'); 
}