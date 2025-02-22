import { 
  type Unlock, type InsertUnlock,
  type Photo, type InsertPhoto,
  type Message, type InsertMessage,
  type Reason, type InsertReason
} from "@shared/schema";

export interface IStorage {
  // Unlocks
  getUnlocks(): Promise<Unlock[]>;
  addUnlock(unlock: InsertUnlock): Promise<Unlock>;

  // Photos
  getPhotos(): Promise<Photo[]>;
  addPhoto(photo: InsertPhoto): Promise<Photo>;

  // Messages
  getMessages(): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;

  // Reasons
  getReasons(): Promise<Reason[]>;
  addReason(reason: InsertReason): Promise<Reason>;
}

export class MemStorage implements IStorage {
  private unlocks: Map<number, Unlock>;
  private photos: Map<number, Photo>;
  private messages: Map<number, Message>;
  private reasons: Map<number, Reason>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.unlocks = new Map();
    this.photos = new Map();
    this.messages = new Map();
    this.reasons = new Map();
    this.currentIds = {
      unlocks: 1,
      photos: 1,
      messages: 1,
      reasons: 1
    };

    // Add initial data
    this.seedData();
  }

  private seedData() {
    // Seed photos
    const photoUrls = [
      "https://images.unsplash.com/photo-1574774191469-3d7732e5fc8b",
      "https://images.unsplash.com/photo-1709884735626-63e92727d8b6",
      "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b",
      "https://images.unsplash.com/photo-1515636395880-48618f2beb8e",
      "https://images.unsplash.com/photo-1585801441150-1cd92b29e68e",
      "https://images.unsplash.com/photo-1709884732294-90379fee354c",
      "https://images.unsplash.com/photo-1709884735017-114f4a31f944",
      "https://images.unsplash.com/photo-1556877976-97ef5c8a4ff0",
      "https://images.unsplash.com/photo-1709884732297-4b3c1a3f725b",
      "https://images.unsplash.com/photo-1709884735646-897b57461d61"
    ];

    photoUrls.forEach((url, i) => {
      this.addPhoto({
        url,
        description: `Love photo ${i + 1}`
      });
    });

    // Seed messages
    [
      {
        subject: "Miss you",
        content: "Thinking of you today...",
        sender: "egor",
        date: "2024-03-15"
      },
      {
        subject: "Our plans",
        content: "Can't wait to see you next week!",
        sender: "egor", 
        date: "2024-03-14"
      },
      {
        subject: "Love you",
        content: "Just wanted to say I love you ❤️",
        sender: "egor",
        date: "2024-03-13" 
      }
    ].forEach(msg => this.addMessage(msg));

    // Seed reasons
    [
      "Your smile brightens my day",
      "You understand me completely",
      "Your kindness knows no bounds",
      "You make me laugh like no other",
      "You support all my dreams"
    ].forEach(text => this.addReason({ text }));
  }

  async getUnlocks(): Promise<Unlock[]> {
    return Array.from(this.unlocks.values());
  }

  async addUnlock(unlock: InsertUnlock): Promise<Unlock> {
    const id = this.currentIds.unlocks++;
    const newUnlock = { ...unlock, id };
    this.unlocks.set(id, newUnlock);
    return newUnlock;
  }

  async getPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values());
  }

  async addPhoto(photo: InsertPhoto): Promise<Photo> {
    const id = this.currentIds.photos++;
    const newPhoto = { ...photo, id };
    this.photos.set(id, newPhoto);
    return newPhoto;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async addMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentIds.messages++;
    const newMessage = { ...message, id };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async getReasons(): Promise<Reason[]> {
    return Array.from(this.reasons.values());
  }

  async addReason(reason: InsertReason): Promise<Reason> {
    const id = this.currentIds.reasons++;
    const newReason = { ...reason, id };
    this.reasons.set(id, newReason);
    return newReason;
  }
}

export const storage = new MemStorage();
