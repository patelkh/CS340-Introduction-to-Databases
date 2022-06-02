function searchWheelByName() {
    //get the wheel title
    var wheel_search_string  = document.getElementById('wheel_search_string').value
    //construct the URL and redirect to it
    window.location = '/wheelsets/search/' + encodeURI(wheel_search_string)
}
