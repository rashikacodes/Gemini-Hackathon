// Test script to check available Gemini models
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in .env file");
    return;
  }

  console.log("✅ API Key found (length:", apiKey.length, ")");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Test different model names
  const modelNames = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest", 
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-pro-vision"
  ];
  
  for (const modelName of modelNames) {
    try {
      console.log(`\n🧪 Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say 'Hello'");
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName} works! Response:`, text.substring(0, 50));
      break; // Stop after first successful model
    } catch (error) {
      console.log(`❌ ${modelName} failed:`, error.message);
    }
  }
}

testGemini();
