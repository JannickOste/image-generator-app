import {Configuration, OpenAIApi } from "openai";
import {Axios} from "axios";

class OpenAPI
{
    private static singleton: OpenAPI | undefined;
    public static get Singleton() { return this.singleton ? this.singleton : (this.singleton = new OpenAPI({
        apiKey:"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"
    }))}

    private readonly openai: OpenAIApi;
    private constructor(props: {apiKey: string})
    {  
        const config = new Configuration(props);
        this.openai = new OpenAIApi(config);
    }

    public fetchImageByText = async(searchQuery: string, imageSourceSetter: (uri: string) => void) => {
        const payload = {
            "prompt": searchQuery,
            "n": 1,
            "size": "512x512",
            response_format: "url"
        };

        const response = await this.openai.createImage(payload as any);
        imageSourceSetter(response.data.data[0]?.url as string);
    }
}

export default OpenAPI;