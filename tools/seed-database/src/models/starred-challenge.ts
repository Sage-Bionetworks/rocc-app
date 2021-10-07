import { Schema, model } from 'mongoose';

interface StarredChallenge {
  userId: string;
  challengeId: string;
}

const StarredChallengeSchema = new Schema<StarredChallenge>({
  userId: { type: String, required: true },
  challengeId: { type: String, required: true }
});

export default model('starred_challenge', StarredChallengeSchema);