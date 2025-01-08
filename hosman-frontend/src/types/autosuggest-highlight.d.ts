declare module 'autosuggest-highlight/parse' {
    export default function parse(
        text: string,
        matches: [number, number][]
    ): { text: string; highlight: boolean }[];
}

declare module 'autosuggest-highlight/match' {
    export default function match(
        text: string,
        query: string
    ): [number, number][];
}
