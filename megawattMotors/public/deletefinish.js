function deletefinish(id){
    $.ajax({
        url: '/finishes/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};