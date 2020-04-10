const express = require("express");
const router = express.Router();
const { validacija } = require("../middlewares/validation/validation");
const Glumci = require("../controllers/glumci");
const {
  dodajGlumcaSchema,
  izmeniGlumcaSchema,
} = require("../middlewares/validation/schemas/glumci");
const {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca,
  dodajGlumca,
  izbrisiGlumca,
  azurirajGlumca,
} = Glumci;

router
  .route("/")
  .get(vratiSveGlumce)
  .post(validacija(dodajGlumcaSchema), dodajGlumca);
router
  .route("/:id")
  .get(vratiGlumcaPoImenuIPrezimenu)
  .put(validacija(dodajGlumcaSchema), azurirajGlumca)
  .delete(izbrisiGlumca)
  .patch(validacija(izmeniGlumcaSchema), azurirajGlumca);
router.get("/:id/nagrade", vratiNagradeGlumca);
router.get("/:id/filmovi", vratiFilmoveGlumca);

module.exports = router;
