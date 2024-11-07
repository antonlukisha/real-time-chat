const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 8000; //server port

const app = express();
app.use(cors());
app.use(bodyParser.json()); //parser of requrst with json-body 


          /* MONGODB CONNECTION */
mongoose.connect('mongodb://localhost:27017/chat')
.then(() => {
  console.log('connected to mongodb');
})
.catch((error) => {
  console.error(error);
});


          /* USER DB MODEL */
const userSchema = new mongoose.Schema({
  username: String,
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
});

const User = mongoose.model('User', userSchema);



          /* MESSAGE DB MODEL */
const messageSchema = new mongoose.Schema({
  username: String,
  timestamp: String,
  content: String,
});

const Message = mongoose.model('Message', messageSchema);



          /* CHANNEL DB CHANNEL */
const channelSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

const Channel = mongoose.model('Channel', channelSchema);



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend origin
    methods: ["GET", "POST"] // availeable commands
  }
});


          /* PROCESSING OF CLIENT CONNECTIONS */
io.on('connection', (socket) => {

  console.log('connection of new client:', socket.id);

          /* SEND MESSAGE */

  socket.on('send-message', async (request) => {
    const { content, channel_name, username  } = request;
    let user = await User.findOne({ username: username });
    let channel = await Channel.findOne({ name: channel_name });
    const newMessage = new Message({ // create object of message
      content: content,
      timestamp: new Date(Date.now()).toISOString(), // convert date to string
      username: username,
    });
    await newMessage.save().then(() => console.log('save new message'));
    const updated_channel = await Channel.findById(channel);
    if (updated_channel) {
      updated_channel.messages.push(newMessage._id); // add new message to channel
      await updated_channel.save().then(() => console.log('channel changes saved'));
      const response = { // get transmission format of message object
        content: content,
        timestamp: newMessage.timestamp,
        username: username,
      };
      io.to(channel_name).emit('receive-message', response);
    }
  });
  
          /* GET MESSAGES */

  socket.on('get-messages', async (channel_name) => {
    let channel = await Channel.findOne({ name: channel_name }).populate('messages');  //get channel and populate messages for usage
    if (channel) {
      const messages_response = channel.messages.map(message => ({  // get transmission format of messages object
        content: message.content,
        timestamp: message.timestamp,
        username: message.username,
      }));
      io.to(channel_name).emit('update-message', messages_response);
    }
  });
  
          /* JOIN CHANNEL */

  socket.on('join-channel', async ({ channel_name, username }) => {
    let user = await User.findOne({ username: username });
    let channel = await Channel.findOne({ name: channel_name }).populate('messages'); //get channel and populate messages for usage
    
    if (!channel) {
      channel = new Channel({ name: channel_name });  // create object of channel
      await channel.save().then(() => console.log('channel saved'));
    }

    if (!user) {
      user = new User({ username: username, channel: channel._id }); // create object of user
      await user.save().then(() => console.log('user saved'));
    } else {
      const old_сhannel = await Channel.findById(user.channel);
      if (old_сhannel) {
        old_сhannel.members.pull(user._id); // if some channel has as a member our user then delete from membership of this channel
        await old_сhannel.save().then(() => console.log('old channel saved'));
      }
      user.channel = channel._id; // if use found add to new chat
      await user.save().then(() => console.log('user saved'));
    }

    channel.members.push(user._id); // push new user to channel
    await channel.save().then(() => console.log('channel saved'));

    socket.join(channel_name); //join socket to room 'channel_name'

    const messages_response = channel.messages.map(message => ({ // get transmission format of messages object
      content: message.content,
      timestamp: message.timestamp,
      username: message.username,  
    }));

    let channel_new = await Channel.findOne({ name: channel_name }).populate('members'); //get channel again and populate members for usage
    
    const members_response = channel_new.members.map(member => ({ // get transmission format of members object
      username: member.username,
    }));

    io.to(channel_name).emit('join-user', { username: username });
    io.to(channel_name).emit('update-members', members_response);
    io.to(channel_name).emit('update-message', messages_response);
  });

          /* DISCONNECT CLIENT */

  socket.on('disconnect', async ({ username }) => {
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return console.log('user not found');
      }

      let channel = await Channel.findById(user.channel);
      if (channel) {
        channel.members.pull(user._id);
        await channel.save().then(() => console.log('user removed from channel'));

        socket.leave(channel.name); // user leave channel

        const members = await User.find({ channel: channel._id }).populate('username');
        const members_response = members.map(member => ({ // get transmission format of member object
          username: member.username,
        }));
        io.to(channel.name).emit('update-members', members_response);
      }

      await User.findByIdAndDelete(user._id).then(() => console.log('user deleted')); // delete user from db
      
    } catch (error) {
      console.error(error);
    }
    });
});


          /* LISTEN CLIENT CONNECTION REQUESTS ON PORT 8000 */
server.listen(port, () => {
  console.log(`server run on port: ${port}`);
});
