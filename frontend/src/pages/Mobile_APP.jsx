import React from 'react';
import { assets } from '../new assests/frontend_assets/assets';

const Mobile_APP = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mobile App
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Order your favorite food on the go with our mobile app. 
            Available for both iOS and Android devices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* App Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Download Our Mobile App
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Experience the convenience of ordering food with just a few taps. 
                Our mobile app offers a seamless ordering experience with features 
                designed to make your dining experience better.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Quick Ordering</h3>
                  <p className="text-gray-600">Order your favorite meals in seconds with our streamlined interface.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Real-time Tracking</h3>
                  <p className="text-gray-600">Track your order in real-time and know exactly when it will arrive.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Secure Payments</h3>
                  <p className="text-gray-600">Multiple payment options with secure, encrypted transactions.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Personalized Experience</h3>
                  <p className="text-gray-600">Save your favorites and get personalized recommendations.</p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Download Now</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <img src={assets.app_store} alt="App Store" className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center justify-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <img src={assets.play_store} alt="Google Play" className="w-8 h-8" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* App Screenshot/Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🍕</div>
                  <h3 className="text-2xl font-bold mb-2">Tomato App</h3>
                  <p className="text-orange-100">Order delicious food</p>
                  <p className="text-orange-100">with ease</p>
                </div>
              </div>
              
              {/* Floating elements to simulate app interface */}
              <div className="absolute top-8 left-8 bg-white rounded-lg p-3 shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🍔</span>
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-white rounded-lg p-3 shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🍰</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose Our Mobile App?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized for speed with instant loading and smooth navigation.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is protected with industry-standard encryption.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">User Friendly</h3>
              <p className="text-gray-600">Intuitive design that makes ordering food simple and enjoyable.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile_APP;