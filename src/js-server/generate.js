module.exports = function () {
  const faker = require("faker");
  const _ = require("lodash");
  return {
    users: _.times(10, function (n) {
      return {
        id: n,
        username: faker.internet.userName(),
        password: faker.internet.password(),
        contacts: [
          {
            id: 0,
            name: faker.name.findName(),
            phone: '+7 ' + faker.phone.phoneNumberFormat(),
          },
          {
            id: 1,
            name: faker.name.findName(),
            phone: '+7 ' +  faker.phone.phoneNumberFormat(),
          },
          {
            id: 2,
            name: faker.name.findName(),
            phone: '+7 ' +  faker.phone.phoneNumberFormat(),
          },
        ],
      };
    }),
  };
};
