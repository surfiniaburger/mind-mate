'use client'
import React, { useState } from 'react';
import axios from 'axios';



// Define the type for toneRecommendations
interface ToneRecommendations {
  angry: string[];
  sad: string[];
  worried: string[];
  confused: string[];
  disappointed: string[];
  repulsed: string[];
}


export default function App() {
  const [inputText, setInputText] = useState('');
  const [toneLabel, setToneLabel] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(event.target.value);
  };

  const apikey = process.env.SAPLING_PRIVATE_KEY

  const run = async (text: string) => {
    try {
      const response = await axios.post(
        'https://api.sapling.ai/api/v1/tone',
        {
          key: 'G79QP21IU6Z7LPH656MFU9DJLPIZK5VC',
          text,
        }
      );
      const { data } = response;

      // Initialize toneRecommendations
      const toneRecommendations: ToneRecommendations = {
        angry: ['Link 1', 'Link 2', 'Link 3'],
        sad: ['Link 4', 'Link 5', 'Link 6'],
        worried: ['Link 7', 'Link 8', 'Link 9'],
        confused: ['Link 10', 'Link 11', 'Link 12'],
        disappointed: ['Link 13', 'Link 14', 'Link 15'],
        repulsed: ['Link 16', 'Link 17', 'Link 18'],
        };
      // Ensure data and overall exist before accessing
      const firstResult: keyof ToneRecommendations = data?.overall?.[0]?.[1] || '';

      // Set tone label
      setToneLabel(firstResult);

      // Set recommendations based on firstResult
      if (firstResult in toneRecommendations) {
        setRecommendations(toneRecommendations[firstResult]);
    } else {
        // Handle the case where firstResult is not a valid key
        setRecommendations([]);
    }

      setError('');
    } catch (err) {
      // Handle errors
      if (axios.isAxiosError(err)) {
        // If it's an Axios error
        const response = err.response;
        if (response && response.data) {
            // If there's a response and data exists
            const { msg } = response.data;
            setToneLabel('');
            setRecommendations([]);
            setError(msg);
        } else {
            // If there's no response or data
            setToneLabel('');
            setRecommendations([]);
            setError('An unexpected error occurred.');
        }
    } else {
        // If it's not an Axios error
        setToneLabel('');
        setRecommendations([]);
        setError('An unexpected error occurred.');
    }
    }
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    run(inputText);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Sapling Tone Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text here..."
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit">Send</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {toneLabel && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h3>Tone Analysis Result:</h3>
          <p>The tone of the input text is: <strong>{toneLabel}</strong></p>
          {recommendations.length > 0 && (
            <div>
              <h4>Recommendations:</h4>
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          )}
          {recommendations.length === 0 && (
            <p>Have an ice cream or dance!</p>
          )}
        </div>
      )}
    </div>
  );
}
