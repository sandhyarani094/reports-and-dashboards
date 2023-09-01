import { Steps } from "primereact/steps";
import { useState, useEffect } from "react";
import DatasourceSelection from "./DatasorceSelection";
import FactDetail from "./FactDetail";
import FactTable from "./FactTable";
import FactMappingDetail from "./FactMappingDetailPage";
import DimensionPage from "./DimensionPage";
import { FactMappingData } from "@/shared/constants/models/Cube";
import MappingTablesPage from "./MappingTablesPage";

const CubePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabActive, setActiveTab] = useState(false);
  const [factTableMappingData, setFactTableMappingData] = useState<FactMappingData>(new FactMappingData());

  const [completedSteps, setCompletedSteps] = useState(
    new Array(7).fill(false)
  );

  const handleNextStep = () => {
    if (activeIndex < tabs.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const updateCompletedSteps = (index: any) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = true;
    setCompletedSteps(newCompletedSteps);
  };

  const tabs = [
    {
      label: "Datasource Selection",
      content: (
        <DatasourceSelection
          onNext={handleNextStep}
          setActiveTab={setActiveTab}
        />
      ),
    },
    {
      label: "Fact Table",
      content: <FactTable onNext={handleNextStep} />,
    },
    {
      label: "Fact mapping Table",
      content: <FactMappingDetail 
      onNext={handleNextStep}
        factTableMappingData={factTableMappingData} setFactTableMappingData={setFactTableMappingData}
         />,
    },
    {
      label: "Dimension",
      content: <DimensionPage setActiveIndex={setActiveIndex}
        activeIndex={activeIndex} />,
    },
    {
      label: "Mapping Table",
      content: <MappingTablesPage />,
    },
  ];

  return (
    <div className="grid">
      <div className="col-12">
        <Steps
          model={tabs}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={isTabActive ? false : true}
        />
        <div className="col-12 p-5">{tabs[activeIndex].content}</div>
      </div>
    </div>
  );
};

export default CubePage;
