import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './task.js';
import './body.html';


Template.body.onCreated(function bodyonCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
})


Template.body.helpers({
  tasks() {
      const instance = Template.instance();
      if( instance.state.get('hide_stuff') ) {
          return Tasks.find({checked: {$eq: false } }, { sort: { createdAt: -1 } })
      }
      return Tasks.find({}, {sort: {createdAt: -1 } });
  },
  incompleteCount() {
      return Tasks.find({checked: {$eq: false} }).count();
  }
});

Template.body.events({
    'submit .new-task'(event) {
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        Meteor.call('tasks.insert', text);

        target.text.value = ''
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hide_stuff', event.target.checked);
    }
})