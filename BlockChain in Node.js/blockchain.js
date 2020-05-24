// May you do good and not evil
// May you find forgiveness for yourself and forgive others
// May you share freely, never taking more than you give.
const crypto = require('crypto');

let blockchain = [];

class BlockchainError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}

function sha256(value) {
    return crypto.createHash('sha256', '').update(`${value}`).digest("hex")
}

function proven(str) {
    const index = str.indexOf("51b7e")
    return index == 0 || index == str.length - 5;
}

function proofOfWork(previous, stepSize) {
    let next = previous + stepSize;
    let hash = sha256(next);
    while (!proven(hash)) {
        next += stepSize;
        hash = sha256(next);
    }

    return next;
}

function hashBlock(parent_hash, timestamp, data) {
    return sha256(`${parent_hash}-${timestamp}-${JSON.stringify(data)}`);
}

function appendBlock({parent_hash, timestamp, data}) {
    if (!(parent_hash && timestamp && data)) {
        throw new Error('Invalid block');
    }

    if (blockchain.length) {
        const lastBlock = blockchain[blockchain.length - 1];
        if (lastBlock.hash !== parent_hash) {
            throw new BlockchainError(`Can not append child for ${parent_hash} after ${lastBlock.parent_hash}`)
        }
    }

    blockchain.push({
        parent_hash,
        timestamp,
        data,
        hash: hashBlock(parent_hash, timestamp, data)
    });

    return true;
}

function mine(payload, stepSize) {
    while (true) {
        try {
            const lastBlock = blockchain[blockchain.length - 1];
            const proof = proofOfWork(lastBlock.data.proof, stepSize || 0.0001);
            const newBlock = {
                parent_hash: lastBlock.hash, 
                timestamp: new Date().getTime(),
                data: {
                    proof,
                    payload,
                    proof_digest: sha256(proof)
                }
            };

            appended = appendBlock(newBlock);
            return newBlock;
        } catch (e) {
            if (e instanceof BlockchainError) {
                continue;
            }

            throw e;
        }
    }
}

function boot() {
    if (blockchain.length === 0) {
        appendBlock({
            parent_hash: "~",
            timestamp: new Date().getTime(),
            data: {
                proof: 0,
                payload: []
            }
        });
    }
}

function serialize() {
    return JSON.stringify(blockchain);
}

function deserialize(val) {
    blockchain = JSON.parse(val);
}

function size() {
    return blockchain.length;
}

module.exports = {
    mine,
    boot,
    serialize,
    deserialize,
    size
};