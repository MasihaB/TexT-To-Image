import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { generateSchema } from "@shared/schema";
import * as fal from "@fal-ai/serverless-client";

if (!process.env.FAL_KEY) {
  throw new Error("FAL_KEY environment variable is required");
}

fal.config({
  credentials: process.env.FAL_KEY
});

export async function registerRoutes(app: Express) {
  app.post("/api/generate", async (req, res) => {
    try {
      const data = generateSchema.parse(req.body);

      const stylePrompt = data.style === "default" 
        ? data.prompt 
        : `${data.prompt} in ${data.style} style`;

      console.log('Generating image with prompt:', stylePrompt);

      const result = await fal.run('fal-ai/fast-sdxl', {
        input: {
          prompt: stylePrompt,
          image_size: "square_hd", // 1024x1024
          num_inference_steps: 30,
          guidance_scale: 7.5
        }
      });

      console.log('Generation result:', result);

      if (!result.images?.[0]?.url) {
        throw new Error('No image URL in response');
      }

      const generation = await storage.createGeneration({
        prompt: data.prompt,
        style: data.style,
        imageUrl: result.images[0].url,
        metadata: { width: 1024, height: 1024 },
      });

      res.json(generation);
    } catch (error: any) {
      console.error('Image generation error:', error);
      if (error.name === "ZodError") {
        res.status(400).json({ message: "Invalid request data" });
      } else {
        res.status(500).json({ 
          message: "Failed to generate image",
          error: error.message
        });
      }
    }
  });

  return createServer(app);
}