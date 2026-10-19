import 'dotenv/config';
import express from 'express';
import process from 'node:process';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = Number(process.env.API_PORT || 3001);
const MAX_PROMPT_LENGTH = 4000;

app.use(express.json({ limit: '15mb' }));

const allowedRatios = ['16:9', '4:3', '1:1', '9:16', '3:4'];
const allowedResolutions = ['1K', '2K', '4K'];
const allowedImageTypes = ['image/png', 'image/jpeg', 'image/webp'];

function parseImageDataUrl(value: unknown) {
  if (typeof value !== 'string') return null;

  const match = value.match(
    /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/
  );

  if (!match || !allowedImageTypes.includes(match[1])) return null;

  return { mimeType: match[1], data: match[2] };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error: 'Backend chưa được cấu hình GEMINI_API_KEY.',
      });
      return;
    }

    const {
      prompt,
      mode,
      style,
      buildingType,
      lighting,
      weather,
      context,
      aspectRatio,
      resolution,
      imageCount,
      uploadedImage,
      refImages,
      hasWatermark,
    } = req.body ?? {};

    if (typeof prompt !== 'string' || !prompt.trim()) {
      res.status(400).json({ error: 'Vui lòng nhập mô tả ảnh.' });
      return;
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      res.status(400).json({ error: 'Mô tả quá dài.' });
      return;
    }

    if (!allowedRatios.includes(aspectRatio)) {
      res.status(400).json({ error: 'Tỷ lệ ảnh không hợp lệ.' });
      return;
    }

    const requestedResolution =
      resolution === 'Standard' ? '1K' : resolution;

    if (!allowedResolutions.includes(requestedResolution)) {
      res.status(400).json({ error: 'Độ phân giải không hợp lệ.' });
      return;
    }

    if (
      !Number.isInteger(imageCount) ||
      imageCount < 1 ||
      imageCount > 4
    ) {
      res.status(400).json({ error: 'Số ảnh phải từ 1 đến 4.' });
      return;
    }

    const sourceImage = uploadedImage
      ? parseImageDataUrl(uploadedImage)
      : null;

    if (uploadedImage && !sourceImage) {
      res.status(400).json({
        error: 'Ảnh tải lên không hợp lệ. Hãy dùng PNG, JPEG hoặc WebP.',
      });
      return;
    }

    const references = Array.isArray(refImages)
      ? refImages.slice(0, 3).map(parseImageDataUrl)
      : [];

    if (references.some((image) => image === null)) {
      res.status(400).json({
        error: 'Ảnh tham khảo không hợp lệ. Hãy dùng PNG, JPEG hoặc WebP.',
      });
      return;
    }

    const details = [
      `Loại công trình: ${String(buildingType || mode || 'Kiến trúc')}`,
      `Chế độ: ${String(mode || 'architecture')}`,
      `Phong cách: ${String(style || 'Modern Minimalist')}`,
      `Ánh sáng: ${String(lighting || 'Tự nhiên')}`,
      `Thời tiết: ${String(weather || 'Trời quang')}`,
      `Bối cảnh: ${String(context || 'Không xác định')}`,
      `Tỷ lệ khung hình: ${aspectRatio}`,
      hasWatermark ? 'Yêu cầu watermark hiển thị trong ảnh.' : '',
    ].filter(Boolean).join('\n');

    const fullPrompt = [
      'Create a high-quality architectural visualization.',
      'Follow the requested architectural details and preserve realistic geometry, materials, lighting, and perspective.',
      details,
      `User description: ${prompt.trim()}`,
      sourceImage
        ? 'Use the first attached image as the primary source. Transform it according to the description while preserving relevant structure.'
        : '',
      references.length
        ? 'Use the other attached images as visual references for style, materials, or mood.'
        : '',
    ].filter(Boolean).join('\n\n');

    const ai = new GoogleGenAI({ apiKey });
    const imageInputs = [sourceImage, ...references].filter(
      (image): image is NonNullable<typeof image> => image !== null
    );

    const images: string[] = [];

    // Generate each image with a real Gemini API request.
    for (let i = 0; i < imageCount; i += 1) {
      const parts = [
        { text: fullPrompt },
        ...imageInputs.map((image) => ({
          inlineData: {
            mimeType: image.mimeType,
            data: image.data,
          },
        })),
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: parts,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          responseFormat: {
            image: {
              aspectRatio,
              imageSize: requestedResolution,
            },
          },
        },
      });

      const generatedPart = response.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .find((part) => part.inlineData?.data);

      if (!generatedPart?.inlineData?.data) {
        console.error('Gemini returned no image data.');
        res.status(502).json({
          error: 'Gemini chưa trả về ảnh. Hãy thử mô tả khác.',
        });
        return;
      }

      const mimeType = generatedPart.inlineData.mimeType || 'image/png';
      images.push(
        `data:${mimeType};base64,${generatedPart.inlineData.data}`
      );
    }

    res.json({ images });
  } catch (error) {
    console.error('Image generation request failed:', error);
    res.status(502).json({
      error: 'Không thể tạo ảnh lúc này. Hãy kiểm tra cấu hình API hoặc thử lại.',
    });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`AchiPics API listening on http://127.0.0.1:${PORT}`);
});
