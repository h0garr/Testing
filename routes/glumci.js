const express = require("express");
const router = express.Router();

const Glumci = require("../controllers/glumci");

const {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca,
  dodajGlumca,
  izbrisiGlumca,
  azurirajGlumca,
} = Glumci;

router.route("/").get(vratiSveGlumce).post(dodajGlumca);
router
  .route("/:id")
  .get(vratiGlumcaPoImenuIPrezimenu)
  .delete(izbrisiGlumca)
  .patch(azurirajGlumca);
router.get("/:id/nagrade", vratiNagradeGlumca);
router.get("/:id/filmoviglumaca", vratiFilmoveGlumca);

module.exports = router;
