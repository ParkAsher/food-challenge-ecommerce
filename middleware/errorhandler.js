module.exports = (err, req, res, next) => {

  if (req.route.path === '/register') {
    /* 이미 존재하는 회원 */
    if (err.name === 'NotFoundItem') {
        return res.status(err.status).json({ message: err.message });
    }
    /* else */
    return res.status(400).json({ message: 'Bad Request' });
}
};
