import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableMeasureProps {
  measure: string;
  measureIndex: number;
  onMeasureDrop: (droppedMeasure: string) => void;
}

const DraggableMeasurePage: React.FC<DraggableMeasureProps> = ({ measure, measureIndex, onMeasureDrop }) => {
 
  const [, drag] = useDrag({
    type: 'DRAGGABLE_MEASURE',
    item: { measure, measureIndex },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        onMeasureDrop(measure);
      }
    },
  });

  return (
    <div ref={drag}>
      <div
        style={{
          height: 'fit-content',
          padding: '1px',
          border: '1px solid',
          marginBottom: '8px',
        }}
      >
        {measure}
      </div>
    </div>
  );
};

export default DraggableMeasurePage;
