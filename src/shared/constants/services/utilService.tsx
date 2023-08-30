import { pathList } from "../router";

export const getPathNames = (path: any) => {
    let tempItem = "";
    let paths = path
      .split("/")
      .filter((e: any) => e)
      .map((pathName: string) => {
        tempItem += "/" + pathName;
        let path = pathList.find((item: { pathName: any; }) => item.pathName === pathName);
        if (path) {
          return { ...path, pathName: tempItem };
        }
        return "";
      });
    return paths.filter((path: any) => path);
  };

export const getErrorMessageOnValidation = (errors: any, touched: any, param: any) => {
    let errorMessage = param.split(".").reduce((prev: any, curr: any) => {
        let element: any;
        if (prev) {
            element = prev[curr]
        }
        return element
    }, errors);
    let isTouched = param.split(".").reduce((prev: any, curr: any) => {
        let element: any;
        if (prev) {
            element = prev[curr]
        }
        return element
    }, touched);
    if (errorMessage && isTouched) {
        return (<small className="p-error">{errorMessage}
        </small>)
    } else {
        return null;
    }
}
export const isFormFieldInvalid = (errors: any, touched: any) => {
    return errors && touched;
}