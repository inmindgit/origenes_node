module.exports = {
  async searchCoincidencia(req, res) {
    const { 
      number
    } = req.body;

    // enviar el numero al BC para encontrar coincidencias
    // const muestras = await BCService.findMuestrasWhere(number: number);
    
    return res.render('coincidencias/search', {
      title: 'Buscar coincidencias',
      currentUser: req.user
    });
  }
}