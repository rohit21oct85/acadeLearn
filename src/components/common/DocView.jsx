import DocViewer from "react-doc-viewer";
 
function DocView(item) {
//   const docs = [
//     { uri: "https://url-to-my-pdf.pdf" },
//     { uri: require("./example-files/pdf.pdf") }, // Local File
//   ];
 
  return <>
            <DocViewer documents={item} />
        </>;
}

export default DocView()