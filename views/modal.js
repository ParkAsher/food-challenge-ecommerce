// modal alert function
function customAlert(text, confirmCallback) {
    $('#alertText').text(text);
    $('#alertModal').modal('show');
    if (confirmCallback) {
        $('#alertModal .btn-confirm').click(confirmCallback);
    }
}
