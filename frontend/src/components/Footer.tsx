import React from 'react'
import { Link } from 'react-router-dom'

const Footer=()=> {
  return (
    <div>
         {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to get started?</h3>
          <p className="text-gray-600 mb-6">
            Join thousands of professionals who found their dream job through MuseJobs
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <button className="px-6 py-2 bg-[#072E4A] text-white rounded-md hover:bg-[#051e33]">
                Get Started
              </button>
            </Link>
            <Link to="/jobs">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-hover:bg-[#051e33]">
                Browse Jobs
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
