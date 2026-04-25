const DEEPGRAM_API_KEY = process.env.DEEPGRAM_KEY || process.env.DEEPGRAM_KEY_ALT || "";
const DEEPGRAM_TTS_MODEL = "aura-2-thalia-en";

export interface DeepgramTTSRequest {
  text: string;
  model?: string;
  encoding?: "linear16" | "ulaw" | "opus" | "mp3";
}

export interface DeepgramTTSResponse {
  audioData: ArrayBuffer;
  contentType: string;
  duration?: number;
}

export async function deepgramTextToSpeech(request: DeepgramTTSRequest): Promise<DeepgramTTSResponse> {
  if (!DEEPGRAM_API_KEY) {
    throw new Error("DEEPGRAM_KEY environment variable is not set");
  }

  const response = await fetch("https://api.deepgram.com/v1/speak?model=" + (request.model || DEEPGRAM_TTS_MODEL), {
    method: "POST",
    headers: {
      Authorization: `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: request.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Deepgram TTS failed: ${response.statusText}`);
  }

  const audioData = await response.arrayBuffer();
  return {
    audioData,
    contentType: response.headers.get("content-type") || "audio/mpeg",
  };
}

export async function batchTextToSpeech(texts: string[]): Promise<{ audioData: ArrayBuffer; text: string }[]> {
  const results: { audioData: ArrayBuffer; text: string }[] = [];

  for (const text of texts) {
    const response = await deepgramTextToSpeech({ text });
    results.push({
      audioData: response.audioData,
      text,
    });
  }

  return results;
}

export function audioBufferToDataUrl(audioData: ArrayBuffer, contentType: string): string {
  const blob = new Blob([audioData], { type: contentType });
  return URL.createObjectURL(blob);
}
