from flask import Flask, render_template
from flask_socketio import emit, SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def hello():
    return render_template("index.html")


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('my event')
def handle_my_custom_event(event):
    print('received json: ' + str(event))
    print('data: ' + event['data'])
    event['reply'] = 'sss'
    emit('my event', event, json=True , broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
