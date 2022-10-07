from flask import Flask, render_template, g
from flask_socketio import SocketIO
import database_utils as db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def hello():
    db.add_idea("kuba", "test", "test", g)
    return render_template("index.html")

@app.route('/test')
def test():
    return db.get_ideas(g)

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)

@socketio.on('my event')
def handle_my_custom_event(event):
    print('received json: ' + str(event))
    print('data: ' + event["data"])

@app.teardown_appcontext
def closeDatabaseConnection(exception):
    db.close_connection(exception, g)

if __name__ == '__main__':
    socketio.run(app)
db.init_db(app, g)
