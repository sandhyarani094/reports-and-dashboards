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

  const tabs = [
    {
      label: "Datasource Selection",
      content: (
        <DatasourceSelection
          setActiveTab={setActiveTab}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ),
    },
    // {
    //   label: "Fact Details",
    //   content: <FactTable
    //   activeIndex={activeIndex}
    //   setActiveIndex={setActiveIndex}/>,
    // },
    // {
    //   label: "Fact  Table mapping",
    //   content: <FactMappingDetail
    //   activeIndex={activeIndex}
    //   setActiveIndex={setActiveIndex} />,
    // },
    {
      label: "Dimension",
      content: <FactDetail />,
    },
    {
      label: "Fact Dimension Mapping",
      content: <FactDetail />,
    },
  ];

  return (
    <div className="grid">
      <div className="col-6"></div>
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
