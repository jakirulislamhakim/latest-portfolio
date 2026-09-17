'use client';
import { Button } from '@base-ui/react';

export default function HomePage() {
  return (
    <div>
      <main>
        <h1>Hello from Jakirul Islam Hakim portfolio</h1>

        <Button
          onClick={() => {
            throw new Error('Throw a error from client side');
          }}
        >
          Throw a error
        </Button>
      </main>
    </div>
  );
}
