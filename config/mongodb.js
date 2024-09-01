const {MongoClient} = require('mongodb');
const url = 'mongodb://admin_1:admin123@localhost:27017?authSource=latihan';
const client = new MongoClient(url);

let db;

(async () => {
    try{
        await client.connect();
        console.log('berhasil menyambungkan ke databse mongo');
        db = client.db('latihan');
    }catch(e){
        console.log(e);
    }
})();

async function getUsers() {
    try {
        const usersCollection = db.collection('users');
        const users = await usersCollection.find({}).toArray();
        return users;
    } catch (e) {
        console.log('Error mengambil data users:', e);
        return null;
    }
}

module.exports = { getUsers };