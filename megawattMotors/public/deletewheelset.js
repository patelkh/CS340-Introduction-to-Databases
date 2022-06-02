function deletewheelset(id){
    $.ajax({
        url: '/wheelsets/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};