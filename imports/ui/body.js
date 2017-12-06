import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';
import './body.html';



Template.body.helpers({
    tasks() { 
        return Tasks.find({}, { sort: {createdAt: -1 } })
    }
});

Template.body.events({
    'submit .new-task'(event) {

        event.preventDefault();

        // get value from form element
        const text = event.target.text.value;

        // Insert typed task into collection
        Tasks.insert({
            text,
            createdAt: new Date()
        });

        // Clear form
        event.target.text.value = '';

    }
});

