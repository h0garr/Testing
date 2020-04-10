const express = require("express");
const router = express.Router();
const { validacija } = require("../middlewares/validation/validation");
const Serije = require("../controllers/serije");
const {
  dodajSerijuSchema,
  izmeniSerijuSchema,
} = require("../middlewares/validation/schemas/serije");
const {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
  dodajSeriju,
  izbrisiSeriju,
  azurirajSeriju,
} = Serije;

router
  .route("/")
  .get(vratiSveSerije)
  .post(validacija(dodajSerijuSchema), dodajSeriju);
router
  .route("/:id")
  .get(vratiSerijuPoNazivu)
  .put(validacija(dodajSerijuSchema), azurirajSeriju)
  .delete(izbrisiSeriju)
  .patch(validacija(izmeniSerijuSchema), azurirajSeriju);
router.get("/:id/opis", vratiOpisSerije);
router.get("/:id/epizode", vratiEpizodeSerije);

module.exports = router;
