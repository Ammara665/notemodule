// import * as SQLite from 'expo-sqlite';

// // open database (sync)
// const db = SQLite.openDatabaseSync('notes.db');

// export const testSQLite = async () => {
//   try {
//     // 1️⃣ Create table
//     await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS test_table (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT
//       );
//     `);
//     console.log('✅ Table created');

//     // 2️⃣ Insert data
//     await db.execAsync(
//       `INSERT INTO test_table (name) VALUES ('Expo SQLite Works');`
//     );
//     console.log('✅ Data inserted');

//     // 3️⃣ Read data
//     const result = await db.getAllAsync(
//       'SELECT * FROM test_table;'
//     );

//     console.log('📦 SQLite data:', result);
//   } catch (error) {
//     console.log('❌ SQLite error:', error);
//   }
// };

// export default db;


import * as SQLite from 'expo-sqlite';

// Open database (sync)
const db = SQLite.openDatabaseSync('notes.db');

/**
 * 1️⃣ Initialize Database
 */
export const initDB = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        imageUri TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
    `);
    console.log('✅ Notes table ready');
  } catch (error) {
    console.log('❌ DB init error:', error);
  }
};

/**
 * 2️⃣ Create Note
 */
export const createNote = async ({ title, content, imageUri }) => {
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO notes (title, content, imageUri, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?);`,
    [title, content, imageUri || null, now, now]
  );
};

/**
 * 3️⃣ Get All Notes
 */
export const getAllNotes = async () => {
  const notes = await db.getAllAsync(
    'SELECT * FROM notes ORDER BY createdAt DESC;'
  );
  return notes;
};

/**
 * 4️⃣ Update Note
 */
export const updateNote = async (id, { title, content, imageUri }) => {
  const now = new Date().toISOString();

  await db.runAsync(
    `UPDATE notes
     SET title = ?, content = ?, imageUri = ?, updatedAt = ?
     WHERE id = ?;`,
    [title, content, imageUri || null, now, id]
  );
};

/**
 * 5️⃣ Delete Note
 */
export const deleteNote = async (id) => {
  await db.runAsync(
    'DELETE FROM notes WHERE id = ?;',
    [id]
  );
};

export default db;
