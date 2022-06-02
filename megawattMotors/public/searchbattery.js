function searchBatteryByName() {
    //get the battery title
    var battery_search_string  = document.getElementById('battery_search_string').value
    //construct the URL and redirect to it
    window.location = '/batteries/search/' + encodeURI(battery_search_string)
}
