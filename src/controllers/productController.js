import { db } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const games = await db.collection("games").find().toArray();
    res.status(200).send(games);
  } catch (err) {
    res.status(500).send(err.message);
    
  }
};
