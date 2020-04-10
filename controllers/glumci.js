const Joi = require("joi");
const Glumac = require("../models/glumac");
const vratiSveGlumce = async (req, res, next) => {
  const Glumci = await Glumac.find({});
  res.status(200);
  res.send({ glumci: Glumci });
};

const vratiGlumcaPoImenuIPrezimenu = async (req, res, next) => {
  const { imePrezime } = req.params;
  const glumac = Glumac.filter((glumac) =>
    new RegExp(imePrezime, "i").exec(glumac.name)
  );
  if (glumac.length === 0) {
    res.status(200).send({ err: "Doslo je do greske" });
  } else {
    res.status(200).send({ glumac });
  }
};

const vratiNagradeGlumca = async (req, res, next) => {
  let imePrezime = req.params.imePrezime;
  let reply;
  for (let i = 0; i < Glumac.length; i++) {
    let obj = Glumac[i];
    console.log(obj.name, imePrezime);
    if (obj.name === imePrezime) {
      reply = {
        status: "found",
        name: imePrezime,
        awards: obj.awards,
      };
      break;
    } else {
      reply = { status: "not found" };
    }
  }
  res.status(200).send(reply);
};

const vratiFilmoveGlumca = async (req, res, next) => {
  let imePrezime = req.params.imePrezime;
  let reply;
  for (let i = 0; i < Glumac.length; i++) {
    let obj = Glumac[i];
    console.log(obj.name, imePrezime);
    if (obj.name === imePrezime) {
      reply = {
        status: "found",
        name: imePrezime,
        movies: obj.movies,
      };
      break;
    } else {
      reply = { status: "not found" };
    }
  }
  res.status(200).send(reply);
};
const dodajGlumca = async (req, res, next) => {
  const glumac = {
    name: req.body.name,
    age: req.body.age,
    rating: req.body.rating,
    movies: req.body.movies,
    awards: req.body.awards,
  };
  const actor = new Glumac(glumac);
  const save = await actor.save();
  res.status(201).send({ message: "Glumac je sacuvan", glumac: save });
};
const izbrisiGlumca = async (req, res, next) => {
  const { id } = req.params;
  await Glumac.findByIdAndDelete(id);
  res.status(200).send({ msg: "glumac je izbrisan" });
};
const azurirajGlumca = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  await Glumac.findByIdAndUpdate(id, update);
  res.status(200).send({ msg: "Glumac je azuriran" });
};

module.exports = {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca,
  dodajGlumca,
  izbrisiGlumca,
  azurirajGlumca,
};
