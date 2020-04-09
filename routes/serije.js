const express = require("express");
const router = express.Router();

const Serije = require("../controllers/serije");

const {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
  dodajSeriju,
  izbrisiSeriju,
  azurirajSeriju,
} = Serije;

router.route("/").get(vratiSveSerije).post(dodajSeriju);
router
  .route("/:id")
  .get(vratiSerijuPoNazivu)
  .delete(izbrisiSeriju)
  .patch(azurirajSeriju);
router.get("/:id/opis", vratiOpisSerije);
router.get("/:id/epizode", vratiEpizodeSerije);

module.exports = router;
