import {Configuration, OpenAIApi } from "openai";

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
        const response = await this.openai.createImage({
            prompt: searchQuery,
            n: 1,
            size: "512x512",
        });
        
        imageSourceSetter(response.data.data[0]?.url as string)
    }
}

export default OpenAPI;