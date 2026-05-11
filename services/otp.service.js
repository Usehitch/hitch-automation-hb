import crypto from 'crypto';

export class OTPService {
    constructor(secret) {
        this.secret = secret;
    };
    generateOTP() {
        if (!this.secret) throw new Error('OTP secret missing');
        const timeStep = 30;
        const counter = Math.floor(Date.now() / 1000 / timeStep);

        return this.hotp(this.base32ToBuffer(this.secret), counter);
    };
    hotp(key, counter) {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt32BE(0, 0);
        buffer.writeUInt32BE(counter, 4);

        const hmac = crypto.createHmac('sha1', key).update(buffer).digest();

        const offset = hmac[hmac.length - 1] & 0xf;
        const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1e6;

        return code.toString().padStart(6, '0');
    };
    base32ToBuffer(base32) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let bits = '';

        for (const char of base32.replace(/=+$/, '')) {
            const val = alphabet.indexOf(char.toUpperCase());
            bits += val.toString(2).padStart(5, '0');
        };
        const bytes = [];
        for (let i = 0; i + 8 <= bits.length; i += 8) {
            bytes.push(parseInt(bits.slice(i, i + 8), 2));
        };
        return Buffer.from(bytes);
    };
};