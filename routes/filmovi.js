const express = require('express')
const router = express.Router()

const Filmovi = require('../controllers/filmovi')

const { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma, vratiPosterFilma} = Filmovi

router.get('/', vratiSveFilmove)
router.get('/:naziv', vratiFilmovePoNazivu)
router.get('/:naziv/opis', vratiOpisFilma)
router.get('/:naziv/posteri', vratiPosterFilma)


module.exports = router
