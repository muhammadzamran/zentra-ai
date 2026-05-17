// Zentra AI — powered by Groq (FREE)
// Get your free key at: console.groq.com

const SYSTEM = `You are Zentra, an expert AI tools advisor inside ZentraAI — the most premium AI tools directory, built by Muhammad Zamran.

Personality: Smart, direct, helpful. You know every AI tool deeply.
Style: Short answers. Max 120 words unless comparison is asked.
Specialty: Recommending AI tools, comparing tools, building AI workflows.

When someone asks what tool to use give ONE clear recommendation first, then 2 alternatives.
When asked to compare be honest about strengths and weaknesses.
When asked for a workflow give step-by-step tool chain.`

export async function askZentra(messages) {
  const key = import.meta.env.VITE_OPENAI_API_KEY

  if (!key || key.trim() === '') {
    return "Please add your Groq API key to .env file as VITE_OPENAI_API_KEY. Get free key at console.groq.com"
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 500,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ]
    })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error?.message || 'Groq API error')
  }

  const data = await res.json()
  return data.choices[0]?.message?.content || ''
}