# Nikita Sms

![npm](https://img.shields.io/npm/v/nikita-sms?style=plastic)
![npm](https://img.shields.io/npm/dw/nikita-sms?style=plastic)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install nikita-sms
# or
yarn add nikita-sms
```

## Usage

```js
const NikitaSms = require('nikita-sms');

// Creates a new user with username and password
const user = new NikitaSms('username', 'password');

const recipient = '+37477918700'; //recipient number
const text = 'sms body text'; // sms text
const id = recipient.substring(1) + +new Date(); //sms id (number + timestamp)
const priority = '8'; //sms priority (optional) defalut: 8

user.sendSms(recipient, text, id).then((data) => {
  console.log(data); // ⇨ 'OK'
});

user.getStatusSms(id).then((data) => {
  console.log(data); // ⇨ {
  //   messages: [
  //     {
  //       'message-id': '374779187001605872849862',
  //       channel: 'SMS',
  //       status: 'Delivered',
  //       'status-date': '2020-11-20 15:47:33',
  //       description: ' '
  //     }
  //   ]
  // }
});
```

![sms text](https://github.com/name-am/nikita-sms/blob/master/received-sms.jpg?raw=true)

## License

[MIT](https://github.com/name-am/nikita-sms/blob/master/LICENSE)
