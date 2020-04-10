const Serija = require("../models/serija");
const vratiSveSerije = async (req, res, next) => {
  const Serije = await Serija.find({});
  res.status(200);
  res.send({ serije: Serije });
};

const vratiSerijuPoNazivu = async (req, res, next) => {
  const { id } = req.params;
  const serija = Serija.findById(id);
  res.status(200).send({ serija });
};

const vratiOpisSerije = async (req, res, next) => {
  let id = req.params.id;
  let reply;
  const serija = await Serija.findById(id);
  const plot = serija.plot;

  reply = {
    status: "found",
    title: serija.title,
    plot: plot,
  };
  res.status(200).send(reply);
};

const vratiEpizodeSerije = async (req, res, next) => {
  let id = req.params.id;
  let reply;
  const serija = await Serija.findById(id);
  const episodes = serija.episodes;

  reply = {
    status: "found",
    title: serija.title,
    episodes: episodes,
  };
  res.status(200).send(reply);
};
const dodajSeriju = async (req, res, next) => {
  const serija = {
    name: req.body.name,
    plot: req.body.plot,
    episodes: req.body.episodes,
  };
  const tvshow = new Serija(serija);
  const save = await tvshow.save();
  res.status(201).send({ message: "Serija je sacuvana", serija: save });
};
const izbrisiSeriju = async (req, res, next) => {
  const { id } = req.params;
  await Serija.findByIdAndDelete(id);
  res.status(200).send({ msg: "Serija je izbrisana" });
};
const azurirajSeriju = async (req, res, next) => {
  const { id } = req.params;
  const update = req.body;
  await Serija.findByIdAndUpdate(id, update);
  res.status(200).send({ msg: "Serija je azurirana" });
};

module.exports = {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
  dodajSeriju,
  izbrisiSeriju,
  azurirajSeriju,
};
