import OpenAI from "openai";

// The OpenAI client is initialized in the backend (server/routes.ts)
// This file contains type definitions and helper functions for the frontend

export type ImageGenerationRequest = {
  prompt: string;
  style: string;
};

export type ImageGenerationResponse = {
  imageUrl: string;
  metadata: {
    width: number;
    height: number;
  };
};

export type GenerationError = {
  message: string;
  code?: string;
};

// Helper function to format prompts based on style
export function formatPrompt(prompt: string, style: string): string {
  if (style === "default") {
    return prompt;
  }
  
  // Style-specific prompt enhancements
  const stylePrompts: Record<string, string> = {
    "digital art": `Create a digital art piece showing ${prompt}. Use vibrant colors, dynamic composition, and modern digital art techniques.`,
    "oil painting": `Create an oil painting of ${prompt}. Use rich textures, classical composition, and traditional oil painting techniques.`,
    "watercolor": `Create a watercolor painting of ${prompt}. Use soft edges, delicate color washes, and the characteristic translucency of watercolor.`,
    "anime": `Create an anime-style illustration of ${prompt}. Use bold lines, expressive features, and characteristic anime aesthetics.`,
    "photorealistic": `Create a photorealistic image of ${prompt}. Use natural lighting, precise details, and photographic composition.`
  };

  return stylePrompts[style] || `${prompt} in ${style} style`;
}

// Validation helper for image generation responses
export function validateGenerationResponse(data: any): data is ImageGenerationResponse {
  return (
    typeof data === "object" &&
    typeof data.imageUrl === "string" &&
    typeof data.metadata === "object" &&
    typeof data.metadata.width === "number" &&
    typeof data.metadata.height === "number"
  );
}

// Format error messages for user display
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Handle specific OpenAI error types if needed
    if ("code" in error) {
      switch (error.code) {
        case "content_policy_violation":
          return "Content policy violation. Please modify your prompt and try again.";
        case "rate_limit_exceeded":
          return "Rate limit exceeded. Please try again later.";
        default:
          return error.message;
      }
    }
    return error.message;
  }
  return "An unexpected error occurred";
}
