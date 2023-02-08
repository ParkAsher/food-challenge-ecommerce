const socketIo = require('socket.io');
const http = require('./app');

const io = socketIo(http);

// 소켓 연결 이벤트 핸들링
io.on('connection', (socket) => {

    // 모두 이 방으로 들어가게 하기
    socket.on('chatRoom', () => {
        socket.join('chatRoom');

        // 입장 메시지
        socket.on('enterMessage', (msg) => {

            socket.broadcast.emit('enterMessage', msg);
        });
    });

    // 방 인원 숫자
    socket.emit('usercount', io.engine.clientsCount);

    // 메시지 핸들
    socket.on('message', (msg) => {

        io.emit('message', msg);
    });

    // 구매 시 알림이벤트
    socket.on('PURCHASE', (data) => {
        const emitData = {
            ...data,
            date: new Date().toISOString(),
        };

        io.emit('PURCHASE_ALERT', emitData);
    });

    socket.on('disconnect', () => {
        console.log(socket.id, '연결이 끊어졌어요!');
    });
});
