
import {Schema, Document, Model} from 'mongoose';

export let userSchema: Schema = new Schema({
    userId: String,
    stories: [{storyId: String, storyTitle: String}]
});
