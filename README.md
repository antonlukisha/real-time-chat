# Real Time Chat


[About](#dart-about) | [Description](#pencil2-description) | [Requirements](#open_file_folder-requirements) | [Bash Example](#paperclip-bash-example) | [License](#page_with_curl-license)


## :dart: About

Real-time chat is a multi-user web-application for typing messages to users who are in your messaging chanel. 

## :pencil2: Description

The project consist of two part client and server. Client realize frontend and part of business logic. More create with usage React.js framework and with inclusions of Bootstrap patterns for faster realisation of stylish view. Part of server it is asynchrone interaction with clients and mongodb.

## :open_file_folder: Requirements

1. ### :handbag: **Client**
   - Realize business logic inner frontend part via usage React.js.
   - Responsible for the transfer client data to NodeJs server.
   - Create and render visual a web-application view via usage Bootstrap.

2. ### :office: **Server**
   - Establish connection with clients.
   - Responsible for the transfer client data to NodeJs server.
   - Service each client connection.
   - Realize interaction with data base via MongoDB.

## :paperclip: Bash Example

To compile and run the server and client using the command line:

```bash
# Run the MongoDB for usage
mongod

# Run the Node.js server
node server/src/server.js

# Run the client
cd client
npm start
```

## :page_with_curl: License

   - Badges: Links have been updated to point to the GitHub repository for the frontend project.
   - Bash Example: Provides command examples for compiling and running the client and server programs.
   - Code: Example of client and server code implementing real time chat.
To configure the badges, replace your-username/real-time-chat with the actual parameters of your repository.
