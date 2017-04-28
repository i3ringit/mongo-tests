const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'Hello World!' }] });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Hello World!');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({ name: 'Joe', posts: [] });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'Hello Universe!' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Hello Universe!');
        done();
      });
  });

  it('can remove subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Hello Multiverse!' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
