
import config from "@/config";

export const getLanguageIconSrc = (language: string) => {
    return `${config.techIcons.url}/${language?.toLocaleLowerCase()}-colored.svg`;
};
