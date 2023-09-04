import { Dropdown } from 'primereact/dropdown'
import { ListBox } from 'primereact/listbox';
import React, { useState } from 'react'

const ComponentsPage = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
  const items = Array.from({ length: 100 }).map((_, i) => ({ label: `Measure Value ${i}`, value: i }));

  return (
    <div className='grid'>
      <div className="col-12">
        <div className="grid">
          <div className="col-3 ">
            <div className="col-12 text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>Cube</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <Dropdown
                style={{borderTopLeftRadius:'0', borderTopRightRadius:'0'}}
                className='w-full'
                placeholder='Select One'
                options={dropdownOptions}
                onChange={(e) => setSelectedOption(e.value)}
                value={selectedOption}
              />
            </div>
            <div className="col-12 text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>All Measures</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{borderTopLeftRadius:"0"}}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '160px' }}
              />
            </div>
            <div className="col-12 text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>Dimension</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <Dropdown
                style={{borderTopLeftRadius:'0', borderTopRightRadius:'0'}}
                className='w-full'
                placeholder='Select One'
                options={dropdownOptions}
                onChange={(e) => setSelectedOption(e.value)}
                value={selectedOption}
              />
            </div>
            <div className="col-12 text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>All Dimension</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{borderTopLeftRadius:"0"}}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '160px' }}
              />
            </div>
          </div>
          <div className="col-3 ">
            <div className="col-12  text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>Measures</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{borderTopLeftRadius:"0"}}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '145px' }}
              />
            </div>
            <div className="col-12  text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>Dimensions</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{borderTopLeftRadius:"0"}}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '145px' }}
              />
            </div>
            <div className="col-12  text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>Filter</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{borderTopLeftRadius:"0"}}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '145px' }}
              />
            </div>
          </div>
          <div className="col-6 ">
            <div className="col-12  text-center" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: '#6366F1' }}>Charts</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <Dropdown
                style={{borderTopLeftRadius:'0', borderTopRightRadius:'0'}}
                className='w-full'
                placeholder='Select One'
                options={dropdownOptions}
                onChange={(e) => setSelectedOption(e.value)}
                value={selectedOption}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentsPage
