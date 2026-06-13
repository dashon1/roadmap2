import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    console.log('=== BACKEND FUNCTION STARTED ===');
    
    try {
        const base44 = createClientFromRequest(req);
        
        console.log('Checking authentication...');
        const user = await base44.auth.me();

        if (!user) {
            console.log('❌ Not authenticated');
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('✓ User authenticated:', user.email);

        // Get the data from the request
        console.log('Reading request body...');
        const body = await req.json();
        const { first_name, last_name, email, prompt } = body;

        console.log('✓ Data received:', { first_name, last_name, email, prompt });

        // Prepare webhook data
        const webhookData = {
            first_name,
            last_name,
            email,
            prompt
        };

        console.log('Preparing to send to n8n...');
        console.log('Webhook URL: http://localhost:5678/webhook/acade4c7-7407-45dd-a4df-7fafac4d0fdd');
        console.log('Payload:', JSON.stringify(webhookData, null, 2));

        // Send to n8n webhook
        try {
            const webhookResponse = await fetch('http://localhost:5678/webhook/acade4c7-7407-45dd-a4df-7fafac4d0fdd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookData)
            });

            console.log('Webhook response status:', webhookResponse.status);
            
            let responseText;
            try {
                responseText = await webhookResponse.text();
                console.log('Webhook response body:', responseText);
            } catch (readError) {
                console.log('Could not read response body:', readError.message);
            }

            if (webhookResponse.ok) {
                console.log('✓ Webhook sent successfully!');
                return Response.json({ 
                    success: true,
                    message: 'Data sent to n8n successfully',
                    webhookStatus: webhookResponse.status,
                    webhookResponse: responseText
                });
            } else {
                console.log('⚠ Webhook returned non-200 status:', webhookResponse.status);
                return Response.json({ 
                    success: false,
                    message: 'Webhook returned error status',
                    webhookStatus: webhookResponse.status,
                    webhookResponse: responseText
                }, { status: 200 }); // Return 200 to frontend anyway
            }

        } catch (fetchError) {
            console.error('❌ Fetch error:', fetchError.message);
            console.error('Full error:', fetchError);
            
            // Return success anyway - webhook might still have received it
            return Response.json({ 
                success: false,
                message: 'Could not connect to n8n webhook',
                error: fetchError.message,
                note: 'This might be because n8n is running on localhost and the backend cannot reach it'
            }, { status: 200 });
        }

    } catch (error) {
        console.error('❌ Main error:', error.message);
        console.error('Stack:', error.stack);
        
        return Response.json({ 
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
});