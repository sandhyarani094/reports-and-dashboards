import { useDrop, DropTargetMonitor, DropTargetHookSpec } from 'react-dnd';
import React from 'react';

interface DroppableMeasuresProps {
  onMeasureDrop: (droppedMeasure: string) => void;
}

const DroppableMeasures: React.FC<DroppableMeasuresProps> = ({ onMeasureDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'DRAGGABLE_MEASURE',
    drop: (item: { measure: string }) => {
      onMeasureDrop(item.measure);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`droppable ${isOver ? 'active' : ''}`}>
      <h6 style={{ color: 'white' }}>Measures</h6>
      {/* Render the DraggableMeasurePage components here */}
    </div>
  );
};

export default DroppableMeasures;
