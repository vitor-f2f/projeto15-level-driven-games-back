import { db } from "../db.js";
import { ObjectId } from "mongodb";

export const addProduct = async (req, res) => {
  try {
    const { session } = res.locals;
    const { productId } = req.body;
    

    const userId = session.userId;
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).send("Usuário não foi encontrado");
    }

    if (user.cart.includes(productId)) {
      return res.status(400).send("Produto já está selecionado");
    }
    
    user.cart.push(productId);
    await db.collection('users').updateOne({ _id: new ObjectId(userId) },{$set:user});

    res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    return res
      .status(500)
      .send("Erro ao adicionar produto ao carrinho:", error);
  }
};

export const removeProduct = async (req, res) => {
  try {
    //const {autor}
    const { session } = res.locals;
    const { productId } = req.body;

    const userId = session.userId;
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).send("Usuário não foi encontrado");
    }

    if (!user.cart.includes(productId)) {
      return res.status(400).send("Produto não está no carrinho");
    }

    user.cart = user.cart.filter((id) => id !== productId);

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    return res.status(500).send("Erro ao remover produto do carrinho:", error);
  }
};

export const getCart = async (req, res) => {
  try {
    const { session } = res.locals;

    const userId = session.userId;
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).send("Usuário não foi encontrado");
    }

    const cart = user.cart;

    return res.status(200).json({
      success: true,
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao obter carrinho de compras");
  }
};
