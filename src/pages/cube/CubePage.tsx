import { Steps } from "primereact/steps";
import { useState, useEffect } from "react";
import DatasourceSelection from "./DatasorceSelection";
import FactDetail from "./FactDetail";
import FactTable from "./FactTable";
import FactMappingDetail from "./FactMappingDetailPage";

const CubePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabActive, setActiveTab] = useState(false);
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
      content: <FactMappingDetail onNext={handleNextStep}/>,
    },
    {
      label: "Dimension",
      content: <FactDetail />,
    },
    {
      label: "Mapping Table",
      content: <FactDetail />,
    },
  ];

  return (
    <div className="grid">
      <div className="col-6">
        <h5>Create Workflow Rule</h5>
      </div>
      <div className="col-12">
        <Steps
          model={tabs}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={isTabActive ? false : true}
        />
        <div className="col-12">{tabs[activeIndex].content}</div>
      </div>
    </div>
  );
};

export default CubePage;
