const crypto= require('crypto');
require("dotenv/config");
const jsonwebtoken = require('jsonwebtoken');

class cryptPassword{
    static issueToken(user){
        const PRIV_KEY = process.env.PRIV_KEY
        const _id = user._id;
        const expiresIn = '10h';
        
        const payload = {
          sub: _id,
          iat: Date.now()
        };
        const signedToken = jsonwebtoken.sign(payload, PRIV_KEY,{ expiresIn: expiresIn, algorithm: 'RS256' });
        return {
          token: signedToken,
          expires: expiresIn
        }
    }

    static genHashPassword(password){
        let salt= crypto.randomBytes(32).toString('hex');
        let genPassword=crypto.pbkdf2Sync(password,salt,10000,64,'sha512');
        return {
            salt,
            genPassword
        }
    }
    static isValidPassword(password,salt,hash){
        let checkVerify= crypto.pbkdf2Sync(password,salt,10000,64,'sha512');
        return hash==checkVerify
    }
    static generateAsymetricKey(){
        const keyPair=crypto.generateKeyPairSync('rsa',{
            modulusLength: 4096, // bits - standard for RSA keys
            publicKeyEncoding: {
                type: 'pkcs1', // "Public Key Cryptography Standards 1" 
                format: 'pem' // Most common formatting choice
            },
            privateKeyEncoding: {
                type: 'pkcs1', // "Public Key Cryptography Standards 1"
                format: 'pem' // Most common formatting choice
            }
        })
    }
}

module.exports= cryptPassword;