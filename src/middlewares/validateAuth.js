import { db } from "../db.js";

export const validateAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.status(401).send("Token não enviado");

    const session = await db.collection("sessions").findOne({ token: token });
    if (!session) {
      return res.status(401).send("Token inválido");
    }

    res.locals.session = session;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
