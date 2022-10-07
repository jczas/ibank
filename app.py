from gevent import monkey

monkey.patch_all()

from flask import Flask, render_template, g, request, jsonify
from flask_socketio import emit, SocketIO

import database_utils as db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def hello():
    return render_template("index.html")


@app.route('/ping')
def ping():
    print("Remote addr: " + request.remote_addr)
    return 'ok'


@app.route('/idea/add', methods=['POST'])
def add_idea():
    idea_data = request.json
    print(idea_data)
    to_return = jsonify(id=db.add_idea(idea_data['nick'], idea_data['subject'], idea_data['body'], g))
    socketio.emit('update_ideas', db.get_ideas(g), json=True, broadcast=True)
    return to_return


@app.route('/idea/like/<idea_id>', methods=['POST'])
def like_idea(idea_id):
    return jsonify(id=db.add_like_to_idea(idea_id, g))


@app.route('/idea/all')
def get_all_idead():
    return db.get_ideas(g)


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('all ideas')
def handle_my_custom_event(event):
    print('received json: ' + str(event))
    socketio.emit('all ideas', db.get_ideas(g), json=True, broadcast=True)


@app.teardown_appcontext
def closeDatabaseConnection(exception):
    db.close_connection(exception, g)


if __name__ == '__main__':
    socketio.run(app)
db.init_db(app, g)
