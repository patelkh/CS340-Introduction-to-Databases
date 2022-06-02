function deletebody(id){
    $.ajax({
        url: '/bodies/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};