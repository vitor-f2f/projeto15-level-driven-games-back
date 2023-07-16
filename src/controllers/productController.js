import { ObjectId } from "mongodb";
import { db } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const games = await db.collection("games").find().toArray();
    res.status(200).send(games);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getGame = async (req, res) => {
  try {
    const param = req.params;
    param = param.replace(":", "");

    const game = await db
      .collection("games")
      .findOne({ _id: new ObjectId(param) });
    if (!game) return res.status(404).send("Jogo não encontrado!");
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
