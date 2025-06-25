
import { GoogleGenAI, GenerateContentResponse, Chat, SendMessageParameters } from "@google/genai";
import { EmployeeProfile, AnalyzedSkills, CareerPath, DevelopmentAction, ChatMessage } from '../types';
import { BRAND_CONFIG, MOCK_ROLES, GEMINI_TEXT_MODEL } from "../constants";

// Ensure API_KEY is accessed via process.env.API_KEY
// This service assumes process.env.API_KEY is available in the execution environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Gemini API calls will fail.");
  // Potentially throw an error or handle this state in the UI
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion, as we check above.

const parseJsonFromMarkdown = <T,>(text: string): T | null => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", text);
    // Fallback: try to parse if it's an array without fences
    if (jsonStr.startsWith('[') && jsonStr.endsWith(']')) {
        try {
            return JSON.parse(jsonStr) as T;
        } catch (e2) {
            console.error("Secondary JSON parse attempt failed:", e2);
        }
    }
    return null;
  }
};


export const analyzeSkillsAndAspirations = async (profile: EmployeeProfile): Promise<AnalyzedSkills | null> => {
  if (!API_KEY) return Promise.resolve({ extractedSkills: ["Mock Skill 1", "Mock Skill 2"], extractedAspirations: ["Mock Aspiration 1"] }); // Fallback for missing API key

  const prompt = `
Analyze the following employee profile for HERE AND NOW AI and extract key skills, certifications, interests, and career aspirations.
Profile:
Name: ${profile.name}
Current Role: ${profile.currentRole}
Department: ${profile.department}
Skills/Certifications Text: ${profile.skillsInput}
Interests Text: ${profile.interestsInput}
Career Level: ${profile.currentCareerLevel}
Aspirations Text: ${profile.aspirationsInput}

Return a JSON object with two keys: 
1. 'extractedSkills': an array of strings, listing unique skills and certifications.
2. 'extractedAspirations': an array of strings, summarizing key career goals or desired future roles.
Be concise and focus on actionable items. If a section is empty, return an empty array for the corresponding key.
Example: {"extractedSkills": ["Python", "Machine Learning", "AWS Certified Cloud Practitioner"], "extractedAspirations": ["Lead AI projects", "Specialize in NLP"]}
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return parseJsonFromMarkdown<AnalyzedSkills>(response.text);
  } catch (error) {
    console.error("Error analyzing skills with Gemini:", error);
    return null;
  }
};


export const getCareerPathRecommendations = async (profile: EmployeeProfile, analysis: AnalyzedSkills): Promise<CareerPath[] | null> => {
  if (!API_KEY) return Promise.resolve([]); // Fallback for missing API key

  const prompt = `
You are an expert HR career advisor for ${BRAND_CONFIG.brand.organizationShortName}.
The organization values innovation, continuous learning, and internal growth.
Here is a simplified list of roles available at ${BRAND_CONFIG.brand.organizationShortName} and their typical skill sets:
${JSON.stringify(MOCK_ROLES, null, 2)}

Given the following employee profile:
Name: ${profile.name}
Current Role: ${profile.currentRole}
Stated Skills/Certs: ${profile.skillsInput}
Stated Interests: ${profile.interestsInput}
Stated Aspirations: ${profile.aspirationsInput}
AI Extracted Skills: ${analysis.extractedSkills.join(', ') || 'None'}
AI Extracted Aspirations: ${analysis.extractedAspirations.join(', ') || 'None'}

Recommend 2-3 ideal career paths within ${BRAND_CONFIG.brand.organizationShortName} for this employee.
For each path, provide:
1.  'title': The job title (must be one of the MOCK_ROLES titles or a logical progression).
2.  'description': A concise and motivating 2-3 sentence summary of the role and why it might be a good fit for this employee at ${BRAND_CONFIG.brand.organizationShortName}.
3.  'requiredSkills': An array of 5-7 key skills needed for this role, drawn from MOCK_ROLES and general knowledge.
4.  'skillsToDevelop': An array of 3-5 skills from 'requiredSkills' that the employee likely needs to develop or strengthen, considering their current profile.
5.  'estimatedTimeToReach': A realistic timeframe (e.g., "6-12 months", "1-2 years", "2-3 years").
6.  'matchScore': An estimated percentage (0-100) of how well the employee's current profile aligns with this path. Be realistic.
7.  'growthPotential': A qualitative assessment ("High", "Medium", "Low").
8.  'interestAlignment': A qualitative assessment based on stated interests and aspirations ("High", "Medium", "Low").
9.  'id': A unique string identifier for this path (e.g., title-randomnumber).

Format the response as a valid JSON array of objects, where each object represents a career path. Ensure the JSON is syntactically correct and directly parsable. Do not include any text outside the JSON array.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const paths = parseJsonFromMarkdown<CareerPath[]>(response.text);
    return paths?.map(p => ({ ...p, id: p.id || `${p.title.replace(/\s+/g, '-')}-${Math.random().toString(36).substring(7)}` })) || [];
  } catch (error) {
    console.error("Error getting career path recommendations from Gemini:", error);
    return null;
  }
};

