import React from 'react';

function Fitness() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="text-center">
        <h1 className="text-5xl font-bold text-green-600">Fitness Tips</h1>
        <p className="text-lg text-gray-600 mt-2">Get fit with these health tips and workout routines!</p>
      </header>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">1. Start with a Warm-Up</h2>
        <p className="text-gray-600 mt-2">
          A good warm-up prepares your muscles for exercise and prevents injury. Start with 5–10 minutes of light cardio.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800">2. Hydrate Properly</h2>
        <p className="text-gray-600 mt-2">
          Water is essential to maintain your energy levels and optimize your performance. Drink before, during, and after your workout.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800">3. Incorporate Strength Training</h2>
        <p className="text-gray-600 mt-2">
          Strength training helps build muscle mass, increase metabolism, and improve endurance. Focus on compound movements like squats, push-ups, and deadlifts.
        </p>
      </section>
    </div>
  );
}

export default Fitness;
