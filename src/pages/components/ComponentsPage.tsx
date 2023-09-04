import { Dropdown } from 'primereact/dropdown'
import React, { useState, useRef } from 'react'
import DraggableMeasurePage from './_DraggableMeasures/DraggableMeasurePage';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DroppableMeasuresPage from './_DraggableMeasures/DroppableMeasurePage';

interface Measure {
  id: number;
  value: string;
}

const ComponentsPage = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [droppedMeasures, setDroppedMeasures] = useState<string[]>([]);

  const dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  const allMeasuresValues: Measure[] = [
    { id: 1, value: 'Measure Value 1' },
    { id: 2, value: 'Measure Value 2' },
    { id: 3, value: 'Measure Value 3' },
    { id: 4, value: 'Measure Value 4' },
  ];

  const measurePageRef = useRef(null);
  
  const handleMeasureDrop = (droppedMeasure: string) => {
    setDroppedMeasures([...droppedMeasures, droppedMeasure]);
  };

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
              <DndProvider backend={HTML5Backend}>
                <div ref={measurePageRef} className="grid">
                  <div className="col-12">
                    {allMeasuresValues.map((measure, index) => (
                      <DraggableMeasurePage
                        key={index}
                        measure={measure.value}
                        measureIndex={index}
                        onMeasureDrop={handleMeasureDrop}
                      />
                    ))}
                  </div>
                </div>
                </DndProvider>
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
          <div ref={measurePageRef} className="grid">
            <h6 style={{ color: 'white' }}>Measures</h6>
            <DroppableMeasuresPage onMeasureDrop={handleMeasureDrop} />
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
