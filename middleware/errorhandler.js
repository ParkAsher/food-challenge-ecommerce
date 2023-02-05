module.exports = (err, req, res, next) => {
    console.log('Error Handling Middleware');
    console.log(err);
    console.log(req.path);
    console.log(req.route.path);

    /* token error */
    if (err.name === 'TokenNotFound') {
        return res.render('alert.ejs', { message: err.message, href: '/login' });
    }

    /* 관리자가 아님 */
    if (err.name === 'NotAdmin') {
        return res.render('alert.ejs', { message: err.message, href: '/' });
    }

    /* 이미 로그인 된 회원 */
    if (err.name === 'UserAlreadyLogined') {
        return res.render('alert.ejs', { message: err.message, href: '/' });
    }

    /* Joi Validation Error */
    if (err.isJoi) {
        const joiErredKey = err.details[0].context.key;
        const joiErrorStatus = 412;

        /* 빈칸 */
        if (err.details[0].type.includes('empty')) {
            return res.status(joiErrorStatus).json({ message: '빈칸을 입력해주세요.' });
        }
        if (joiErredKey === 'id') {
            return res
                .status(joiErrorStatus)
                .json({ message: '회원번호의 형식이 일치하지 않습니다.' });
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
        if (joiErredKey === 'page') {
            return res
                .status(joiErrorStatus)
                .json({ message: '페이지 번호의 형식이 올바르지 않습니다.' });
        }
        if (joiErredKey === 'point') {
            return res
                .status(joiErrorStatus)
                .json({ message: '포인트의 형식이 일치하지 않습니다.' });
        }
        if (joiErredKey === 'price') {
            return res
                .status(joiErrorStatus)
                .json({ message: '가격의 형식이 일치하지 않습니다. ' });
        }
        if (joiErredKey === 'level') {
            return res
                .status(joiErrorStatus)
                .json({ message: '난이도의 형식이 일치하지 않습니다. ' });
        }
        if (joiErredKey === 'stock') {
            return res
                .status(joiErrorStatus)
                .json({ message: '수량의 형식이 일치하지 않습니다. ' });
        }
        if (joiErredKey === 'image') {
            return res
                .status(joiErrorStatus)
                .json({ message: '이미지 주소의 형식이 일치하지 않습니다. ' });
        }
    }

    /* 회원가입 */
    if (req.path === '/api/users/register') {
        /* 이미 존재하는 회원 */
        if (err.name === 'UserAlreadyExist') {
            return res.status(err.status).json({ message: err.message });
        }
        /* else */
        return res.status(400).json({ message: '회원가입에 실패했습니다.' });
    }

    /* 로그인 */
    if (req.path === '/api/users/login') {
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
    if (req.path === '/api/users/logout') {
        return res
            .status(400)
            .json({ message: '로그아웃에 실패했습니다. 관리자에게 문의하여주십시오.' });
    }

    /* 회원체크 */
    if (req.path === '/api/users/userid') {
        /* 회원이 존재하지 않음 */
        if (err.name === 'UserNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
        /* else */
        return res.status(400).json({ message: '알수없는 에러. 관리자에게 문의하여주십시오.' });
    }

    /* 비밀번호 재설정 */
    if (req.path === '/api/users/password') {
        /* else */
        return res.status(400).json({ message: '비밀번호 재설정에 실패했습니다.' });
    }

    /* 이메일 찾기 */
    if (req.path === '/api/users/email') {
        /* 회원이 존재하지 않음 */
        if (err.name === 'UserNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
        /* else */
        return res.status(400).json({ message: '알수없는 에러. 관리자에게 문의하여주십시오.' });
    }

    if (req.path.substr(0, 11) === '/api/items/') {
        if (err.name === 'NotFoundItem') {
            return res.status(err.status).json({ message: err.message });
        }
        if (err.name === 'UserNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
        if (err.name === 'TokenNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
        if (err.name === 'UserNotLogined') {
            return res.status(err.status).json({ message: err.message });
        }
    }

    /* 관리자페이지 회원관리 회원 리스트 불러오기 */
    if (req.path === '/api/admin/users') {
        return res.status(400).json({ message: '데이터를 불러올 수 없습니다.' });
    }

    /* 관리자페이지 회원관리 회원 검색 */
    if (req.route.path === '/user/:email') {
        if (err.name === 'UserNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
        return res.status(400).json({ message: '데이터를 불러올 수 없습니다.' });
    }

    /* 관리자페이지 회원 삭제 */
    if (req.path === '/api/admin/user' && req.method === 'DELETE') {
        if (err.name === 'UserNotDeleted') {
            return res.status(err.status).json({ message: err.message });
        }
        return res.status(400).json({ message: '삭제에 실패했습니다.' });
    }

    /* 관리자페이지 회원정보 수정 */
    if (req.path === '/api/admin/user' && req.method === 'PUT') {
        if (err.name === 'UserNotUpdated') {
            return res.status(err.status).json({ message: err.message });
        }
        return res.status(400).json({ message: '수정에 실패했습니다.' });
    }

    if (req.path === '/api/basket') {
        console.log(req.path);
        if (err.name === 'TokenNotFound') {
            return res.status(err.status).json({ message: err.message });
        }
    }

    /* 이미지 업로드 */
    if (req.path === '/api/admin/image') {
        return res.status(400).json({ message: '이미지 업로드에 실패했습니다.' });
    }

    /* 관리자페이지 상품관리 상품 리스트 불러오기 */
    if (req.path === '/api/admin/items') {
        return res.status(400).json({ message: '데이터를 불러올 수 없습니다.' });
    }
};
