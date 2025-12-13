// List available models with your API key
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found");
    return;
  }

  console.log("🔑 API Key:", apiKey.substring(0, 10) + "..." + apiKey.substring(apiKey.length - 5));
  
  try {
    // Try to list models using fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      console.error("❌ API Error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      
      console.log("\n💡 Common issues:");
      console.log("1. API key might be invalid or expired");
      console.log("2. API key might not have Gemini API enabled");
      console.log("3. You may need to enable the Generative Language API in Google Cloud Console");
      console.log("4. Try creating a new API key at: https://makersuite.google.com/app/apikey");
      return;
    }
    
    const data = await response.json();
    console.log("\n✅ Available models:");
    data.models?.forEach(model => {
      console.log(`  - ${model.name}`);
      console.log(`    Supported methods: ${model.supportedGenerationMethods?.join(", ")}`);
    });
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n💡 Please verify:");
    console.log("1. Your API key is correct");
    console.log("2. You have enabled the Gemini API");
    console.log("3. Create/verify key at: https://aistudio.google.com/app/apikey");
  }
}

listModels();
