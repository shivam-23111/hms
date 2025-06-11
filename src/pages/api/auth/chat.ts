// src/pages/api/auth/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const togetherRes = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
     model: "deepseek-ai/DeepSeek-V3", // You can also use 70b model
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer d969e7b00f06dd88b84e58269177bca88fc06efa535f2898eaa307f267a8f16d`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = togetherRes.data.choices[0]?.message?.content || 'No reply';
    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('LLaMA API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'LLaMA Error: ' + error.message });
  }
}
