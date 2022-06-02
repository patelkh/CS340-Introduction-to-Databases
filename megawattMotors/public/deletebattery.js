function deletebattery(id){
    $.ajax({
        url: '/batteries/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};