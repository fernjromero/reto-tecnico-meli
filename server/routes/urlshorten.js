const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");


module.exports = app => {
  //GET API para redireccionar a URL original
  app.get("/api/item/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res
        .status(404)
        .json(
          "El urlCode es inválido o no existe"
        );
    }
  });


  //POST API para crear la url corta en base a la original
  app.post("/api/item", async (req, res) => {
    const { originalUrl, shortBaseUrl } = req.body;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + "/" + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res
        .status(401)
        .json(
          "Invalid Original Url"
        );
    }
  });



  //GET API para eliminar códigos de la BD
  app.get("/api/item/remove/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      await item.deleteOne({urlCode: urlCode});
      return res
        .status(200)
        .json(
          "El documento con urlCode " + urlCode + " fue eliminado con éxito"
        );
    } else {
      return res
        .status(404)
        .json(
          "El urlCode no existe"
        );
    }
  });
};