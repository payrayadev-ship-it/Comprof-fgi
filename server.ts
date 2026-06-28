import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Fallback stock videos mapping for PT Foresyndo Global Indonesia projects
const FALLBACK_VIDEOS: Record<number, string> = {
  1: "https://assets.mixkit.co/videos/preview/mixkit-modern-suburban-houses-aerial-view-41584-large.mp4", // Grand Foresyndo Hills
  2: "https://assets.mixkit.co/videos/preview/mixkit-drone-shot-of-a-modern-residential-area-44245-large.mp4", // Emerald Residence
  3: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-streets-and-buildings-42284-large.mp4", // Golden Square Boulevard
  4: "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-large-empty-warehouse-with-shelves-43033-large.mp4", // FGI Logistics Park
  5: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-exterior-44243-large.mp4", // Central Plaza & Commercial Hub
  6: "https://assets.mixkit.co/videos/preview/mixkit-highway-road-surrounded-by-forest-aerial-view-41595-large.mp4", // Site Development
  7: "https://assets.mixkit.co/videos/preview/mixkit-luxury-home-interior-44247-large.mp4" // Foresyndo Residence 2
};

const BASE_PROJECT_PROMPTS: Record<number, string> = {
  1: "Cinematic drone flythrough of Grand Foresyndo Hills, an exclusive luxury housing estate with modern tropical villas, smart homes with solar panels, lush green lawns, and mountains in the background under a warm sunset sky. 4k resolution, hyperrealistic, photorealistic architectural render.",
  2: "Slow motion drone shot of a premium residential cluster named Emerald Residence. Clean modern villas with glass walls, tropical landscaped gardens, children's playground, brick-paved streets, peaceful atmosphere, realistic sunlight.",
  3: "A smooth cinematic tracking shot along a vibrant commercial shophouse street called Golden Square Boulevard. 3-story modern retail and office buildings with glass facades, elegant outdoor cafes with umbrellas, neatly parked cars, active people walking, bright daylight.",
  4: "High angle aerial view of a huge, state-of-the-art modern industrial warehouse complex named FGI Logistics Park. White concrete walls, large logistics trucks loading cargo at dock levelers, clean tarmac roads, professional industrial setting.",
  5: "Cinematic architecture shot of Central Plaza & Commercial Hub, a stunning 6-story modern glass office building with a sleek futuristic lobby. Solar panels on roof, green balconies, trees around the plaza, sunset lighting.",
  6: "Drone view of a newly developed regional infrastructure with a perfectly paved hotmix asphalt road, neat precast concrete drainage systems (u-ditch), modern street lighting, and a retaining wall protecting a hillside, bright daylight.",
  7: "Luxury interior flythrough of Foresyndo Residence 2 boutique hotel lobby and smart suites, showcasing sleek minimalist design, warm ambient lights, IoT touch panels, cozy lounge, high-end tropical modern architecture."
};

// API Endpoint 1: Check if API Key is configured
app.get("/api/video-config", (req, res) => {
  res.json({
    apiKeyConfigured: !!process.env.GEMINI_API_KEY,
    fallbackVideos: FALLBACK_VIDEOS
  });
});

// API Endpoint 2: Trigger Video Generation with Veo
app.post("/api/generate-video", async (req, res) => {
  const { projectId, style, customPrompt, useAI } = req.body;
  const id = Number(projectId);

  const basePrompt = BASE_PROJECT_PROMPTS[id] || "Cinematic modern building architectural animation, 4k resolution, photorealistic.";
  const promptText = `${basePrompt} Style preset: ${style || "Cinematic lighting"}. Additional aesthetic customization: ${customPrompt || "none"}. Optimize for clean architectural drone showcase.`;

  // Check if we should use AI and if API key is present
  if (useAI && process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const operation = await ai.models.generateVideos({
        model: "veo-3.1-lite-generate-preview",
        prompt: promptText,
        config: {
          numberOfVideos: 1,
          resolution: "720p",
          aspectRatio: "16:9"
        }
      });

      return res.json({
        success: true,
        mode: "ai",
        operationName: operation.name,
        prompt: promptText
      });
    } catch (err: any) {
      console.error("Veo generation error, reverting to simulation:", err);
      return res.json({
        success: true,
        mode: "simulation",
        fallbackUrl: FALLBACK_VIDEOS[id] || FALLBACK_VIDEOS[1],
        prompt: promptText,
        error: err.message
      });
    }
  } else {
    // Return simulation details
    return res.json({
      success: true,
      mode: "simulation",
      fallbackUrl: FALLBACK_VIDEOS[id] || FALLBACK_VIDEOS[1],
      prompt: promptText
    });
  }
});

// API Endpoint 3: Poll Veo Video Operation Status
app.post("/api/video-status", async (req, res) => {
  const { operationName } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    return res.json({ done: true, status: "failed", error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const op = new GenerateVideosOperation();
    op.name = operationName;
    
    const updated = await ai.operations.getVideosOperation({ operation: op });
    
    res.json({
      done: updated.done,
      response: updated.response,
      error: updated.error
    });
  } catch (err: any) {
    console.error("Error polling operation status:", err);
    res.json({ done: true, status: "failed", error: err.message });
  }
});

// API Endpoint 4: Proxy Stream for completed Veo video
app.post("/api/video-download", async (req, res) => {
  const { operationName } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(400).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const op = new GenerateVideosOperation();
    op.name = operationName;
    
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    
    if (!uri) {
      return res.status(400).json({ error: "Video URI not found in the completed operation." });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": process.env.GEMINI_API_KEY }
    });

    if (!videoRes.ok) {
      throw new Error(`Failed to download video from Google servers: ${videoRes.statusText}`);
    }

    res.setHeader("Content-Type", "video/mp4");
    
    // Pipe video stream back to client
    if (videoRes.body) {
      videoRes.body.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          },
          abort(err) {
            console.error("Video streaming aborted:", err);
            res.end();
          }
        })
      );
    } else {
      res.status(500).json({ error: "No video body stream available." });
    }
  } catch (err: any) {
    console.error("Error downloading/streaming video:", err);
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PT. Foresyndo Global Indonesia Server running on http://localhost:${PORT}`);
  });
}

startServer();
