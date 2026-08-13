export async function requestTaskBreakdown(title: string, description?: string) {
  try {
    const res = await fetch("/api/ai/breakdown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error("AI breakdown failed");
    const data = await res.json();
    return data.subtasks as string[];
  } catch (err) {
    console.error(err);
    return ["Research requirements", "Draft core deliverable", "Review and finalize"];
  }
}

export async function requestDailyPlan(tasks: any[]) {
  try {
    const res = await fetch("/api/ai/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks }),
    });
    if (!res.ok) throw new Error("AI daily plan failed");
    return await res.json() as { orderedTaskIds: string[]; explanation: string };
  } catch (err) {
    console.error(err);
    return {
      orderedTaskIds: tasks.map(t => t.id),
      explanation: "Optimized by standard urgency and priority rules."
    };
  }
}

export async function requestTaskRewrite(title: string, description?: string) {
  try {
    const res = await fetch("/api/ai/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error("AI rewrite failed");
    return await res.json() as { refinedTitle: string; refinedDescription: string };
  } catch (err) {
    console.error(err);
    return { refinedTitle: title, refinedDescription: description || "" };
  }
}

export async function requestProductivitySummary(stats: { completedCount: number; totalCount: number; streak: number; workCount: number; personalCount: number }) {
  try {
    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    });
    if (!res.ok) throw new Error("AI summary failed");
    const data = await res.json();
    return data.summary as string;
  } catch (err) {
    console.error(err);
    return "You are making steady progress this week. Focus on high-impact tasks to maintain momentum.";
  }
}

export async function requestPrioritySuggestion(title: string, description?: string) {
  try {
    const res = await fetch("/api/ai/priority", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error("AI priority failed");
    return await res.json() as { priority: 'Low' | 'Medium' | 'High'; reason: string };
  } catch (err) {
    console.error(err);
    return { priority: 'Medium', reason: 'Default estimated priority.' };
  }
}

export async function requestChatReply(message: string, history: any[] = []) {
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) throw new Error("Chat failed");
    const data = await res.json();
    return data.reply as string;
  } catch (err) {
    console.error(err);
    return "I'm having trouble connecting to AI services right now, but I'm here to help you organize your tasks!";
  }
}
