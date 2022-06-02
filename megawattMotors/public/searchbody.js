function searchBodyByName() {
    //get the body title
    var body_search_string  = document.getElementById('body_search_string').value
    //construct the URL and redirect to it
    window.location = '/bodies/search/' + encodeURI(body_search_string)
}