export const generateDevelopmentPlan = async (profile: EmployeeProfile, careerPath: CareerPath): Promise<DevelopmentAction[] | null> => {
  if (!API_KEY) return Promise.resolve([]); // Fallback for missing API key
  
  const prompt = `
You are a career development advisor at ${BRAND_CONFIG.brand.organizationShortName}.
For an employee named ${profile.name}, aiming for the role of "${careerPath.title}", which generally requires skills like [${careerPath.requiredSkills.join(', ')}] and specifically needs to develop [${careerPath.skillsToDevelop.join(', ')}], suggest a personalized development plan.
The employee's current stated skills are: [${profile.skillsInput || 'Not specified'}].

Include 2-3 actionable steps. For each step, provide:
1.  'actionType': (e.g., "Training", "Mentorship", "Project Assignment", "Shadowing", "Certification").
2.  'description': A brief explanation of the action, tailored to ${BRAND_CONFIG.brand.organizationShortName}'s context if possible.
3.  'suggestedResource': A specific, practical resource (e.g., "Internal L&D Portal: Course XYZ", "Seek mentorship from a Senior ${careerPath.title} like [Example Name/Team]", "Volunteer for Project ABC related to [Skill]", "Coursera: XYZ Specialization in [Skill]").
4.  'estimatedEffort': (e.g., "2-4 weeks", "Ongoing (1-2 hours/week)", "3 months part-time").
5.  'id': A unique string identifier for this action (e.g., actionType-randomnumber).

Focus on practical and impactful suggestions.
Format the response as a valid JSON array of development action objects. Ensure the JSON is syntactically correct and directly parsable. Do not include any text outside the JSON array.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const actions = parseJsonFromMarkdown<DevelopmentAction[]>(response.text);
    return actions?.map(a => ({ ...a, id: a.id || `${a.actionType.replace(/\s+/g, '-')}-${Math.random().toString(36).substring(7)}` })) || [];
  } catch (error) {
    console.error("Error generating development plan from Gemini:", error);
    return null;
  }
};

let chatInstance: Chat | null = null;

export const startChatSession = (): Chat => {
  if (!API_KEY) {
    console.warn("API_KEY not found, chat will use mock responses.");
    const mockChat: Partial<Chat> = { 
        sendMessageStream: async (params: SendMessageParameters | { message: string }) => {
            // This is an async function, so it returns a Promise.
            // The Promise resolves to the AsyncGenerator.
            async function* generator() {
                // Ensure params has a 'message' property or handle appropriately
                const messageText = typeof params === 'string' ? params : (params as {message: string}).message;
                yield { text: `Mock response to: ${messageText}`, candidates: [], usageMetadata: {} } as GenerateContentResponse;
            }
            return generator();
        },
        sendMessage: async (params: SendMessageParameters | { message: string }) => {
            const messageText = typeof params === 'string' ? params : (params as {message: string}).message;
            return { text: `Mock response to: ${messageText}`, candidates: [], usageMetadata: {} } as GenerateContentResponse;
        }
    };
    return mockChat as Chat;
  }

  if (!chatInstance) {
      chatInstance = ai.chats.create({
      model: GEMINI_TEXT_MODEL,
      config: {
        systemInstruction: `You are Caramel, a friendly and helpful AI HR assistant for ${BRAND_CONFIG.brand.organizationShortName}. Your goal is to guide employees through the career pathing tool, answer their HR-related questions, and provide information about ${BRAND_CONFIG.brand.organizationShortName}. Be encouraging and use a professional yet approachable tone. You can reference information about career paths, development, and general HR topics. Do not provide financial or legal advice. Refer complex or sensitive issues to a human HR representative.`,
      },
      // history: [] // Optionally, manage history if needed across sessions
    });
  }
  return chatInstance;
};

export const sendChatMessageStream = async function* (chat: Chat, message: string): AsyncGenerator<GenerateContentResponse, void, undefined> {
  // Check if it's the mock chat by checking for a property unique to the real Chat or not present in the mock in the same way
  // This check might need refinement based on how distinct the mock is.
  // For now, if API_KEY is missing, we assume it's the mock path from startChatSession.
  if (!API_KEY) { 
    // This path is for the mock scenario described in startChatSession
    // The mockChat.sendMessageStream already returns an AsyncGenerator (wrapped in a Promise)
    try {
        const stream = await chat.sendMessageStream({ message }); // This will call the mock's sendMessageStream
        for await (const chunk of stream) {
          yield chunk;
        }
    } catch(error) {
        console.error("Error in mock chat stream:", error);
        yield { text: "Error in mock chat. Please check console." } as GenerateContentResponse;
    }
    return;
  }
  
  try {
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      yield chunk;
    }
  } catch (error) {
    console.error("Error sending chat message stream:", error);
    yield { text: "Sorry, I encountered an error. Please try again." } as GenerateContentResponse; // Provide a user-friendly error in the stream
  }
};
