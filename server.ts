import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Task Breakdown
app.post("/api/ai/breakdown", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const prompt = `Break down the following task into 3 to 6 clear, actionable subtasks:
Title: ${title}
Description: ${description || "None"}

Return the result as a JSON array of strings representing subtasks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          },
          description: "List of actionable subtasks."
        },
        systemInstruction: "You are an expert productivity coach and project manager. Provide clear, concrete, and achievable subtasks."
      }
    });

    let subtasks = [];
    try {
      subtasks = JSON.parse(response.text || "[]");
    } catch (e) {
      subtasks = ["Research and plan", "Execute core action", "Review and finalize"];
    }

    res.json({ subtasks });
  } catch (error: any) {
    console.error("AI Breakdown Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI task breakdown" });
  }
});

// AI Daily Planner (Optimal Execution Order)
app.post("/api/ai/plan", async (req, res) => {
  try {
    const { tasks } = req.body;
    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ error: "Tasks array is required" });
    }

    const taskSummary = tasks.map((t: any, index: number) => 
      `${index + 1}. ID: ${t.id}, Title: "${t.title}", Priority: ${t.priority}, Due: ${t.dueDate || 'None'}, Status: ${t.status}`
    ).join("\n");

    const prompt = `Analyze the following tasks for today and recommend the optimal execution order (Top priorities first based on urgency, priority, and importance) with a short rationale.

Tasks:
${taskSummary}

Return JSON with orderedTaskIds (array of task IDs) and explanation (string).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            orderedTaskIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of task IDs sorted in recommended optimal execution order."
            },
            explanation: {
              type: Type.STRING,
              description: "Brief professional rationale for the recommended plan."
            }
          },
          required: ["orderedTaskIds", "explanation"]
        },
        systemInstruction: "You are an expert time-management coach. Order tasks prioritizing high urgency, high importance, and quick wins to build momentum."
      }
    });

    let result = { orderedTaskIds: tasks.map((t: any) => t.id), explanation: "Here is your balanced daily schedule." };
    try {
      result = JSON.parse(response.text || "{}");
    } catch (e) {
      // fallback
    }

    res.json(result);
  } catch (error: any) {
    console.error("AI Plan Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI daily plan" });
  }
});

// AI Task Rewriting
app.post("/api/ai/rewrite", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const prompt = `Make the following task more concrete, actionable, and clearly scoped.
Title: ${title}
Description: ${description || "None"}

Return JSON with refinedTitle and refinedDescription.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedTitle: { type: Type.STRING },
            refinedDescription: { type: Type.STRING }
          },
          required: ["refinedTitle", "refinedDescription"]
        },
        systemInstruction: "You are a professional copyeditor for productivity systems. Convert vague task titles into specific, result-oriented action items."
      }
    });

    let result = { refinedTitle: title, refinedDescription: description || "" };
    try {
      result = JSON.parse(response.text || "{}");
    } catch (e) {}

    res.json(result);
  } catch (error: any) {
    console.error("AI Rewrite Error:", error);
    res.status(500).json({ error: error.message || "Failed to rewrite task" });
  }
});

// AI Productivity Summarizer
app.post("/api/ai/summary", async (req, res) => {
  try {
    const { completedCount, totalCount, streak, workCount, personalCount } = req.body;

    const prompt = `Write a short, encouraging 2-sentence productivity summary for a user who has completed ${completedCount} out of ${totalCount} tasks, currently has a ${streak}-day streak, with ${workCount} work tasks and ${personalCount} personal tasks completed.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a supportive productivity coach. Give concise, insightful feedback."
      }
    });

    res.json({ summary: response.text || "Great progress! Keep up the momentum." });
  } catch (error: any) {
    console.error("AI Summary Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate summary" });
  }
});

// AI Priority Suggestion
app.post("/api/ai/priority", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const prompt = `Analyze this task and suggest priority (Low, Medium, High) and a 1-sentence reason.
Title: ${title}
Description: ${description || "None"}

Return JSON with priority ('Low', 'Medium', or 'High') and reason (string).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priority: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            reason: { type: Type.STRING }
          },
          required: ["priority", "reason"]
        },
        systemInstruction: "You are a prioritization expert using Eisenhower and impact-effort principles."
      }
    });

    let result = { priority: "Medium", reason: "Standard task priority." };
    try {
      result = JSON.parse(response.text || "{}");
    } catch (e) {}

    res.json(result);
  } catch (error: any) {
    console.error("AI Priority Error:", error);
    res.status(500).json({ error: error.message || "Failed to suggest priority" });
  }
});

// AI Chat Assistant Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: "You are Streakr AI, an expert productivity coach, time-management advisor, and task organization assistant. Help users structure their day, overcome procrastination, break down complex goals, and stay motivated."
      }
    });

    // If history is provided, we can simulate or pass it if needed, or send message
    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text || "I'm here to help you stay productive!" });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: error.message || "Chat error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
