const nickname = $('#nickname').text();

const socket = io.connect('/');

function enterAlert() {
    if (nickname) {
        socket.emit('chatRoom');
        $('#chat').css('display', 'block');
    } else return
}

// 입장 메시지
const enter = { message: `${nickname} 님이 입장했습니다.` };

socket.emit('enterMessage', JSON.stringify(enter));
console.log('test 1')
socket.on('usercount', (num) => {
    let html = `<div class="modal-title">그룹채팅(${num}명)</div>`;

    $('#chatHeader').append(html);
});
socket.on('enterMessage', (msg) => {
    enterMessage(msg);
});

function enterMessage(message) {
    const enter = JSON.parse(message);
    let html = `<div class="enter" id="enter">${enter.message}</div>`;
    console.log(html);
    $('#chatLog').prepend(html);
}

if (document.forms.publish) {
    document.forms.publish.onsubmit = function () {
        let outgoingMessage = this.message.value;

        if (outgoingMessage === '') return false;

        const obj = { newMessage: { nickname: nickname, value: outgoingMessage } };
        socket.emit('message', JSON.stringify(obj));
        return false;
    };
}

socket.on('message', (msg) => {
    showMessage(msg);
});

function showMessage(message) {
    const obj = JSON.parse(message);

    if (obj.newMessage.nickname === '관리자') {
        let html = `<div class="admMsg">
                        <span class="anotherName">${obj.newMessage.nickname}</span>
                        <span class="msg" id="admMsg">${obj.newMessage.value}</span>
                    </div>`;
        $('#chatLog').prepend(html);
        $('#message').val('');
    } else if (nickname === obj.newMessage.nickname) {
        let html = `<div class="myMsg">
                        <span class="msg" id="myMsg">${obj.newMessage.value}</span>
                    </div>`;
        $('#chatLog').prepend(html);
        $('#message').val('');
    } else {
        let html = `<div class="anotherMsg">
                        <span class="anotherName">${obj.newMessage.nickname}</span>
                        <span class="msg" id="receiveMsg">${obj.newMessage.value}</span>
                    </div>`;
        $('#chatLog').prepend(html);
        $('#message').val('');
    }
}

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
