import { Steps } from "primereact/steps";
import { useState } from "react";
import DatasourceSelection from "./DatasourceSelection";
import FactMappingDetail from "./FactMappingDetailPage";
import DimensionPage from "./DimensionPage";
import { CubeDetails, DimesionMapping, FactMappingData, Factdetails } from "@/shared/constants/models/Cube";
import MappingTablesPage from "./MappingTablesPage";
import { TableMetaData } from "@/shared/constants/models/TableMetaData";
import { CubeContextProvider } from "@/common-layouts/context/cubeContext";
import FactDetails from "./FactDetails";

const CubePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabActive, setActiveTab] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [dataSourceDetails, setDataSourceDetails] = useState<CubeDetails>(new CubeDetails());
  const [tables, setTables] = useState<TableMetaData[]>([]);
  const [factDetails, setFactdetails] = useState<Factdetails>(new Factdetails());
  const [factTableMappingData, setFactTableMappingData] = useState<FactMappingData>(new FactMappingData());
  const [factTableMappingArray, setFactTableMappingArray] = useState<FactMappingData[]>([]);
  const [dimensionDetails, setDimensionDetails] = useState<Factdetails>(new Factdetails());
  const [dimensionMappingData, setDimensionMappingData] = useState<DimesionMapping>(new DimesionMapping());


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
          setTables={setTables}
          dataSourceDetails={dataSourceDetails}
          setDataSourceDetails={setDataSourceDetails}
        />
      ),
    },

    {
      label: "Fact Details",
      content: <FactDetails
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        dataSourceDetails={dataSourceDetails}
        tables={tables}
        setTables={setTables}
        factDetails={factDetails}
        setFactdetails={setFactdetails}
      />,
    },

    {
      label: "Fact Table Mapping",
      content: <FactMappingDetail
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        factTableMappingData={factTableMappingData}
        setFactTableMappingData={setFactTableMappingData}
        factDetails={factDetails}
        setFactdetails={setFactdetails}
        isAdded={isAdded}
        setIsAdded={setIsAdded}
        factTableMappingArray={factTableMappingArray}
        setFactTableMappingArray={setFactTableMappingArray}
      />,
    },
    {
      label: "Dimension",
      content: <DimensionPage
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        dataSourceDetails={dataSourceDetails}
        tables={tables}
        setTables={setTables}
        dimensionDetails={dimensionDetails}
        setDimensionDetails={setDimensionDetails}
      />,
    },

    {
      label: "Fact Dimension Mapping",
      content: <MappingTablesPage
        dimensionDetails={dimensionDetails}
        setDimensionDetails={setDimensionDetails}
        dimensionMappingData={dimensionMappingData}
        setDimensionMappingData={setDimensionMappingData}
      />,
    },
    // {
    //   label:"Preview",
    //   content:<MappingTablesPage/>
    // }
  ];

  return (
    <CubeContextProvider>
    <div className="grid">
      <div className="col-12">
        <Steps
          model={tabs}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
        />
        <div className="col-12 p-5">{tabs[activeIndex].content}</div>
      </div>
      </div>
    </CubeContextProvider>

  );
};

export default CubePage;
