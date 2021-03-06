import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

const url = liane.server;

const socket = io(url);

const client = feathers();
client.configure(hooks());
client.configure(socketio(socket));
client.configure(authentication({
  storage: localStorage
}));

export default client;
