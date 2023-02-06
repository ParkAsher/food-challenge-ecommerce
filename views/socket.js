const socket = io.connect("/");

function socketOrderAlert(order_id, receipt_price) {
    socket.emit('PURCHASE', {
        order_id,
        receipt_price,
    });
}

socket.on('PURCHASE_ALERT', function (data) {
    const { order_id, receipt_price, date } = data;
    purchaseNotification(order_id, receipt_price, date);
});

function purchaseNotification(order_id, receipt_price, date) {
    const msgHtml = `총 결제 금액 ${receipt_price} 주문 번호 ${order_id}를 구매하였습니다.<small>(${date})</small>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;

    const alt = $('#customerAlert');
    if (alt.length) {
        alt.html(msgHtml);
    } else {
        const htmlTemp = `<div class="alert alert-sparta" role="alert" id="customerAlert">${msgHtml}</div>`;
        $('body').append(htmlTemp);
    }
}
