const { Schema, model } = mongoose;

const RecipeSchema = new Schema({
  title: String,
  ingredients: [String],
  steps: [String],
  author: String,
  createdAt: { type: Date, default: Date.now }
});