const OPERATOR_ROUTES = ['/muestras/new', '/muestras/create', '/muestras/search', '/muestras/find', '/coincidencias/find'];
const LAB_ROUTES = ['/resultados/new', '/resultados/createSNP', '/resultados/createSTR']
const VIEWER_ROUTES = ['/coincidencias/find', '/coincidencias/search']

function validator(availableRoutesArray, reqOriginalUrl, res, next) {
  if(availableRoutesArray.includes(reqOriginalUrl)) {
    return next();
  } else {
    return res.redirect('/')
  }
}

module.exports = {
  authorize(req, res, next) {
    switch (req.user.role) {
      case 'Admin':
        return next();
      case 'Operator':
        validator(OPERATOR_ROUTES, req.originalUrl, res, next);
      case 'Lab':
        validator(LAB_ROUTES, req.originalUrl, res, next);
      case 'Viewer':
        validator(VIEWER_ROUTES, req.originalUrl, res, next);
      default:
        return res.redirect('/')
    }
  }
}