module.exports = {
  checkSession(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect('/users/signIn');
    }
    return next();
  }
};
