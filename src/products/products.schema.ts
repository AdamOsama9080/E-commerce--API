// product.schema.ts
import { Schema, Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  id: string;
  description: string;
  modelNumber: string;
  price: number;
  count: number;
  colors: string[];
  subtitle: string;
  images: string[];
  category: string;
  type: string;
  brand: string;
}

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  description: { type: String, required: true },
  modelNumber: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  colors: [{ type: String }],
  subtitle: { type: String },
  images: [{ type: String }],
  category: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
});
