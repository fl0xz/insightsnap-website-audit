export default function TestCSSPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 1</h2>
          <p className="text-gray-600">This card should have gray background, rounded corners, and a shadow.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Button</button>
        </div>
        
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Card 2</h2>
          <p className="text-green-600">This card should have green background, rounded corners, and a shadow.</p>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Button</button>
        </div>
        
        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">Card 3</h2>
          <p className="text-purple-600">This card should have purple background, rounded corners, and a shadow.</p>
          <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">Button</button>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="h-16 w-16 bg-red-500 rounded-full"></div>
        <div className="h-16 w-16 bg-yellow-500 rounded-full"></div>
        <div className="h-16 w-16 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
} 