const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User( { name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jane');
        done();
      });
  }

  // Model Instance updates

  it('instance type using set n save', (done) => {
    joe.set('name', 'Jane');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Jane' }), done);
  });

  // Model Class updates
  it('A model class can update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Jane' }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, {name: 'Jane'}), done);
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Jane' }), done);
  });

  it('A user can have their postcount incremented by 10', (done) => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 10 }})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 10);
        done();
      });
  });

});
