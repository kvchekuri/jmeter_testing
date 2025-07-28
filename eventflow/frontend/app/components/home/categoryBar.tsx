import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';

const categories = ["Music", "Workshop", "Technology", "Art", "Nightlife", "Business"];

export const CategoryBar = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="w-full flex justify-center my-6">
      <Stack direction="horizontal" gap={3} className="flex-wrap justify-center w-full max-w-5xl">
        {categories.map(cat => (
          <Button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-pill px-4 py-2 fw-semibold mx-1 mb-2
              ${active === cat
                ? 'text-white fw-bold'
                : 'text-dark border border-gray-300 bg-white'
              }`}
            style={active === cat
              ? { backgroundColor: '#f15a29', border: 'none' }
              : { backgroundColor: '#fff', borderColor: '#e0e0e0' }
            }
          >
            {cat}
          </Button>
        ))}
      </Stack>
    </div>
  );
};