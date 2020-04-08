const sveSerije = require("../data/serije.json");
const Serija = require("../models/serija");
const vratiSveSerije = async (req, res, next) => {
  const Serije = await Serija.find({});
  res.status(200);
  res.send({ serije: Serije });
};

const vratiSerijuPoNazivu = async (req, res, next) => {
  const { naziv } = req.params;
  const serija = sveSerije.filter((serija) =>
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
  for (let i = 0; i < sveSerije.length; i++) {
    let obj = sveSerije[i];
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
  for (let i = 0; i < sveSerije.length; i++) {
    let obj = sveSerije[i];
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

module.exports = {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
};
