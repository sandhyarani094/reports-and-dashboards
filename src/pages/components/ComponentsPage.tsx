import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'

const ComponentsPage = () => {

  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];
  const allMeasuresValues = [
    'Measure Value 1',
    'Measure Value 2',
    'Measure Value 3'
  ];

  return (
    <div className='grid'>
      <div className="col-12">
        <center><h5>Component</h5></center>
      </div>
      <div className="col-12">
        <div className="grid">
          <div className="col-3">
            <div className="grid">
              <div className="col-12" style={{ background: '#0abaf2' }}>
                <h6 style={{ color: 'white' }}>CUBE</h6>
              </div>
              <div className="col-12">
                <Dropdown
                  className='w-full'
                  placeholder='Select One'
                  options={dropdownOptions}
                  onChange={(e) => setSelectedOption(e.value)}
                  value={selectedOption}
                />
              </div>
              <div className="col-12" style={{ background: '#0abaf2' }}>
                <h6 style={{ color: 'white' }}>All Measures</h6>
              </div>
              <div className="col-12">
                {allMeasuresValues.map((measureValue, index) => (
                  <input
                    key={index}
                    className='w-full'
                    value={measureValue}
                    readOnly
                  />
                ))}
              </div>
              <div className="col-12" style={{ background: '#0abaf2' }}>
                <h6 style={{ color: 'white' }}>Dimension</h6>
              </div>
              <div className="col-12">
                <Dropdown
                  className='w-full'
                  placeholder='Select One'
                />
              </div>
              <div className="col-12" style={{ background: '#0abaf2' }}>
                <h6 style={{ color: 'white' }}>All Dimension</h6>
              </div>

            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-3">
            <div className="grid">
              <div className="col-12" style={{ background: '#0abaf2' }}>
                <h6 style={{ color: 'white' }}>Measures</h6>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-4">
            <div className="grid">
              <div className="col-12" style={{ background: '#0abaf2' }}>
                <h6 style={{ color: 'white' }}>Charts</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentsPage
