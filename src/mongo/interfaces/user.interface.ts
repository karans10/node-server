export interface IUser extends Document {
    userId: String,
    stories: story[]
};

export interface story {
    storyId: String,
    storyTitle: String
};