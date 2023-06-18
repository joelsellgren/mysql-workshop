import mysql from 'mysql'

const getDb = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'artists_and_albums'
    })

    connection.connect()

    return connection;
}

const dbQueryCallback = (resolve, reject, single = false) => (err, result) => {
    if (err) {
        reject(err)
    }

    if(single && result.length > 0) {
        result = result[0]
    }
    else if(single && result.length === 0) {
        result = null
    }

    resolve(result)
}

export const getArtists = async () => {
    const db = getDb()

    const artists = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM artists', dbQueryCallback(resolve, reject));
    });

    return artists
}

export const getArtistById = async (artistId) => {
    const db = getDb();
  
    const artist = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM artists WHERE artist_id = ?', artistId, dbQueryCallback(resolve, reject, true));
    });
  
    return artist;
  };

export const createArtist = async (artist) => {
    const db = getDb();
  
    const newArtist = await new Promise((resolve, reject) => {
      db.query('INSERT INTO artists SET ?', artist, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  
    return newArtist;
  };

  export const updateArtist = async (artistId, updatedArtist) => {
    const db = getDb();
  
    const result = await new Promise((resolve, reject) => {
      db.query('UPDATE artists SET ? WHERE artist_id = ?', [updatedArtist, artistId], dbQueryCallback(resolve, reject));
    });
  
    return result.affectedRows > 0;
  };

  export const deleteArtist = async (artistId) => {
    const db = getDb();
  
    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM artists WHERE artist_id = ?', artistId, dbQueryCallback(resolve, reject));
    });
  
    return result.affectedRows > 0;
  };