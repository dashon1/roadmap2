import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { message, sessionId, conversationHistory } = await req.json();

        console.log('💬 Chat request for session:', sessionId);

        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
        
        if (!GEMINI_API_KEY) {
            console.log('⚠️ Gemini API key not found, falling back to Base44 LLM');
            
            // Fallback to Base44 LLM
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You are a helpful AI assistant for AI Microtechlink, an AI consulting company. 
                
Previous conversation:
${conversationHistory.map(m => `${m.sender}: ${m.text}`).join('\n')}

User: ${message}

Provide a helpful, concise response about AI consulting, implementation, or answer their question.`,
                add_context_from_internet: false
            });

            return Response.json({ response: response });
        }

        // Use Gemini 2.5 Pro
        console.log('🤖 Using Gemini API');
        
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a helpful AI assistant for AI Microtech Link, an AI Development and Consulting company specializing in AI implementation for businesses.

Previous conversation context:
${conversationHistory.slice(-6).map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n')}

Current user message: ${message}

Provide a helpful, professional, and concise response. If asked about services, mention AI consulting, implementation roadmaps, custom AI solutions, and automation. Be friendly and informative.`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    }
                })
            }
        );

        if (!geminiResponse.ok) {
            throw new Error('Gemini API error');
        }

        const data = await geminiResponse.json();
        const botResponse = data.candidates[0].content.parts[0].text;

        console.log('✅ Response generated');

        return Response.json({ response: botResponse });

    } catch (error) {
        console.error('❌ Chat error:', error);
        
        // Emergency fallback
        return Response.json({ 
            response: "I'm here to help! We specialize in AI consulting and implementation. Would you like to know more about our services, or do you have a specific question about AI for your business?"
        });
    }
});