import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define an interface for the movie document
export interface IMovie extends Document {
  title: string;
  year: number;
  rated: string;
  runtime: number;
  genres: string[];
  director: string;
  plot: string;
  poster: string;
  metascore: number;
  imdbRating: number;
  imdbVotes: string;
  imdbID: string;
}

// Define the schema using the interface
const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  Released:{ type: String, required: true},
  year: { type: Number, required: true },
  rated: { type: String, required: false },
  Runtime: { type: Number, required: false },
  Genre: { type: [String], required: false },
  director: { type: String, required: false },
  Language: { type: String, required: false },
  Plot: { type: String, required: false },
  poster: { type: String, required: false },
  metascore: { type: Number, required: false },
  imdbRating: { type: Number, required: false },
  imdbVotes: { type: String, required: false },
  imdbID: { type: String, required: false },
});

// Export the model with the appropriate type
const Movie: Model<IMovie> = model<IMovie>("Movie", movieSchema);

export default Movie;
