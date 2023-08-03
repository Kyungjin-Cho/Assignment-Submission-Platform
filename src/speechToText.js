import speech from "@google-cloud/speech";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

const client = new speech.SpeechClient();

export const transcribeAudio = async (videoPath) => {
  return new Promise((resolve, reject) => {
    // Define the path for the extracted audio file
    const audioPath = path.join(__dirname, 'temp_audio.wav');

    // Extract the audio using ffmpeg
    ffmpeg(videoPath)
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .audioFrequency(16000)
      .outputFormat('wav')
      .on('end', () => {
        // Read the extracted audio file
        fs.readFile(audioPath, async (err, audioBuffer) => {
          if (err) return reject(err);

          // The audio file's encoding, sample rate in hertz, and BCP-47 language code
          const audio = {
            content: audioBuffer, // The audio data in a buffer
          };
          const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
          };
          const request = {
            audio: audio,
            config: config,
          };

          // Transcribe the audio using the Speech-to-Text API
          const [response] = await client.recognize(request);
          const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');

          // Delete the temporary audio file
          fs.unlink(audioPath, (err) => {
            if (err) console.warn(`Failed to delete temporary file ${audioPath}: ${err}`);
          });

          resolve(transcription);
        });
      })
      .on('error', reject)
      .save(audioPath);
  });
};
