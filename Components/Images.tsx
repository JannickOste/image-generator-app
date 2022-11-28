import { APIImage } from "../API";
import ImageCreator from "./ImageCreator"
import ImageHistory from "./ImageHistory";
const Images = () => (
    <>
        <APIImage width={512}/>
        <ImageHistory />
    </>
)
export default Images;
