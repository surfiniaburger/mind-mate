'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'



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
        angry: ['https://www.crossway.org/articles/11-passages-to-read-to-help-fight-anger/', 'https://store.faithlafayette.org/browse-by-topic/christian-life-and-growth/emotions-feelings/good-angry/', 'https://www.madebyteachers.com/products/when-sophie-gets-angry-really-really-angry-reading-resources-lessons/'],
        sad: ['https://priyaghose.io/2020-09-19-recommended-reading-when-youre-feeling-sad/', 'https://www.weareteachers.com/books-about-sadness/', 'https://www.betterhealth.vic.gov.au/health/healthyliving/its-okay-to-feel-sad'],
        worried: ['https://www.pegasus.health.nz/your-health/useful-links-resources/reading-in-mind/mental-health-books/anxiety-stress-worry/', 'https://www.robertmellors.notts.sch.uk/wp-content/uploads/sites/3/2020/04/Anxiety-Resource-Pack-2.pdf', 'https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself/Worry-and-Rumination'],
        confused: ['https://theaggie.org/2023/10/06/are-you-a-twenty-something-like-me-and-confused-about-everything-i-recommend-reading-some-nonfiction/', 'https://www.getepic.com/in/book/59922898/what-i-look-like-when-i-am-confused', 'https://www.commonlit.org/en/texts/the-value-of-being-confused'],
        disappointed: ['https://www.betterup.com/blog/disappointment', 'https://hbr.org/2018/08/dealing-with-disappointment', 'https://www.cbsnews.com/news/books-overcoming-disappointments/'],
        repulsed: ['https://www.goodtherapy.org/blog/disgusted-with-violence-0110121/', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5426557/', 'https://www.amazon.com/Disgusted-Learning-about-Emotions-Gaertner/dp/1503828077'],
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome Back!</h1>
      <div className="py-2 px-4 " >
          <Image src="/fresh.png" alt={'Fresh tomato Logo'} width={80} height={80} />
        </div>
      <form onSubmit={handleSubmit} className="text-center">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text here..."
          className="w-full h-32 border border-gray-300 rounded-md px-4 py-2 mb-4"
        />
        <br />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Send</button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {toneLabel && (
        <div className="mt-8 border border-gray-300 rounded-md p-4">
          <p className="mb-4">It seems like you are feeling  <strong>{toneLabel}</strong>.</p>
          {recommendations.length > 0 && (
            <div>
              <h4 className="mb-4">Here are some helpful tips:</h4>
              <ul className="list-disc pl-4">
                {recommendations.map((recommendation, index) => (
                  <li key={index}>
                    <Link href={recommendation} target="_blank" rel="noopener noreferrer">

                    {recommendation}

                    </Link>
                    </li>
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
