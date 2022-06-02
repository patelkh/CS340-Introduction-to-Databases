function searchFinishByName() {
    //get the finish title
    var finish_search_string  = document.getElementById('finish_search_string').value
    //construct the URL and redirect to it
    window.location = '/finishes/search/' + encodeURI(finish_search_string)
}
