import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Get all unlocks
  app.get("/api/unlocks", async (_req, res) => {
    const unlocks = await storage.getUnlocks();
    res.json(unlocks);
  });

  // Add new unlock
  app.post("/api/unlocks", async (req, res) => {
    const unlock = await storage.addUnlock(req.body);
    res.json(unlock);
  });

  // Get all photos
  app.get("/api/photos", async (_req, res) => {
    const photos = await storage.getPhotos();
    res.json(photos);
  });

  // Get all messages
  app.get("/api/messages", async (_req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  // Get all reasons
  app.get("/api/reasons", async (_req, res) => {
    const reasons = await storage.getReasons();
    res.json(reasons);
  });

  return httpServer;
}
