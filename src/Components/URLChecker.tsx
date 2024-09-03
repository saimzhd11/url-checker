import React, { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createDebouncedFunction, checkUrlExists } from "../Utils/functions";
import { URLInput } from "./URLInput";
import { SubmitButton } from "./SubmitButton";
import { StatusMessage } from "./StatusMessage";

interface FormInputs {
    url: string;
}

const URLChecker: React.FC = () => {
    const { register, watch, handleSubmit, formState: { errors, touchedFields } } = useForm<FormInputs>({
        mode: 'onChange', 
    });
    const [urlStatus, setUrlStatus] = useState<string | null>(null);
    const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const url = watch("url");

    const debouncedCheckUrlExists = useCallback(
        createDebouncedFunction(async (url: string) => {
            setIsLoading(true);
            const status = await checkUrlExists(url);
            setUrlStatus(status);
            setIsLoading(false);
        }, 1000),
        []
    );

    useEffect(() => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        const isUrlValid = urlPattern.test(url);

        if (url) {  
            setIsValidUrl(isUrlValid);

            if (isUrlValid) {
                debouncedCheckUrlExists(url);
            } else {
                setUrlStatus("Invalid URL format.");
                setIsLoading(false);
            }
        } else {
            setIsValidUrl(true); 
            setUrlStatus(null);
            setIsLoading(false);
        }
    }, [url, debouncedCheckUrlExists]);

    const onSubmit: SubmitHandler<FormInputs> = () => {
        if (isValidUrl) {
            debouncedCheckUrlExists(url);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl mb-4">URL Checker</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <URLInput
                    register={register("url", { 
                        required: "URL is required.",
                        pattern: {
                            value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                            message: "Invalid URL format."
                        }
                    })}
                    error={errors.url}
                    touched={touchedFields.url}
                />
                <SubmitButton isLoading={isLoading} />
            </form>
            <StatusMessage urlStatus={urlStatus} isLoading={isLoading} />
        </div>
    );
};

export { URLChecker };
