function deleteorderfeature(oid, fid){
    $.ajax({
        url: '/orders/' + oid + '/' + fid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};