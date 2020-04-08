const sviFilmovi = require("../data/filmovi.json");
const Joi = require("joi");
const Film = require("../models/film");
const sortFilmove = (a, b, value) => {
  if (a[value] < b[value]) {
    return -1;
  }
  if (a[value] > b[value]) {
    return 1;
  }
  return 0;
};
const vratiSveFilmove = async (req, res, next) => {
  let sort = req.query.sort;
  let order = req.query.order;
  switch (order) {
    case "asc":
      if (sort === "godina") {
        film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "year"));
        res.status(200).send({ film });
      }
      if (sort === "rating") {
        film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "rating"));
        res.status(200).send({ film });
      }
      break;
    case "desc":
      if (sort === "godina") {
        film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "year")).reverse();
        res.status(200).send({ film });
      }
      if (sort === "rating") {
        film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "rating")).reverse();
        res.status(200).send({ film });
      }
      break;
    default:
      break;
  }
  const Filmovi = await Film.find({});
  res.status(200);
  res.send({ filmovi: Filmovi });
};

const vratiFilmovePoNazivu = async (req, res, next) => {
  const { naziv } = req.params;
  const film = sviFilmovi.filter((film) =>
    new RegExp(naziv, "i").exec(film.title)
  );
  if (film.length === 0) {
    res.status(200).send({ err: "Doslo je do greske" });
  } else {
    res.status(200).send({ film });
  }
};

const vratiOpisFilma = async (req, res, next) => {
  let naziv = req.params.naziv;
  let reply;
  for (let i = 0; i < sviFilmovi.length; i++) {
    let obj = sviFilmovi[i];
    console.log(obj.title, naziv);
    if (obj.title === naziv) {
      reply = {
        status: "found",
        title: naziv,
        desc: obj.plot,
      };
      break;
    } else {
      reply = { status: "not found" };
    }
  }
  res.status(200).send(reply);
};

const dodajFilm = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    plot: Joi.string().required(),
    year: Joi.number().required(),
    rating: Joi.number().required(),
  });
  console.log(req.body);
  const result = schema.validate(req.body);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const film = {
    title: req.body.title,
    plot: req.body.plot,
    rating: req.body.rating,
    year: req.body.year,
  };
  const movie = new Film(film);
  const save = await movie.save();
  res.status(201).send({ message: "Film je sacuvan", film: save });
};
const izbrisiFilm = async (req, res, next) => {
  const { id } = req.params;
  await Film.findByIdAndDelete(id);
  res.status(200).send({ msg: "Film je izbrisan" });
};
const azurirajFilm = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  await Film.findByIdAndUpdate(id, update);
  res.status(200).send({ msg: "Film je azuriran" });
};

module.exports = {
  vratiSveFilmove,
  vratiFilmovePoNazivu,
  vratiOpisFilma,
  dodajFilm,
  izbrisiFilm,
  azurirajFilm,
};
