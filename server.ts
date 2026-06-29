import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Fallback stock videos mapping for PT Foresyndo Global Indonesia projects
// Using ultra-reliable Google Cloud Storage Public GTV bucket videos which support streaming, range requests, and hotlinking perfectly.
const FALLBACK_VIDEOS: Record<number, string> = {
  1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Grand Foresyndo Hills
  2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // Emerald Residence
  3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Golden Square Boulevard
  4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // FGI Logistics Park
  5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", // Central Plaza & Commercial Hub
  6: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", // Site Development
  7: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" // Foresyndo Residence 2
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
  const proxiedFallbacks: Record<number, string> = {};
  for (const key of Object.keys(FALLBACK_VIDEOS)) {
    proxiedFallbacks[Number(key)] = `/api/fallback-video/${key}`;
  }
  res.json({
    apiKeyConfigured: !!process.env.GEMINI_API_KEY,
    fallbackVideos: proxiedFallbacks
  });
});

// New Endpoint to proxy fallback video streaming from public CDNs and bypass browser-side CORS checks
app.get("/api/fallback-video/:id", async (req, res) => {
  const id = Number(req.params.id);
  const videoUrl = FALLBACK_VIDEOS[id] || FALLBACK_VIDEOS[1];

  try {
    const videoRes = await fetch(videoUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (!videoRes.ok) {
      throw new Error(`Failed to stream video: ${videoRes.statusText}`);
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 24 hours

    if (videoRes.body) {
      Readable.fromWeb(videoRes.body as any).pipe(res);
    } else {
      res.status(500).json({ error: "No body stream available." });
    }
  } catch (err: any) {
    console.error(`Error proxying fallback video ${id}:`, err);
    // Redirect to the external URL as final resort in case streaming fails
    if (!res.headersSent) {
      res.redirect(videoUrl);
    } else {
      res.end();
    }
  }
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
        fallbackUrl: `/api/fallback-video/${id}`,
        prompt: promptText,
        error: err.message
      });
    }
  } else {
    // Return simulation details
    return res.json({
      success: true,
      mode: "simulation",
      fallbackUrl: `/api/fallback-video/${id}`,
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
      Readable.fromWeb(videoRes.body as any).pipe(res);
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
