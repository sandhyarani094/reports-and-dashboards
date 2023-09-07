import { ComponentService } from '@/httpServices/ComponentService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { ListBox } from 'primereact/listbox';
import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';

interface MeasureItemProp {
  index: number;
  measureItem: { label: string; value: number };
}

const items = Array.from({ length: 50 }).map((_, i) => ({ label: `Measure Value ${i}`, value: i }));

const ComponentsPage = () => {
  const componentService = new ComponentService();
  const [CubesData, setCubesData] = useState([]);
  let [cubeId, setCubeId] = useState(null);
  const [dimesionData, setDimensionData] = useState([]);
  const [dimesionId, setDimensionId] = useState(null);
  const [measureList, setMeasureList] = useState(items);
  const [droppedItems, setDroppedItems] = useState<any>([]);

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

  const handleDropMeasure = (index: number, measureItem: any) => {
    const updatedDraggableItems = [...measureList];
    updatedDraggableItems.splice(index, 1);
    setMeasureList(updatedDraggableItems);
    setDroppedItems([...droppedItems, measureItem]);
  };

  const MeasureItem = ({ index, measureItem }: MeasureItemProp) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "measures",
      item: { index, measureItem, type: "measures" },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }));

    [index, measureItem]

    return (
      <li ref={drag} className="p-listbox-item draggable no-select">
        {measureItem.label}
      </li>
    );
  };

  const [, drop] = useDrop({
    accept: "measures",
    drop: (item: any) => {
      const index = item.index; 
      const measureItem = item.measureItem; 
      handleDropMeasure(index, measureItem);
    },
  });

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
                <ul className="p-listbox-list">
                  {measureList.map((measureItem, index) => {
                    return (
                      <MeasureItem
                        key={index}
                        index={index}
                        measureItem={measureItem}
                      />
                    );
                  })}
                </ul>
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
              <div className="measure-list">
                <div className="p-listbox-list-wrapper">
                  <ul className="p-listbox-list">
                    {measureList.map((measureItem, index) => {
                      return (
                        <MeasureItem
                          key={index}
                          index={index}
                          measureItem={measureItem}
                        />
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 ">
            <div className="col-12  text-center bg-blue-100" style={{
              backgroundColor: 'var(--highlight-bg)',
              borderRadius: 'var(--border-radius)', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"
            }}>
              <h6 className='m-0' style={{ color: 'black' }}>Measures</h6>
            </div>
            <div
              className='col-3 mb-3'
              ref={drop}
              style={{ width: '38vh', height: '25vh', border: '1px solid #ced4da', overflow: "auto", borderRadius:"4%" }}
            >
              {droppedItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{padding:"0.5rem"}}>{item.label}</div>
                  <i
                    className='pi pi-cog ml-5' 
                    style={{ cursor: 'pointer'}} 
                    onClick={() => console.log('handleDeleteItem(index)')} 
                  />
                  <i
                    className='pi pi-trash mr-2' 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => console.log('handleDeleteItem(index)')} 
                  />
                </div>
              ))}
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
