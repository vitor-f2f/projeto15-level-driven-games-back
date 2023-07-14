import bcrypt from "bcrypt";
import { db } from "../db.js";
import { v4 as uuid } from "uuid";
import { signupSchema, signinSchema } from "../schemas.js";

export const signUp = async (req, res) => {
    let signupInfo = req.body;
    const { error } = signupSchema.validate(signupInfo, {
        abortEarly: false,
    });
    if (error) {
        return res.status(422).send("Erro de validação do usuario");
    }
    try {
        const nameExists = await db
            .collection("users")
            .findOne({ name: signupInfo.name });

        if (nameExists) {
            return res.status(409).send("Usuario ja existe");
        }

        const emailUsed = await db
            .collection("users")
            .findOne({ email: signupInfo.email });

        if (emailUsed) {
            return res.status(409).send("Email está em uso");
        }

        const password = await bcrypt.hash(signupInfo.password, 10);

        const signupObj = {
            name: signupInfo.name,
            email: signupInfo.email,
            password: password,
            balance: 0,
        };

        await db.collection("users").insertOne(signupObj);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send("Erro na tentativa de cadastro");
    }
};

export const signIn = async (req, res) => {
    let signinInfo = req.body;
    const { error } = signinSchema.validate(signinInfo, {
        abortEarly: false,
    });
    if (error) {
        return res.status(422).send("Erro de validação do usuario");
    }
    try {
        const user = await db.collection("users").findOne({
            email: signinInfo.email,
        });
        if (!user) {
            return res.status(404).send("Email não registrado");
        }

        const passwordCheck = await bcrypt.compare(
            signinInfo.password,
            user.password
        );

        if (passwordCheck) {
            const token = uuid();
            await db
                .collection("sessions")
                .insertOne({ userId: user._id, created: Date.now(), token });
            const response = {
                name: user.name,
                token: token,
            };
            res.status(200).send(response);
        } else {
            return res.status(401).send("Senha incorreta");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erro na tentativa de login");
    }
};
