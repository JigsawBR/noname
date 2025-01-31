import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  photos: [String],
  bio: String,
  age: Number,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  preferences: {
    gender: String,
    ageRange: [Number],
  },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Índice para geolocalização
userSchema.index({ location: '2dsphere' });

export default mongoose.model('User', userSchema);