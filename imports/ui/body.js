import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';


Template.body.helpers({
    tasks() { return Tasks.find({}) }
});

Template.body.events({
    'submit .new-task'(event) {

        event.preventDefault();

        // get value from form element
        const text = event.target.text.value;
        console.log(event)

        // Insert typed task into collection
        Tasks.insert({
            text,
            createdAt: new Date()
        });

        // Clear form
        event.target.text.value = '';

    }
})

