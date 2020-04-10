const Joi = require("joi");
const Glumac = require("../models/glumac");
const vratiSveGlumce = async (req, res, next) => {
  const Glumci = await Glumac.find({});
  res.status(200);
  res.send({ glumci: Glumci });
};

const vratiGlumcaPoImenuIPrezimenu = async (req, res, next) => {
  const { id } = req.params;
  const glumac = Glumac.findById(id);
  res.status(200).send({ glumac });
};

const vratiNagradeGlumca = async (req, res, next) => {
  let id = req.params.id;
  let reply;
  const glumac = await Glumac.findById(id);
  const awards = glumac.awards;

  reply = {
    status: "found",
    name: glumac.name,
    awards: awards,
  };
  res.status(200).send(reply);
};

const vratiFilmoveGlumca = async (req, res, next) => {
  let id = req.params.id;
  let reply;
  const glumac = await Glumac.findById(id);
  const movies = glumac.movies;

  reply = {
    status: "found",
    name: glumac.name,
    movies: movies,
  };
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
