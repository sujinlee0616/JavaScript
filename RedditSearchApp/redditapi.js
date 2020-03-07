// Reddit API Documentation: https://www.reddit.com/dev/api/
export default{
    search: function(searchTerm, searchLimit, sortBy){
        // console.log('Search....');
        return fetch(
            `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
        )
            .then(res => res.json())
            .then(data => data.data.children.map(data => 
            data.data))
            .catch(err => console.log(err));
    }
};