const sviGlumci = require("../data/glumci.json");
const Glumac = require("../models/glumac");
const vratiSveGlumce = async (req, res, next) => {
  const Glumci = await Glumac.find({});
  res.status(200);
  res.send({ glumci: Glumci });
};

const vratiGlumcaPoImenuIPrezimenu = async (req, res, next) => {
  const { imePrezime } = req.params;
  const glumac = sviGlumci.filter((glumac) =>
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
  for (let i = 0; i < sviGlumci.length; i++) {
    let obj = sviGlumci[i];
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
  for (let i = 0; i < sviGlumci.length; i++) {
    let obj = sviGlumci[i];
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

module.exports = {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca,
};
