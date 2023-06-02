This is a Demo App intented to showcase the data that and be obtained by using the EasyPost Smart Rate product. The App rates and EasyPost shipment and retrieves Smart Rate Time in Transit data and puts the information into an HTML table.

<img src="https://github.com/LoganSimonsen/smart_rate_demo/icons/sr.gif" />

### Install Dependencies

```
npm install
```

`nodemon` is technically optional, but can be helpful when making/testing changes to the server.

`cors` will enable cross-origin support

`http-proxy-middleware` will help proxy HTTP requests between our front end application and the EasyPost API.

### Create .env File

```
git touch .env
```

File should look something like this:

```
EP_TEST_KEY=E4321FDSA
EP_PRODUCTION_KEY=E1234ASDF
```

Replace the example keys above with your EasyPost API keys which you can get from the [EasyPost Dashboard](https://www.easypost.com/account/api-keys) (development accounts are free)

### Starting the Server

```
nodemon server
```

### Using Examples

Open the example HTML file of your choosing in a web browser of your choosing. Make sure your server is running and you have configured your .env file.

### Limiting scope of carrier accounts rated against

in the `smart_rate_example.js` file you can add your list of carrier_accounts (line 229 and 325)
