// Zentra AI – Ultra Smart Response System

export async function askZentra(messages) {
  const msg = messages[messages.length - 1]?.content?.toLowerCase() || ''
  const original = messages[messages.length - 1]?.content || ''

  // Identity
  if (msg.includes('who built') || msg.includes('who made') || msg.includes('who created') || msg.includes('who are you'))
    return "I'm Zentra, built by Muhammad Zamran — CS Engineer, Learning AI, Making things easier. Founder of ZentraAI with 106+ tools across 12 categories!"

  // Greetings
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey'))
    return "Hey! 👋 I'm Zentra. Tell me what you want to build and I'll pick the perfect AI tool!"

  // Website Building
  if (msg.includes('website') || msg.includes('landing page') || msg.includes('web app') || msg.includes('lovable') || msg.includes('base44') || msg.includes('bolt') || msg.includes('framer') || msg.includes('replit'))
    return "For websites: #1 Lovable (no-code, beautiful apps), #2 Base44 (AI app builder), #3 Bolt (full-stack from prompt), #4 Framer (animate & publish), #5 Replit Agent (cloud IDE). All free to start!"

  // Image Generation
  if (msg.includes('image') || msg.includes('art') || msg.includes('photo') || msg.includes('midjourney') || msg.includes('dall') || msg.includes('stable diffusion') || msg.includes('ideogram') || msg.includes('leonardo') || msg.includes('playground') || msg.includes('adobe firefly'))
    return "For AI images: #1 Midjourney (best quality, $10/mo), #2 DALL-E 3 (in ChatGPT), #3 Adobe Firefly (free, safe), #4 Ideogram (text in images), #5 Leonardo AI (free), #6 Stable Diffusion (open source). All in ZentraAI!"

  // Video
  if (msg.includes('video') || msg.includes('sora') || msg.includes('runway') || msg.includes('pika') || msg.includes('kling') || msg.includes('luma') || msg.includes('boomy'))
    return "For AI video: #1 Runway ML (professional VFX), #2 Pika Labs (free, fast), #3 Sora (OpenAI, cinematic), #4 Kling AI (realistic motion), #5 Luma Dream (3D photorealistic). Check ZentraAI!"

  // Music
  if (msg.includes('music') || msg.includes('song') || msg.includes('suno') || msg.includes('udio') || msg.includes('mubert') || msg.includes('beatoven') || msg.includes('boomy'))
    return "For AI music: #1 Suno AI (#1 music, free full songs!), #2 Udio (studio quality), #3 Mubert (real-time generation), #4 Beatoven (mood-based), #5 Boomy (earn royalties). All in ZentraAI!"

  // Coding
  if (msg.includes('code') || msg.includes('coding') || msg.includes('github copilot') || msg.includes('cursor') || msg.includes('codeium') || msg.includes('tabnine') || msg.includes('replit') || msg.includes('claude code') || msg.includes('gemini code'))
    return "For coding: #1 GitHub Copilot (VS Code), #2 Cursor AI (autonomous edits), #3 Claude (debugging), #4 Codeium (free, 70+ languages), #5 Tabnine (private/enterprise), #6 Claude Code (terminal). ZentraAI has 10 coding tools!"

  // Writing
  if (msg.includes('write') || msg.includes('writing') || msg.includes('jasper') || msg.includes('copy.ai') || msg.includes('writesonic') || msg.includes('quillbot') || msg.includes('grammarly') || msg.includes('blog'))
    return "For writing: #1 Claude (most natural), #2 ChatGPT (versatile), #3 Jasper (marketing), #4 Copy.ai (campaigns), #5 Writesonic (SEO), #6 Quillbot (paraphrase), #7 Grammarly (grammar). ZentraAI has 10 writing tools!"

  // Presentations
  if (msg.includes('presentation') || msg.includes('slides') || msg.includes('gamma') || msg.includes('beautiful.ai') || msg.includes('tome') || msg.includes('canva') || msg.includes('slidesai'))
    return "For presentations: #1 Gamma (#1 pick, free, stunning!), #2 Beautiful.ai (smart templates), #3 Tome (storytelling), #4 Canva AI (easy), #5 SlidesAI (Google Slides add-on). All in ZentraAI!"

  // Chatbots
  if (msg.includes('chatgpt') && msg.includes('claude'))
    return "ChatGPT vs Claude: ChatGPT (#1 global, 200M+ users) wins for plugins & images. Claude (BEST rated) wins for long documents, coding & reasoning. Both free! Compare on ZentraAI!"

  if (msg.includes('chatgpt') || msg.includes('gpt'))
    return "ChatGPT by OpenAI — #1 Global AI, used by 200M+ people. Best for writing, brainstorming, coding, images (DALL-E). Free tier + $20/mo Plus. The most popular AI tool worldwide!"

  if (msg.includes('claude'))
    return "Claude by Anthropic — BEST rated AI. Excels at long-form writing, essays, storytelling and complex code with 200K context window. Free tier is very generous!"

  if (msg.includes('gemini') || msg.includes('google ai'))
    return "Google Gemini — multimodal AI integrated with Google Docs and Search. Best for research and Google Workspace. Free tier with 500 requests/day!"

  if (msg.includes('perplexity'))
    return "Perplexity AI — #1 Research tool! AI search engine with real-time citations and source verification. Trending and completely free. Best for research and fact-checking!"

  if (msg.includes('mistral'))
    return "Mistral — European open-source AI with multilingual and coding capabilities. Free, privacy-focused alternative to ChatGPT!"

  if (msg.includes('grok') || msg.includes('xai'))
    return "Grok by xAI — rebellious AI with real-time X (Twitter) data access. Great for current events and unfiltered responses. Free with X Premium!"

  if (msg.includes('meta ai') || msg.includes('llama'))
    return "Meta AI — Llama-powered AI available across WhatsApp, Instagram, Facebook. Free and built into apps you already use!"

  // Research
  if (msg.includes('research') || msg.includes('study') || msg.includes('academic') || msg.includes('paper') || msg.includes('notebooklm') || msg.includes('consensus') || msg.includes('elicit'))
    return "For research: #1 Perplexity (#1 research, free!), #2 NotebookLM (upload docs & chat), #3 Consensus (200M academic papers), #4 Elicit (literature reviews), #5 Scholarcy (summarize papers). ZentraAI has 8 research tools!"

  // Design/UI
  if (msg.includes('design') || msg.includes('figma') || msg.includes('galileo') || msg.includes('khroma') || msg.includes('looka') || msg.includes('canva') || msg.includes('relume') || msg.includes('notion') || msg.includes('uizard'))
    return "For design: #1 Figma AI (design to code), #2 Galileo AI (text to UI), #3 Framer (animate & publish), #4 Looka (logos & branding), #5 Khroma (AI color palettes), #6 Canva (easy templates). ZentraAI has 8 design tools!"

  // Productivity/Automation
  if (msg.includes('zapier') || msg.includes('make') || msg.includes('automate') || msg.includes('workflow') || msg.includes('motion') || msg.includes('reclaim') || msg.includes('otter') || msg.includes('mem') || msg.includes('notion'))
    return "For productivity: #1 Zapier AI (6000+ app automation), #2 Make (visual workflows), #3 Motion (AI calendar), #4 Reclaim AI (schedule optimizer), #5 Otter AI (meeting transcription), #6 Mem (smart notes). ZentraAI has 8 productivity tools!"

  // Voice/Audio
  if (msg.includes('voice') || msg.includes('elevenlabs') || msg.includes('murf') || msg.includes('speechify') || msg.includes('descript') || msg.includes('resemble') || msg.includes('adobe podcast'))
    return "For AI voice: #1 ElevenLabs (#1 voice, most realistic cloning!), #2 Murf (120+ voices, 20 languages), #3 Descript (edit audio by text), #4 Speechify (read docs at 4.5x speed), #5 Adobe Podcast (studio quality from any mic). ZentraAI has 8 voice tools!"

  // Earn/Money
  if (msg.includes('earn') || msg.includes('money') || msg.includes('income') || msg.includes('freelance') || msg.includes('youtube') || msg.includes('saas'))
    return "Earn with AI: 1) Start YouTube channel (ElevenLabs + Runway), 2) Freelance as AI Artist (Midjourney), 3) Launch SaaS Product (Lovable + Base44), 4) Create Online Course (Gamma + Claude), 5) Boomy for music royalties. Check ZentraAI's Earn With AI section!"

  // Compare
  if (msg.includes('compare') || msg.includes('vs') || msg.includes('difference') || msg.includes('better') || msg.includes('which'))
    return "Use ZentraAI's Comparison Engine to compare any 2-3 tools side by side! Currently showing: ChatGPT, Claude, Gemini, Perplexity, Midjourney, DALL-E 3, Stable Diffusion, GitHub Copilot, Suno, ElevenLabs, Gamma and more!"

  // Free tools
  if (msg.includes('free') || msg.includes('no cost') || msg.includes('budget'))
    return "Best 100% FREE AI tools: ChatGPT, Claude, Gemini, Perplexity, Suno AI, Codeium, Gamma, Adobe Firefly, NotebookLM, Otter AI, Make.com, Leonardo AI, Ideogram, Reclaim AI. ZentraAI filters by FREE!"

  // SEO
  if (msg.includes('seo') || msg.includes('rank') || msg.includes('keyword'))
    return "For SEO: Use Writesonic or Surfer SEO + ChatGPT combo for best results. Write optimized content 10x faster with AI. ZentraAI's Creative Writing category has all writing tools!"

  // Default
  return `Great question about "${original}"! ZentraAI has 106+ tools across 12 categories. Try our Smart Finder for personalized picks, or ask me about: images, video, music, coding, writing, presentations, research, design, voice, or productivity!`
}