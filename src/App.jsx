import { GlobalStyles } from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

// you need to include the global css styles as sibling with the component root
function App() {
  return (
    <>
      <GlobalStyles />
      <div className="">
        <Heading as="h1">asd</Heading>
        <Heading as="h2">qwe</Heading>
        <Heading as="h3">zxc</Heading>
      </div>
    </>
  );
}

export default App;
