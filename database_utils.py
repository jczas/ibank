import sqlite3

database = './database.db'


def get_ideas(g):
    conn = get_db(g)
    ideas = conn.execute('SELECT * FROM idea').fetchall()
    conn.close()
    return ideas


def add_idea(nick, subject, body, g):
    conn = get_db(g)
    conn.execute('INSERT INTO idea (nick,subject, body, likes, live_duration) VALUES (?,?,?,?,?)',
                 (nick, subject, body, 1, 60))
    conn.commit()
    conn.close()


def close_connection(exception, g):
    print("Closing the connection to the database...")
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def get_db(g):
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(database)
    return db


def init_db(applicationContext, g):
    print("Initializing db...")
    with applicationContext.app_context():
        db = get_db(g)
        with applicationContext.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
