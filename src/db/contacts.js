import { model, Schema } from 'mongoose';

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: { type: String, required: true },
  email: { type: String, optional: false },
  isFavourite: { type: Boolean, default: false },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    required: true,
    default: 'personal',
  },
  createdAt: { timestamps: true },
  updatedAt: { timestamps: true },
});
export const Contact = model('contacts', contactsSchema);
