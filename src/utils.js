import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

const sendMail = email => {
    const options = {
        auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "hoos31320@gmail.com",
        to: address,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello Your login secret is <strong>${secret}</strong><br/>Copy paste on the app/website to login`
    };
    return sendMail(email);
}

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET)