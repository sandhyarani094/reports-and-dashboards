
import { ComponentService } from '@/HttpServices/ComponentService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { ListBox } from 'primereact/listbox';
import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';

interface ControlItemProp {
  index: number;
  controlItem: { label: string; value: number };
}

const ComponentsPage = () => {
  const componentService = new ComponentService();
  const [CubesData, setCubesData] = useState([]);
  let [cubeId, setCubeId] = useState(null);
  const [dimesionData, setDimensionData] = useState([]);
  const [dimesionId, setDimensionId] = useState(null);


  const [selectedCity, setSelectedCity] = useState(null);

  const dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  useEffect(() => {
    findAllCubes();
  }, [])

  const findAllCubes = () => {
    componentService.getAllCubes().then((res) => {
      setCubesData(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  const findAllDimension = () => {
    componentService.getAllDimensions(cubeId).then((res) => {
      console.log(res);
      setDimensionData(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleChangeCube = (e: DropdownChangeEvent) => {
    cubeId = e.value;
    setCubeId(e.value);
    findAllDimension();
  }

  const ControlItem = ({ index, controlItem }: ControlItemProp) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "measures",
      item: { index, controlItem, type: "measures" },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }));

    [index,controlItem]
    
    return (
      <li ref={drag} className="p-listbox-item draggable no-select">
        {controlItem.label}
      </li>
    );
  };
  const items = Array.from({ length: 100 }).map((_, i) => ({ label: `Measure Value ${i}`, value: i }));

  return (
    
    <div className='grid'>
      <div className="col-12">
        <div className="grid">
          <div className="col-3 ">
            <div className="col-12 text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Cube</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <Dropdown
                style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
                className='w-full'
                placeholder='Select One'
                options={CubesData}
                onChange={(e) => handleChangeCube(e)}
                value={cubeId}
                optionValue='id'
                optionLabel='cubeName'
              />
            </div>
            <div className="col-12 text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>All Measures</h6>
            </div>
          
            <div className="col-12 px-0 pt-0">
            <div className="measure-list">
              <div className="p-listbox-list-wrapper">
                <ul className="p-listbox-list">
                  {items.map((controlItem, index) => {
                    return (
                      <ControlItem
                        key={index}
                        index={index}
                        controlItem={controlItem}
                      />
                    );
                  })}
                </ul>
              </div>
             </div>
            </div>
            <div className="col-12 text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Dimension</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <Dropdown
                style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
                className='w-full'
                placeholder='Select One'
                options={dimesionData}
                onChange={(e) => setDimensionId(e.value)}
                value={dimesionId}
                optionValue='id'
              />
            </div>
            <div className="col-12 text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>All Dimension</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{ borderTopLeftRadius: "0" }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '170px' }}
              />
            </div>
          </div>
          <div className="col-3 ">
            <div className="col-12  text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Measures</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <div style={{width: '38vh', height:'15vh', border:'1px solid #ced4da'}}></div>
            </div>
            <div className="col-12  text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Dimensions</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{ borderTopLeftRadius: "0" }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '153px' }}
              />
            </div>
            <div className="col-12  text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Filter</h6>
            </div>
            <div className="col-12 px-0 pt-0">
              <ListBox
                style={{ borderTopLeftRadius: "0" }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={items}
                className="w-full"
                listStyle={{ height: '153px' }}
              />
            </div>
          </div>
          <div className="col-6 ">
            <div className="col-12  text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Charts</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default ComponentsPage
