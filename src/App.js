import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Search, Star, TrendingUp, User, Check, ChevronRight, Heart, MessageCircle, X } from 'lucide-react';

// Separate Create Form Component to prevent re-renders
const CreateForm = ({ onPublish, onCancel }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('morning');
  const [description, setDescription] = useState('');
  const [stops, setStops] = useState([]);
  const [stopName, setStopName] = useState('');
  const [stopDescription, setStopDescription] = useState('');
  const [stopLocation, setStopLocation] = useState('');

  const categories = [
    { id: 'morning', label: 'Morning' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'evening', label: 'Evening' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'culture', label: 'Culture' }
  ];

  const addStop = () => {
    if (stopName && stopDescription) {
      setStops([...stops, {
        name: stopName,
        description: stopDescription,
        location: stopLocation,
        completed: false
      }]);
      setStopName('');
      setStopDescription('');
      setStopLocation('');
    }
  };

  const removeStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (title && location && stops.length > 0) {
      onPublish({
        title,
        location,
        category,
        description,
        stops,
        id: Date.now().toString(),
        creator: 'You',
        rating: 0,
        reviews: 0,
        likes: 0
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Create Experience</h1>
        <p className="text-white/90">Share your perfect journey with others</p>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Title</label>
          <input
            type="text"
            placeholder="e.g., Perfect Saturday Morning in Oakland"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="e.g., Oakland, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Describe your experience in a few words..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="3"
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add Stops</h3>

          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Stop name"
              value={stopName}
              onChange={(e) => setStopName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <textarea
              placeholder="Description of what to do here"
              value={stopDescription}
              onChange={(e) => setStopDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows="2"
            />
            <input
              type="text"
              placeholder="Specific location (optional)"
              value={stopLocation}
              onChange={(e) => setStopLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={addStop}
              className="w-full bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Stop
            </button>
          </div>

          {stops.length > 0 && (
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-700">Stops ({stops.length})</h4>
              {stops.map((stop, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg flex items-start gap-3">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800">{stop.name}</div>
                    <div className="text-sm text-gray-600">{stop.description}</div>
                  </div>
                  <button
                    onClick={() => removeStop(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handlePublish}
            disabled={!title || !location || stops.length === 0}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Publish Experience
          </button>
        </div>
      </div>
    </div>
  );
};

const JourneyApp = () => {
  const [view, setView] = useState('browse');
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const stored = localStorage.getItem('experiences');
      if (stored) {
        setExperiences(JSON.parse(stored));
      } else {
        const sampleData = [
          {
            id: '1',
            title: 'Perfect Saturday Morning in Oakland',
            location: 'Oakland, CA',
            category: 'morning',
            description: 'Start your weekend right with yoga, fresh produce, and local shopping',
            creator: 'Sarah M.',
            rating: 4.8,
            reviews: 24,
            likes: 156,
            stops: [
              { name: 'Sunrise Yoga at Grand Lake', description: 'Join a peaceful yoga class overlooking the lake. Perfect for all levels!', location: 'Grand Lake', completed: false },
              { name: 'Grand Lake Farmers Market', description: 'Browse fresh produce, artisan goods, and grab some flowers', location: 'Grand Ave', completed: false },
              { name: 'Oaklandish Boutique', description: 'Support local and pick up some Oakland pride apparel', location: 'Downtown Oakland', completed: false }
            ]
          },
          {
            id: '2',
            title: 'Mission District Food Crawl',
            location: 'San Francisco, CA',
            category: 'food',
            description: 'Taste the best of the Mission in one delicious afternoon',
            creator: 'Miguel R.',
            rating: 4.9,
            reviews: 89,
            likes: 342,
            stops: [
              { name: 'La Taqueria', description: 'Start with the best burrito in SF - get the carne asada', location: '2889 Mission St', completed: false },
              { name: 'Dandelion Chocolate', description: 'Tour the chocolate factory and sample single-origin treats', location: 'Valencia St', completed: false },
              { name: 'Humphry Slocombe', description: 'End with creative ice cream flavors you won\'t find anywhere else', location: 'Guerrero St', completed: false }
            ]
          },
          {
            id: '3',
            title: 'Romantic Evening in Napa',
            location: 'Napa, CA',
            category: 'evening',
            description: 'Wine, dine, and stargaze in wine country',
            creator: 'Elena K.',
            rating: 5.0,
            reviews: 45,
            likes: 278,
            stops: [
              { name: 'Sunset Wine Tasting', description: 'Visit a hilltop winery for golden hour views and Cabernet', location: 'Napa Valley', completed: false },
              { name: 'French Laundry Dinner', description: 'Splurge on an unforgettable tasting menu (book months ahead!)', location: 'Yountville', completed: false },
              { name: 'Stargazing at Skyline Park', description: 'End the night under the stars away from city lights', location: 'Napa', completed: false }
            ]
          }
        ];
        setExperiences(sampleData);
        localStorage.setItem('experiences', JSON.stringify(sampleData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setExperiences([]);
    }
  };

  const saveExperiences = (updatedExperiences) => {
    try {
      localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
      setExperiences(updatedExperiences);
    } catch (error) {
      console.error('Error saving experiences:', error);
    }
  };

  const handlePublishExperience = (newExperience) => {
    const updated = [...experiences, newExperience];
    saveExperiences(updated);
    setView('browse');
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'morning', label: 'Morning' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'evening', label: 'Evening' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'culture', label: 'Culture' }
  ];

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const startExperience = (exp) => {
    setSelectedExperience(exp);
    setCurrentStep(0);
    setCompletedSteps([]);
    setView('experience');
  };

  const completeStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < selectedExperience.stops.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const viewDetails = (exp) => {
    setSelectedExperience(exp);
    setView('detail');
  };

  const BrowseView = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Discover Experiences</h1>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by location or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  filterCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredExperiences.map(exp => (
          <div
            key={exp.id}
            onClick={() => viewDetails(exp)}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{exp.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{exp.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{exp.stops.length} stops</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {exp.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {exp.reviews}
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">by {exp.creator}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const DetailView = () => (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <button onClick={() => setView('browse')} className="mb-4 text-white/80 hover:text-white">
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-2">{selectedExperience.title}</h1>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{selectedExperience.location}</span>
        </div>
        <p className="text-white/90 mb-4">{selectedExperience.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-white" />
            <span>{selectedExperience.rating} ({selectedExperience.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{selectedExperience.likes} likes</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Journey Stops</h2>
        <div className="space-y-3">
          {selectedExperience.stops.map((stop, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stop.description}</p>
                  {stop.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <MapPin className="w-3 h-3" />
                      {stop.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => startExperience(selectedExperience)}
          className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          Start This Experience
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const ExperienceView = () => {
    const currentStopData = selectedExperience.stops[currentStep];
    const progress = ((completedSteps.length) / selectedExperience.stops.length) * 100;
    const isCompleted = completedSteps.includes(currentStep);
    const allCompleted = completedSteps.length === selectedExperience.stops.length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
        <div className="bg-white shadow-md p-4">
          <button onClick={() => setView('detail')} className="text-gray-600 mb-2">
            ← Exit Experience
          </button>
          <h2 className="font-bold text-gray-800">{selectedExperience.title}</h2>
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{completedSteps.length}/{selectedExperience.stops.length} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {allCompleted ? (
          <div className="p-6 text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Experience Complete!</h2>
            <p className="text-gray-600 mb-6">You've finished all stops in this journey</p>
            <button
              onClick={() => setView('browse')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Discover More Experiences
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {currentStep + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Stop {currentStep + 1} of {selectedExperience.stops.length}</div>
                  <h3 className="text-xl font-bold text-gray-800">{currentStopData.name}</h3>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{currentStopData.description}</p>

              {currentStopData.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{currentStopData.location}</span>
                </div>
              )}

              {isCompleted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-700">Completed!</span>
                </div>
              ) : (
                <button
                  onClick={completeStep}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Complete This Stop
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold text-gray-800 mb-3">All Stops</h4>
              <div className="space-y-2">
                {selectedExperience.stops.map((stop, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      idx === currentStep ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      completedSteps.includes(idx)
                        ? 'bg-green-500 text-white'
                        : idx === currentStep
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {completedSteps.includes(idx) ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className={`text-sm ${
                      idx === currentStep ? 'font-semibold text-gray-800' : 'text-gray-600'
                    }`}>
                      {stop.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around">
      <button
        onClick={() => setView('browse')}
        className={`flex flex-col items-center gap-1 ${view === 'browse' || view === 'detail' ? 'text-blue-600' : 'text-gray-400'}`}
      >
        <Search className="w-6 h-6" />
        <span className="text-xs font-medium">Browse</span>
      </button>
      <button
        onClick={() => setView('create')}
        className={`flex flex-col items-center gap-1 ${view === 'create' ? 'text-green-600' : 'text-gray-400'}`}
      >
        <Plus className="w-6 h-6" />
        <span className="text-xs font-medium">Create</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <TrendingUp className="w-6 h-6" />
        <span className="text-xs font-medium">Trending</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400">
        <User className="w-6 h-6" />
        <span className="text-xs font-medium">Profile</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white">
      {view === 'browse' && <BrowseView />}
      {view === 'detail' && <DetailView />}
      {view === 'experience' && <ExperienceView />}
      {view === 'create' && <CreateForm onPublish={handlePublishExperience} onCancel={() => setView('browse')} />}
      <BottomNav />
    </div>
  );
};

export default JourneyApp;
