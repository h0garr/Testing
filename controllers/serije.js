const Serija = require("../models/serija");
const vratiSveSerije = async (req, res, next) => {
  const Serije = await Serija.find({});
  res.status(200);
  res.send({ serije: Serije });
};

const vratiSerijuPoNazivu = async (req, res, next) => {
  const { naziv } = req.params;
  const serija = Serija.filter((serija) =>
    new RegExp(naziv, "i").exec(serija.name)
  );
  if (serija.length === 0) {
    res.status(200).send({ err: "Doslo je do greske" });
  } else {
    res.status(200).send({ serija });
  }
};

const vratiOpisSerije = async (req, res, next) => {
  let naziv = req.params.naziv;
  let reply;
  for (let i = 0; i < Serija.length; i++) {
    let obj = Serija[i];
    console.log(obj.name, naziv);
    if (obj.name === naziv) {
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

const vratiEpizodeSerije = async (req, res, next) => {
  let naziv = req.params.naziv;
  let reply;
  for (let i = 0; i < Serija.length; i++) {
    let obj = Serija[i];
    console.log(obj.name, naziv);
    if (obj.name === naziv) {
      reply = {
        status: "found",
        title: naziv,
        episodes: obj.episodes,
      };
      break;
    } else {
      reply = { status: "not found" };
    }
  }
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
