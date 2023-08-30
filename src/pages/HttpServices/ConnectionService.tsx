export const fetchData = async () => {
    try {
      const response = await fetch('/demo/data/datasource.json');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching data: ' );
    }
  };