from flask import Flask, render_template, g, request
from flask_socketio import emit, SocketIO

import database_utils as db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def hello():
    return render_template("index.html")


@app.route('/idea/add', methods=['POST'])
def add_idea():
    idea_data = request.json
    print(idea_data)
    db.add_idea(idea_data['nick'], idea_data['subject'], idea_data['body'], g)
    return idea_data


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('all ideas')
def handle_my_custom_event(event):
    print('received json: ' + str(event))
    print('data: ' + event['data'])
    event['reply'] = 'sss'
    emit('all ideas', db.get_ideas(g), json=True, broadcast=True)


@app.teardown_appcontext
def closeDatabaseConnection(exception):
    db.close_connection(exception, g)


if __name__ == '__main__':
    socketio.run(app)
db.init_db(app, g)
