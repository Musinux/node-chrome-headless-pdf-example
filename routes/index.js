var express = require('express');
const { route } = require('./users');
var router = express.Router();
const renderPDF = require('chrome-headless-render-pdf')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/pdf/generate', (req, res, next) => {

  res.render('pdf-generator', {
    title: 'pouet',
    user: {
      name: 'louis',
      birthdate: '01/01/1970 00:00'
    }
  })
})

router.get('/api/pdf/render', async (req, res, next) => {
  const buffer = await renderPDF.generatePdfBuffer("http://localhost:3001/api/pdf/generate")

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="pouet.pdf"`)
  res.write(buffer)
  res.end()
})

module.exports = router;
