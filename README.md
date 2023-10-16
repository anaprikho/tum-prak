# Process-Oriented Dashboard
This project implements a client-server application that facilitates dynamic rendering of HTML pages received from an external Cloud Process Execution Engine available at https://cpee.org.

This project facilitates dynamic interaction between an external process engine and a web-based interface. The server acts as a bridge, receiving HTML pages from the process engine and serving them to the client. Users can provide input, which is then relayed back to the engine if necessary for workflow progression.
## How To Run
Navigate to: src/server and install the necessary modules by running:
```
npm install
```
Then inside src/server run:
```
node server.js
```
