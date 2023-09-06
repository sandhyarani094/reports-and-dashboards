import { Steps } from "primereact/steps";
import { useState } from "react";
import DatasourceSelection from "./DatasorceSelection";
import FactTable from "./FactTable";
import FactMappingDetail from "./FactMappingDetailPage";
import DimensionPage from "./DimensionPage";
import { CubeDetails, FactMappingData } from "@/shared/constants/models/Cube";
import MappingTablesPage from "./MappingTablesPage";
import { TableMetaData } from "@/shared/constants/models/TableMetaData";
import { CubeContextProvider } from "@/common-layouts/context/cubeContext";

const CubePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabActive, setActiveTab] = useState(false);
  const [dataSourceDetails,setDataSourceDetails ] = useState<CubeDetails>(new CubeDetails());
  const [tables, setTables] = useState<TableMetaData[]> ([]);
  const [factTableMappingData, setFactTableMappingData] = useState<FactMappingData>(new FactMappingData());

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
          dataSourceDetails = {dataSourceDetails}
          setDataSourceDetails = {setDataSourceDetails}
        />
      ),
    },

    {
      label: "Fact Details",
      content: <FactTable
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      dataSourceDetails = {dataSourceDetails}
      tables={tables}
      setTables={setTables}
      />,
    },
    
    {
      label: "Fact Table Mapping",
      content: <FactMappingDetail 
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
        factTableMappingData={factTableMappingData} setFactTableMappingData={setFactTableMappingData}
         />,
    },
    {
      label: "Dimension",
      content: <DimensionPage setActiveIndex={setActiveIndex}
        activeIndex={activeIndex} />,
    },
    
    {
      label: "Fact Dimension Mapping",
      content: <MappingTablesPage />,
    },
    {
      label:"Preview",
      content:<MappingTablesPage/>
    }
  ];

  return (
    <CubeContextProvider>
    <div className="grid">
      <div className="col-12">
        <Steps
          model={tabs}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={true}
          
        />
        <div className="col-12 p-5">{tabs[activeIndex].content}</div>
      </div>
    </div>
    </CubeContextProvider>

  );
};

export default CubePage;
