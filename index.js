'use strict';

const axios = require('axios');

/** Class representing a NikitaSms. */
class NikitaSms {
  /**
   * Create NikitaSms class.
   * @param {string} username - The username value.
   * @param {string} password - The password value.
   */
  constructor(username, password) {
    this.auth = [username, password];
  }

  set auth(value) {
    const [username, password] = value;
    if (typeof username !== 'string') throw new TypeError('Username must be string!');
    else if (typeof password !== 'string') throw new TypeError('Password must be string!');
    else
      this._instance = axios.create({
        baseURL: 'http://45.131.124.7/broker-api',
        auth: {
          username,
          password,
        },
      });
  }
  /**
   * sendSms function
   * @param {string} recipient - The recipient parameter must be in the format +37477918700.
   * @param {string} text - Message text, maximum length 70 characters in Cyrillic, 160 characters in Latin. If the message length is longer than the specified ones, then the message is split (when forming a user-message) into several parts, each part is charged separately.
   * @param {string} id - Parameter identifier consists of recipient number without plus and time stamp. E.g. 374779187001605869509033
   * @param {string} [priority="8"] - Priority (indicated in numerical form): 2 - low, 4 - normal,6 - high, 8 - realtime.
   */
  sendSms(recipient, text, id, priority = '8') {
    if (typeof recipient !== 'string') throw new TypeError('recipient must be string!');
    else if (typeof text !== 'string') throw new TypeError('text must be string!');
    else if (typeof id !== 'string') throw new TypeError('id must be string!');
    else
      return this._instance
        .post(`/send`, {
          messages: [
            {
              recipient,

              priority,
              sms: {
                originator: 'name.am',
                content: {
                  text,
                },
              },
              'message-id': id,
            },
          ],
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
  }
  /**
   * getStatusSms function
   * @param {string} id - Message ID.Consists of the recipient's number plus timestamp.
   */
  getStatusSms(id) {
    if (typeof id !== 'string') throw new TypeError('id must be string!');
    else
      return this._instance
        .post(`/getStatus`, {
          'message-id': [id],
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
  }
}
module.exports = NikitaSms;
