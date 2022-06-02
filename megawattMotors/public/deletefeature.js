function deletefeature(id){
    $.ajax({
        url: '/customfeatures/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};