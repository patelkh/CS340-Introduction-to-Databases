function updatecustomer(id) {
    $.ajax({
        url: '/customers/' + id,
        type: 'PUT',
        data: $('#updatecustomer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
}