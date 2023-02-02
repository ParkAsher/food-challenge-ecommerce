module.exports = (err, req, res, next) => {
    console.log('Error Handling Middleware');
    console.log(err);

    /* Joi Validation Error */
    if (err.isJoi) {
        const joiErredKey = err.details[0].context.key;
        const joiErrorStatus = 412;

        /* 빈칸 */
        if (err.details[0].type.includes('empty')) {
            return res.status(joiErrorStatus).json({ message: '빈칸을 입력해주세요.' });
        }

        if (joiErredKey === 'name') {
            return res.status(joiErrorStatus).json({ message: '이름의 형식이 일치하지 않습니다.' });
        }
        if (joiErredKey === 'nickname') {
            return res
                .status(joiErrorStatus)
                .json({ message: '닉네임의 형식이 일치하지 않습니다.' });
        }
        if (joiErredKey === 'email') {
            return res
                .status(joiErrorStatus)
                .json({ message: '이메일의 형식이 일치하지 않습니다.' });
        }
        if (joiErredKey === 'password') {
            return res
                .status(joiErrorStatus)
                .json({ message: '비밀번호의 형식이 일치하지 않습니다.' });
        }
        if (joiErredKey === 'passwordCheck') {
            return res.status(joiErrorStatus).json({ message: '비밀번호가 일치하지 않습니다.' });
        }
        if (joiErredKey === 'phone') {
            return res
                .status(joiErrorStatus)
                .json({ message: '휴대폰 번호의 형식이 일치하지 않습니다.' });
        }
    }

    /* 회원가입 */
    if (req.route.path === '/register') {
        /* 이미 존재하는 회원 */
        if (err.name === 'UserAlreadyExist') {
            return res.status(err.status).json({ message: err.message });
        }
        /* else */
        return res.status(400).json({ message: '회원가입에 실패했습니다.' });
    }

    /* 로그인 */
    if (req.route.path === '/login') {
        /* 회원이 존재하지 않음 */
        if (err.name === 'UserNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
        /* 비밀번호가 일치하지 않음 */
        if (err.name === 'IncorrectPassword') {
            return res.status(err.status).json({ message: err.message });
        }
        /* else */
        return res.status(400).json({ message: '로그인에 실패했습니다.' });
    }

    /* 로그아웃 */
    if (req.route.path === '/logout') {
        return res
            .status(400)
            .json({ message: '로그아웃에 실패했습니다. 관리자에게 문의하여주십시오.' });
    }
};
