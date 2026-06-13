import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // IMPORTANT: Verify user is authenticated
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ 
                success: false,
                error: 'Unauthorized - user must be authenticated' 
            }, { status: 401 });
        }

        // Get the lead data from the request
        const { first_name, last_name, email, prompt } = await req.json();

        console.log('📧 Generating AI roadmap for:', email, 'requested by:', user.email);

        // Step 1: Generate AI roadmap using InvokeLLM
        const aiPrompt = `You are an expert AI consultant. A client named ${first_name} ${last_name} has described their business challenge:

"${prompt}"

Create a detailed, professional AI implementation roadmap for them. Include:

1. **Problem Analysis**: Summarize their challenge
2. **AI Solution Strategy**: Specific AI technologies and approaches
3. **Implementation Phases**: 3-4 concrete phases with timelines
4. **Expected Benefits**: Quantifiable outcomes
5. **Next Steps**: Clear action items

Format the response in a professional, email-friendly HTML format with proper headings and bullet points.`;

        console.log('🤖 Calling AI to generate roadmap...');
        
        const aiResponse = await base44.integrations.Core.InvokeLLM({
            prompt: aiPrompt,
            add_context_from_internet: false
        });

        console.log('✅ AI roadmap generated');

        // Step 2: Send email with the roadmap
        const emailSubject = `Your Free AI Implementation Roadmap - ${first_name}`;
        const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        h1 { color: #0284c7; border-bottom: 3px solid #0284c7; padding-bottom: 10px; }
        h2 { color: #0369a1; margin-top: 25px; }
        .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #64748b; font-size: 14px; }
        ul { margin: 15px 0; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0; color: white;">Your AI Implementation Roadmap</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Personalized for ${first_name} ${last_name}</p>
    </div>
    
    <div class="content">
        ${aiResponse}
    </div>
    
    <div class="footer">
        <p><strong>Ready to get started?</strong></p>
        <p>Book a free 20-minute discovery call to discuss your roadmap in detail.</p>
        <p style="margin-top: 20px;">
            <a href="https://calendly.com" style="background: #0284c7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Book Your Call</a>
        </p>
        <p style="margin-top: 30px; font-size: 12px;">
            © ${new Date().getFullYear()} AI Microtech Link. All rights reserved.
        </p>
    </div>
</body>
</html>`;

        console.log('📧 Sending email...');

        await base44.integrations.Core.SendEmail({
            from_name: 'AI Microtech Link',
            to: email,
            subject: emailSubject,
            body: emailBody
        });

        console.log('✅ Email sent successfully to:', email);

        return Response.json({ 
            success: true,
            message: 'AI roadmap generated and sent successfully'
        });

    } catch (error) {
        console.error('❌ Error:', error);
        return Response.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
});