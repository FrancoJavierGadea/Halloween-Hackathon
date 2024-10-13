
const files = import.meta.glob("@assets/sketon-loader/*.svg", {
    query: '?url',
    import: 'default',
});

const SKELETON = await Promise.all(
    Object.values(files)
        .map((load) => load())
);

export default SKELETON;