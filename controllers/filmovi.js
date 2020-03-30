const sviFilmovi = require('../data/filmovi.json')

const vratiSveFilmove = async (req, res, next) => {
  res.status(200)
  res.send({ filmovi: sviFilmovi })
}

const vratiFilmovePoNazivu = async (req, res, next) => {
  const { naziv } = req.params
  const film = sviFilmovi.filter(film => new RegExp(naziv, 'i').exec(film.title))
  if (film.length===0){
    res.status(200).send({err:"Doslo je do greske"})
  }else{
    res.status(200).send({film})
  }
}

const vratiOpisFilma = async (req, res, next) => {
  let naziv = req.params.naziv
  let reply
  for(let i = 0; i < sviFilmovi.length; i++) {
    let obj = sviFilmovi[i];
    console.log(obj.title, naziv)
    if(obj.title===naziv){
      reply={
        "status":"found",
        "title":naziv,
        "desc":obj.plot
      }
      break
    }
    else{
      reply={"status":"not found"}
      
    }
  }
  res.status(200).send(reply)
  
  
}

module.exports = { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma }
