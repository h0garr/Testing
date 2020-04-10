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
        film = Film.sort((a, b) => sortFilmove(a, b, "year"));
        res.status(200).send({ film });
      }
      if (sort === "rating") {
        film = Film.sort((a, b) => sortFilmove(a, b, "rating"));
        res.status(200).send({ film });
      }
      break;
    case "desc":
      if (sort === "godina") {
        film = Film.sort((a, b) => sortFilmove(a, b, "year")).reverse();
        res.status(200).send({ film });
      }
      if (sort === "rating") {
        film = Film.sort((a, b) => sortFilmove(a, b, "rating")).reverse();
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
  const { id } = req.params;
  const film = Film.filter((film) => new RegExp(id, "i").exec(film.title));
  if (film.length === 0) {
    res.status(200).send({ err: "Doslo je do greske" });
  } else {
    res.status(200).send({ film });
  }
};

const vratiOpisFilma = async (req, res, next) => {
  let id = req.params.id;
  let reply;
  for (let i = 0; i < Film.length; i++) {
    let obj = Film.find(i);
    console.log(obj.id, id);
    if (obj.findById(id)) {
      reply = {
        status: "found",
        title: obj.title,
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
