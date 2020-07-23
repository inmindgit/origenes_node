module.exports = {
  index(req, res) {
    return res.render('home/index', {
      title: 'Home',
      currentUser: req.user
    });
  }
}