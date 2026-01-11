type PropsUnionPart<A, B> = A & {
    [K in keyof B as K extends keyof A ? never : K]?: undefined;
};
export type PropsUnion<A, B> = PropsUnionPart<A, B> | PropsUnionPart<B, A>;
export {};
